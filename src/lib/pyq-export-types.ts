// Shape of src/data/pyq-export.json, written by scripts/import-pyq-export.ts.

export interface Sitting {
  /** e.g. "AOS End-sem 2025" */
  paper: string;
  /** Question number in that paper, e.g. "Q3", when known. */
  ref: string | null;
  /** e.g. "5 marks", "not recorded". */
  marks: string;
}

export interface ExportQuestion {
  /** "x-pyq-<n>" or "x-pred-<n>" */
  id: string;
  kind: 'pyq' | 'predicted';
  /** Number in the export, e.g. 27 for PYQ-27. */
  num: number;
  unitId: number | 'other';
  /** A lesson id from src/lib/course.ts, or "other". */
  lessonId: string;
  format: 'written' | 'tf' | 'mcq' | 'numeric';
  /** Past papers it appeared in (empty for predicted questions). */
  asked: Sitting[];
  times: number;
  /** Other wordings and their papers, as HTML. */
  reworded: string | null;
  /** Predicted only: which past questions or exam style it imitates. */
  basedOn: string | null;
  inSyllabus: boolean;
  outReason: string | null;
  weak: boolean;
  weakReason: string | null;
  /** HTML */
  question: string;
  /** MCQ options as HTML, without their letters. */
  options: string[];
  /** HTML */
  answer: string;
  /** Marking points as inline HTML. */
  points: string[];
  /** "professor's key", "student answers" or "written by Claude, no key". */
  answerSource: string;
}
