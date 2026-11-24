// Converts the past-paper / predicted-question export (src/data/pyq-export/*.md) into
// src/data/pyq-export.json, which the /pyq page reads.
//
//   bun scripts/import-pyq-export.ts
//
// Each question in the export is a "### PYQ-<n>" or "### PRED-<n>" block of "Field: value" lines.
// Answers are Markdown and are converted to HTML here, so the site needs no Markdown at runtime.

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { units } from '../src/lib/course';
import type { ExportQuestion, Sitting } from '../src/lib/pyq-export-types';

const DIR = join(import.meta.dir, '../src/data/pyq-export');
const OUT = join(import.meta.dir, '../src/data/pyq-export.json');

const FIELDS = [
  'Unit',
  'Topic',
  'Type',
  'Asked in',
  'Times asked',
  'Reworded versions',
  'Based on',
  'In syllabus',
  'Question',
  'Options',
  'Answer',
  'Marking points',
  'Answer source',
  'Weak / low priority',
] as const;
type Field = (typeof FIELDS)[number];
const FIELD_RE = new RegExp(`^(${FIELDS.map((f) => f.replace(/[/]/g, '\\/')).join('|')}):\\s?(.*)$`);

const md = unified().use(remarkParse).use(remarkGfm).use(remarkRehype).use(rehypeStringify);
const html = (s: string) => String(md.processSync(s.trim())).trim();
/** One paragraph of Markdown as inline HTML (no wrapping <p>). */
const inline = (s: string) => html(s).replace(/^<p>([\s\S]*)<\/p>$/, '$1');

const lessonByTitle = new Map(units.flatMap((u) => u.lessons.map((l) => [l.title, { lessonId: l.id, unitId: u.id }] as const)));

/** "AOS Mid-sem 2025, Q2(i) (2 marks)" -> paper, ref "Q2(i)", marks "2 marks". Paper names contain no commas. */
function parseSitting(raw: string): Sitting {
  let s = raw.trim();
  let marks = '';
  if (s.endsWith(')')) {
    // the last balanced (...) group holds the marks, e.g. "(4 (bonus))"
    let depth = 0;
    for (let i = s.length - 1; i >= 0; i--) {
      if (s[i] === ')') depth++;
      else if (s[i] === '(' && --depth === 0) {
        marks = s.slice(i + 1, -1).trim();
        s = s.slice(0, i).trim();
        break;
      }
    }
  }
  const comma = s.indexOf(', ');
  return comma < 0 ? { paper: s, ref: null, marks } : { paper: s.slice(0, comma).trim(), ref: s.slice(comma + 2).trim(), marks };
}

function parseOptions(s: string): string[] {
  const parts = s.split(/(?:^|\s)([A-H])\)\s/).slice(1);
  const out: string[] = [];
  for (let i = 0; i < parts.length; i += 2) out.push(inline(parts[i + 1].trim()));
  return out;
}

const FORMAT: Record<string, ExportQuestion['format']> = { written: 'written', 'true/false': 'tf', MCQ: 'mcq', numerical: 'numeric' };

function parseBlock(head: string, lines: string[]): ExportQuestion {
  const [, kindRaw, numRaw] = head.match(/^### (PYQ|PRED)-(\d+)/)!;
  const f = new Map<Field, string[]>();
  let cur: Field | null = null;
  for (const line of lines) {
    const m = line.match(FIELD_RE);
    if (m) {
      cur = m[1] as Field;
      f.set(cur, [m[2]]);
    } else if (cur) f.get(cur)!.push(line);
  }
  const get = (k: Field) => (f.get(k) ?? []).join('\n').trim();
  const need = (k: Field) => {
    const v = get(k);
    if (!v) throw new Error(`${head}: missing "${k}"`);
    return v;
  };

  const topic = need('Topic');
  const unitRaw = need('Unit');
  const loc = lessonByTitle.get(topic);
  const isOther = /^Other/.test(unitRaw);
  if (!loc && !isOther) throw new Error(`${head}: unknown topic "${topic}"`);

  const type = need('Type');
  const format = FORMAT[type];
  if (!format) throw new Error(`${head}: unknown type "${type}"`);

  const syl = need('In syllabus');
  const weak = need('Weak / low priority');
  const kind = kindRaw === 'PYQ' ? 'pyq' : 'predicted';
  const reworded = get('Reworded versions');

  return {
    id: `x-${kind === 'pyq' ? 'pyq' : 'pred'}-${numRaw}`,
    kind,
    num: Number(numRaw),
    unitId: isOther ? 'other' : loc!.unitId,
    lessonId: isOther ? 'other' : loc!.lessonId,
    format,
    asked: kind === 'pyq' ? need('Asked in').split(/;\s*/).map(parseSitting) : [],
    times: kind === 'pyq' ? Number(need('Times asked')) : 0,
    reworded: reworded && reworded !== 'none' ? inline(reworded) : null,
    basedOn: get('Based on') || null,
    inSyllabus: /^yes/i.test(syl),
    outReason: /^no/i.test(syl) ? syl.replace(/^no:?\s*/i, '') || null : null,
    weak: /^yes/i.test(weak),
    weakReason: /^yes/i.test(weak) ? weak.replace(/^yes:?\s*/i, '') || null : null,
    question: html(need('Question')),
    options: get('Options') ? parseOptions(get('Options')) : [],
    answer: html(need('Answer')),
    points: get('Marking points')
      .split('\n')
      .filter((l) => l.startsWith('- '))
      .map((l) => inline(l.slice(2))),
    answerSource: need('Answer source'),
  };
}

const questions: ExportQuestion[] = [];
for (const file of readdirSync(DIR).filter((n) => /^(unit-|other)/.test(n)).sort()) {
  const lines = readFileSync(join(DIR, file), 'utf8').split('\n');
  let head: string | null = null;
  let body: string[] = [];
  const flush = () => head && questions.push(parseBlock(head, body));
  for (const line of lines) {
    if (/^### (PYQ|PRED)-\d+/.test(line)) {
      flush();
      head = line;
      body = [];
    } else if (/^##? /.test(line)) {
      flush();
      head = null;
    } else body.push(line);
  }
  flush();
}

const ids = questions.map((q) => q.id);
const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
if (dupes.length) throw new Error(`Duplicate ids: ${dupes.join(', ')}`);

questions.sort((a, b) => (a.kind === b.kind ? a.num - b.num : a.kind === 'pyq' ? -1 : 1));
writeFileSync(OUT, JSON.stringify(questions, null, 1) + '\n');
const count = (k: string) => questions.filter((q) => q.kind === k).length;
console.log(`Wrote ${questions.length} questions (${count('pyq')} past-paper, ${count('predicted')} predicted) to ${OUT}`);
