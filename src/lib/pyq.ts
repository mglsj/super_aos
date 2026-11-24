// Questions for the /pyq page, built at build time from two sources:
//  - past-paper questions already on the site (the question bank, `pastPaper: true`), and
//  - the past-paper / predicted-question export (src/data/pyq-export.json).
// src/data/pyq-export-map.ts says which export question each site question is. A matched site
// question keeps its own answer but takes its papers and repeat count from the export; site
// questions matching the same export question become one card; export questions with no site
// match become new cards. Predicted questions are kept apart so the page can hide them.

import { bank } from './bank';
import type { BankItem } from './exam';
import { units } from './course';
import type { Question, WrittenQuestion } from './questions';
import type { ExportQuestion, Sitting } from './pyq-export-types';
import exportJson from '../data/pyq-export.json';
import { LEADS, SITE_TO_EXPORT } from '../data/pyq-export-map';

export type UnitId = number | 'other';
export type Format = ExportQuestion['format'];

export interface PyqItem {
  /** Status key. Site questions keep their own id, so earlier progress carries over. */
  id: string;
  kind: 'pyq' | 'predicted';
  q: Question;
  format: Format;
  /** MCQ options from the export, shown without marking the answer (the answer text names it). */
  options: string[];
  /** Papers it appeared in, e.g. "AOS End-sem 2025". */
  sources: string[];
  /** Each sitting with its question number and marks, for the detail line. */
  sittings: Sitting[];
  /** Times asked across all papers; 2 or more is high-yield. */
  times: number;
  /** Highest marks it carried in any paper, when known. */
  marks: number | null;
  /** Other site questions merged into this card. */
  variants: Question[];
  /** Other wordings from the export, as HTML, when no site question carries them. */
  reworded: string | null;
  inSyllabus: boolean;
  outReason: string | null;
  weak: boolean;
  weakReason: string | null;
  /** Where the answer came from, for export answers; null for the site's own answers. */
  answerSource: string | null;
  basedOn: string | null;
  /** 1-based position within its unit among the same kind ("Q3", "P3"). */
  number: number;
  unitId: UnitId;
  lessonId: string;
  /** Plain-text start of the prompt, for link lists. */
  excerpt: string;
}

const exported = exportJson as ExportQuestion[];
const byExport = new Map(exported.map((q) => [q.id, q]));

export const UNKNOWN_PAPER = 'Paper not recorded';
export const OTHER_UNIT = { id: 'other' as const, title: 'Across units and extras' };
const OTHER_LESSON = { id: 'other', title: 'Out-of-syllabus extras and cross-unit questions' };

