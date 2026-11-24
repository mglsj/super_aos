// Per-question study status for the past-quiz (PYQ) page, kept in the browser.
// incomplete -> completed -> revisit -> incomplete (one button cycles through them).
import { writable } from 'svelte/store';

const KEY = 'super-aos-pyq-status-v1';

export type PyqStatus = 'incomplete' | 'completed' | 'revisit';

/** Question id -> status. Missing ids are 'incomplete'. */
export const pyqStatus = writable<Record<string, PyqStatus>>({});

const NEXT: Record<PyqStatus, PyqStatus> = { incomplete: 'completed', completed: 'revisit', revisit: 'incomplete' };

let loaded = false;

/** Call from onMount, so server render and first paint stay consistent. */
export function loadPyqStatus() {
  if (loaded || typeof localStorage === 'undefined') return;
  loaded = true;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) pyqStatus.set(JSON.parse(raw));
  } catch {
    // unreadable storage: start empty
  }
  pyqStatus.subscribe((s) => {
    try {
      localStorage.setItem(KEY, JSON.stringify(s));
    } catch {
      // storage full or blocked: status just will not persist
    }
  });
}

export function cycleStatus(id: string) {
  pyqStatus.update((s) => {
    const next = NEXT[s[id] ?? 'incomplete'];
    const copy = { ...s };
    if (next === 'incomplete') delete copy[id];
    else copy[id] = next;
    return copy;
  });
}

export function resetStatus(ids: string[]) {
  pyqStatus.update((s) => {
    const copy = { ...s };
    for (const id of ids) delete copy[id];
    return copy;
  });
}

// ---- Page view: filters and "open all / close all" ----

const VIEW_KEY = 'super-aos-pyq-view-v1';

export interface PyqView {
  /** Show only questions marked Revisit. */
  revisitOnly: boolean;
  /** Hide questions marked Completed. */
  hideCompleted: boolean;
  /** Show predicted questions. Off by default; while off they are hidden and left out of every count. */
  showPredicted: boolean;
}

export const DEFAULT_VIEW: PyqView = { revisitOnly: false, hideCompleted: false, showPredicted: false };
export const pyqView = writable<PyqView>({ ...DEFAULT_VIEW });

/** Bumped by "Open all answers" / "Close all"; every card follows the latest command. */
export const answerCommand = writable<{ open: boolean; n: number }>({ open: false, n: 0 });

export function setAllAnswers(open: boolean) {
  answerCommand.update((c) => ({ open, n: c.n + 1 }));
}

/** Whether a question is filtered out by the current view. */
export const isFilteredOut = (v: PyqView, s: PyqStatus, predicted = false) =>
  (predicted && !v.showPredicted) || (v.revisitOnly && s !== 'revisit') || (v.hideCompleted && s === 'completed');

/** A question as the counting components see it. */
export interface Counted {
  id: string;
  predicted: boolean;
}

/** The ids that count towards totals: predicted questions only while they are shown. */
export const countedIds = (list: Counted[], v: PyqView) => list.filter((x) => !x.predicted || v.showPredicted).map((x) => x.id);

/** Clears the Revisit-only and Hide-completed filters, keeping the Predicted choice. */
export const clearFilters = () => pyqView.update((v) => ({ ...v, revisitOnly: false, hideCompleted: false }));

let viewLoaded = false;

export function loadPyqView() {
  if (viewLoaded || typeof localStorage === 'undefined') return;
  viewLoaded = true;
  try {
    const raw = localStorage.getItem(VIEW_KEY);
    if (raw) pyqView.set({ ...DEFAULT_VIEW, ...JSON.parse(raw) });
  } catch {
    // ignore
  }
  pyqView.subscribe((v) => {
    try {
      localStorage.setItem(VIEW_KEY, JSON.stringify(v));
    } catch {
      // ignore
    }
  });
}
