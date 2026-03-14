// ── Drag & Drop ───────────────────────────────────────────────────────────────

export const DND_TYPE_WORKOUT = 'WORKOUT';
export const DND_TYPE_EXERCISE = 'EXERCISE';

// ── Calendar ──────────────────────────────────────────────────────────────────

export const DAYS_IN_WEEK = 7;
export const SUNDAY_JS_INDEX = 0;
export const MONDAY_FROM_SUNDAY_OFFSET = -6;
export const MONDAY_JS_INDEX = 1;
export const MONDAY_BASED_SUNDAY_INDEX = 6;

// ── Exercise defaults ─────────────────────────────────────────────────────────

export const DEFAULT_WEIGHT = 0;
export const DEFAULT_REPS = 10;
export const DEFAULT_SET: Exercise.Set = {
  weight: DEFAULT_WEIGHT,
  reps: DEFAULT_REPS,
};