function plain(html: string, max = 130) {
  let text = html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x3C;/gi, '<')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
  // True/false boilerplate: start the excerpt at the quoted statement.
  if (/TRUE or FALSE/i.test(text.slice(0, 40))) {
    const at = text.search(/["“]/);
    if (at > 0) text = text.slice(at);
  }
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

const marksOf = (s: Sitting[]) => {
  const n = s.map((x) => Number(x.marks.match(/\d+(\.\d+)?/)?.[0])).filter((x) => Number.isFinite(x) && x > 0);
  return n.length ? Math.max(...n) : null;
};

function uniqueSittings(list: Sitting[]) {
  const seen = new Set<string>();
  return list.filter((s) => {
    const k = `${s.paper}|${s.ref ?? ''}`;
    return seen.has(k) ? false : (seen.add(k), true);
  });
}

const formatOf = (q: Question): Format => (q.type === 'mcq' || q.type === 'multi' ? 'mcq' : q.type === 'tf' ? 'tf' : q.type === 'numeric' ? 'numeric' : 'written');

/** An export question as a site question, so the card can render it. */
function asQuestion(x: ExportQuestion): WrittenQuestion {
  return { id: x.id, type: 'written', prompt: x.question, marks: marksOf(x.asked) ?? 0, points: x.points, modelAnswer: x.answer, pastPaper: x.kind === 'pyq' };
}

type Draft = Omit<PyqItem, 'number'>;

// ---- Site past-paper questions, grouped by the export question they match ----

const past = bank.filter((x) => x.q.pastPaper);
const groups = new Map<string, BankItem[]>();
for (const x of past) {
  const ids = SITE_TO_EXPORT[x.q.id];
  for (const id of ids ?? []) if (!byExport.has(id)) throw new Error(`pyq-export-map.ts: unknown export id "${id}" for ${x.q.id}`);
  const key = ids?.[0] ?? `site:${x.q.id}`;
  groups.set(key, [...(groups.get(key) ?? []), x]);
}
const covered = new Set(Object.values(SITE_TO_EXPORT).flat());

const drafts: Draft[] = [];
for (const [key, members] of groups) {
  members.sort((a, b) => Number(LEADS.has(b.q.id)) - Number(LEADS.has(a.q.id)));
  const lead = members[0];
  const main = key.startsWith('site:') ? null : byExport.get(key)!;
  const sittings = uniqueSittings(members.flatMap((m) => (SITE_TO_EXPORT[m.q.id] ?? []).flatMap((id) => byExport.get(id)!.asked)));
  const sources = main ? [...new Set(sittings.map((s) => s.paper))] : lead.q.source ? lead.q.source.split(' / ') : [UNKNOWN_PAPER];
  const unit = units.find((u) => u.lessons.some((l) => l.id === lead.lessonId))!;
  drafts.push({
    id: lead.q.id,
    kind: 'pyq',
    q: lead.q,
    format: formatOf(lead.q),
    options: [],
    sources,
    sittings,
    times: main ? Math.max(sittings.length, 1) : sources.length,
    marks: lead.q.type === 'written' ? lead.q.marks : marksOf(sittings),
    variants: members.slice(1).map((m) => m.q),
    reworded: members.length > 1 ? null : (main?.reworded ?? null),
    inSyllabus: main?.inSyllabus ?? true,
    outReason: main?.outReason ?? null,
    weak: main?.weak ?? false,
    weakReason: main?.weakReason ?? null,
    answerSource: null,
    basedOn: null,
    unitId: unit.id,
    lessonId: lead.lessonId,
    excerpt: plain(lead.q.prompt),
  });
}

// ---- Export questions: past-paper ones the site lacks, and every predicted one ----

for (const x of exported) {
  if (x.kind === 'pyq' && covered.has(x.id)) continue;
  drafts.push({
    id: x.id,
    kind: x.kind,
    q: asQuestion(x),
    format: x.format,
    options: x.options,
    sources: x.kind === 'pyq' ? [...new Set(x.asked.map((s) => s.paper))] : [],
    sittings: x.asked,
    times: x.times,
    marks: marksOf(x.asked),
    variants: [],
    reworded: x.reworded,
    inSyllabus: x.inSyllabus,
    outReason: x.outReason,
    weak: x.weak,
    weakReason: x.weakReason,
    answerSource: x.answerSource,
    basedOn: x.basedOn,
    unitId: x.unitId,
    lessonId: x.lessonId,
    excerpt: plain(x.question),
  });
}

// ---- Order: units and lessons follow the course; within a lesson, past papers first
// (most-asked, then in-syllabus, then not low-priority), then predicted questions. ----

const rank = (d: Draft) => [d.kind === 'pyq' ? 0 : 1, -d.times, d.inSyllabus ? 0 : 1, d.weak ? 1 : 0];
function byRank(a: Draft, b: Draft) {
  const ra = rank(a);
  const rb = rank(b);
  for (let i = 0; i < ra.length; i++) if (ra[i] !== rb[i]) return ra[i] - rb[i];
  return 0; // stable: course order, then export order
}

const unitList = [...units.map((u) => ({ id: u.id as UnitId, title: u.title, lessons: u.lessons.map((l) => ({ id: l.id, title: l.title })) })), { ...OTHER_UNIT, lessons: [OTHER_LESSON] }];

export const pyqGroups = unitList
  .map((unit) => {
    let nq = 0;
    let np = 0;
    const lessons = unit.lessons
      .map((lesson) => ({
        lesson,
        items: drafts
          .filter((d) => d.lessonId === lesson.id)
          .sort(byRank)
          .map((d): PyqItem => ({ ...d, number: d.kind === 'pyq' ? ++nq : ++np })),
      }))
      .filter((g) => g.items.length > 0);
    return { unit, lessons, items: lessons.flatMap((l) => l.items) };
  })
  .filter((g) => g.lessons.length > 0);

export const pyqItems: PyqItem[] = pyqGroups.flatMap((g) => g.items);

/** Asked more than once, most-asked first, then in course order. */
export const highYield = pyqItems.filter((x) => x.kind === 'pyq' && x.times > 1).sort((a, b) => b.times - a.times);

const ids = pyqItems.map((x) => x.id);
const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
if (dupes.length) throw new Error(`pyq.ts: duplicate ids ${dupes.join(', ')}`);
