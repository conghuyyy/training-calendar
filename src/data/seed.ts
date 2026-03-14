/**
 * Seed data — single source of truth for all initial mock data.
 *
 * All IDs are generated once at module load via crypto.randomUUID() so every
 * entity, workout, and schedule entry share consistent references within a session.
 */
import { generateId } from 'utils/helpers';

// ── Exercise IDs ──────────────────────────────────────────────────────────────

const eIds = {
  benchPress: generateId(),
  inclineDumbbellPress: generateId(),
  tricepPushdown: generateId(),
  barbellSquat: generateId(),
  legPress: generateId(),
  calfRaises: generateId(),
  deadlift: generateId(),
  pullUps: generateId(),
  overheadPress: generateId(),
  dumbbellCurl: generateId(),
  latPulldown: generateId(),
  cableFlyes: generateId(),
  plankHold: generateId(),
  russianTwist: generateId(),
  shoulderStretch: generateId(),
  hipFlexorStretch: generateId(),
};

// ── Workout IDs ───────────────────────────────────────────────────────────────

const wIds = {
  chestDay: generateId(),
  legDay: generateId(),
  backShoulders: generateId(),
  upperBody: generateId(),
  coreCardio: generateId(),
  morningStretch: generateId(),
};

// ── Exercises ─────────────────────────────────────────────────────────────────

export const initialExercises: Exercise.Map = {
  [eIds.benchPress]: {
    id: eIds.benchPress,
    name: 'Bench Press Medium Grip',
    sets: [
      { weight: 50, reps: 5 },
      { weight: 60, reps: 5 },
      { weight: 70, reps: 5 },
    ],
  },
  [eIds.inclineDumbbellPress]: {
    id: eIds.inclineDumbbellPress,
    name: 'Incline Dumbbell Press',
    sets: [
      { weight: 30, reps: 8 },
      { weight: 35, reps: 8 },
      { weight: 40, reps: 8 },
    ],
  },
  [eIds.tricepPushdown]: {
    id: eIds.tricepPushdown,
    name: 'Tricep Pushdown',
    sets: [
      { weight: 40, reps: 12 },
      { weight: 50, reps: 12 },
      { weight: 60, reps: 10 },
    ],
  },
  [eIds.barbellSquat]: {
    id: eIds.barbellSquat,
    name: 'Barbell Squat',
    sets: [
      { weight: 135, reps: 5 },
      { weight: 185, reps: 5 },
      { weight: 225, reps: 5 },
    ],
  },
  [eIds.legPress]: {
    id: eIds.legPress,
    name: 'Leg Press',
    sets: [
      { weight: 200, reps: 10 },
      { weight: 250, reps: 10 },
      { weight: 300, reps: 8 },
    ],
  },
  [eIds.calfRaises]: {
    id: eIds.calfRaises,
    name: 'Calf Raises',
    sets: [
      { weight: 100, reps: 15 },
      { weight: 120, reps: 15 },
    ],
  },
  [eIds.deadlift]: {
    id: eIds.deadlift,
    name: 'Deadlift',
    sets: [
      { weight: 135, reps: 5 },
      { weight: 225, reps: 5 },
      { weight: 315, reps: 3 },
    ],
  },
  [eIds.pullUps]: {
    id: eIds.pullUps,
    name: 'Pull Ups',
    sets: [
      { weight: 0, reps: 8 },
      { weight: 0, reps: 8 },
      { weight: 0, reps: 6 },
    ],
  },
  [eIds.overheadPress]: {
    id: eIds.overheadPress,
    name: 'Overhead Press',
    sets: [
      { weight: 65, reps: 8 },
      { weight: 75, reps: 8 },
      { weight: 85, reps: 6 },
    ],
  },
  [eIds.dumbbellCurl]: {
    id: eIds.dumbbellCurl,
    name: 'Dumbbell Curl',
    sets: [
      { weight: 25, reps: 10 },
      { weight: 30, reps: 10 },
      { weight: 35, reps: 8 },
    ],
  },
  [eIds.latPulldown]: {
    id: eIds.latPulldown,
    name: 'Lat Pulldown',
    sets: [
      { weight: 100, reps: 10 },
      { weight: 120, reps: 10 },
      { weight: 140, reps: 8 },
    ],
  },
  [eIds.cableFlyes]: {
    id: eIds.cableFlyes,
    name: 'Cable Flyes',
    sets: [
      { weight: 20, reps: 12 },
      { weight: 25, reps: 12 },
    ],
  },
  [eIds.plankHold]: {
    id: eIds.plankHold,
    name: 'Plank Hold',
    sets: [
      { weight: 0, reps: 60 },
      { weight: 0, reps: 60 },
    ],
  },
  [eIds.russianTwist]: {
    id: eIds.russianTwist,
    name: 'Russian Twist',
    sets: [
      { weight: 15, reps: 20 },
      { weight: 15, reps: 20 },
      { weight: 15, reps: 20 },
    ],
  },
  [eIds.shoulderStretch]: {
    id: eIds.shoulderStretch,
    name: 'Shoulder Stretch',
    sets: [{ weight: 0, reps: 30 }],
  },
  [eIds.hipFlexorStretch]: {
    id: eIds.hipFlexorStretch,
    name: 'Hip Flexor Stretch',
    sets: [{ weight: 0, reps: 30 }],
  },
};

// ── Workouts ──────────────────────────────────────────────────────────────────

export const initialWorkouts: Workout.Map = {
  [wIds.chestDay]: {
    id: wIds.chestDay,
    name: 'Chest Day - with Arm exercises',
    exerciseIds: [
      eIds.benchPress,
      eIds.inclineDumbbellPress,
      eIds.tricepPushdown,
    ],
  },
  [wIds.legDay]: {
    id: wIds.legDay,
    name: 'Leg Day',
    exerciseIds: [eIds.barbellSquat, eIds.legPress, eIds.calfRaises],
  },
  [wIds.backShoulders]: {
    id: wIds.backShoulders,
    name: 'Back & Shoulders',
    exerciseIds: [eIds.deadlift, eIds.pullUps, eIds.overheadPress],
  },
  [wIds.upperBody]: {
    id: wIds.upperBody,
    name: 'Upper Body',
    exerciseIds: [eIds.dumbbellCurl, eIds.latPulldown, eIds.cableFlyes],
  },
  [wIds.coreCardio]: {
    id: wIds.coreCardio,
    name: 'Core & Cardio',
    exerciseIds: [eIds.plankHold, eIds.russianTwist],
  },
  [wIds.morningStretch]: {
    id: wIds.morningStretch,
    name: 'Morning Stretch Routine',
    exerciseIds: [eIds.shoulderStretch, eIds.hipFlexorStretch],
  },
};

// ── Schedule ──────────────────────────────────────────────────────────────────

export const initialSchedule: Schedule.Week = {
  '2026-03-09': [wIds.chestDay, wIds.morningStretch],
  '2026-03-10': [wIds.legDay],
  '2026-03-11': [wIds.backShoulders],
  '2026-03-12': [wIds.upperBody],
  '2026-03-13': [wIds.coreCardio],
  '2026-03-14': [],
  '2026-03-15': [],
};
