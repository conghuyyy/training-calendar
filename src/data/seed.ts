/**
 * Seed data — single source of truth for all initial mock data.
 *
 * All IDs are generated once at module load via crypto.randomUUID() so every
 * entity, workout, and schedule entry share consistent references within a session.
 */
import { generateId } from 'utils/helpers';

const exerciseIds = {
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

const workoutIds = {
  chestDay: generateId(),
  legDay: generateId(),
  backShoulders: generateId(),
  upperBody: generateId(),
  coreCardio: generateId(),
  morningStretch: generateId(),
};

export const initialExercises: Exercise.Map = {
  [exerciseIds.benchPress]: {
    id: exerciseIds.benchPress,
    name: 'Bench Press Medium Grip',
    sets: [
      { weight: 50, reps: 5 },
      { weight: 60, reps: 5 },
      { weight: 70, reps: 5 },
    ],
  },
  [exerciseIds.inclineDumbbellPress]: {
    id: exerciseIds.inclineDumbbellPress,
    name: 'Incline Dumbbell Press',
    sets: [
      { weight: 30, reps: 8 },
      { weight: 35, reps: 8 },
      { weight: 40, reps: 8 },
    ],
  },
  [exerciseIds.tricepPushdown]: {
    id: exerciseIds.tricepPushdown,
    name: 'Tricep Pushdown',
    sets: [
      { weight: 40, reps: 12 },
      { weight: 50, reps: 12 },
      { weight: 60, reps: 10 },
    ],
  },
  [exerciseIds.barbellSquat]: {
    id: exerciseIds.barbellSquat,
    name: 'Barbell Squat',
    sets: [
      { weight: 135, reps: 5 },
      { weight: 185, reps: 5 },
      { weight: 225, reps: 5 },
    ],
  },
  [exerciseIds.legPress]: {
    id: exerciseIds.legPress,
    name: 'Leg Press',
    sets: [
      { weight: 200, reps: 10 },
      { weight: 250, reps: 10 },
      { weight: 300, reps: 8 },
    ],
  },
  [exerciseIds.calfRaises]: {
    id: exerciseIds.calfRaises,
    name: 'Calf Raises',
    sets: [
      { weight: 100, reps: 15 },
      { weight: 120, reps: 15 },
    ],
  },
  [exerciseIds.deadlift]: {
    id: exerciseIds.deadlift,
    name: 'Deadlift',
    sets: [
      { weight: 135, reps: 5 },
      { weight: 225, reps: 5 },
      { weight: 315, reps: 3 },
    ],
  },
  [exerciseIds.pullUps]: {
    id: exerciseIds.pullUps,
    name: 'Pull Ups',
    sets: [
      { weight: 0, reps: 8 },
      { weight: 0, reps: 8 },
      { weight: 0, reps: 6 },
    ],
  },
  [exerciseIds.overheadPress]: {
    id: exerciseIds.overheadPress,
    name: 'Overhead Press',
    sets: [
      { weight: 65, reps: 8 },
      { weight: 75, reps: 8 },
      { weight: 85, reps: 6 },
    ],
  },
  [exerciseIds.dumbbellCurl]: {
    id: exerciseIds.dumbbellCurl,
    name: 'Dumbbell Curl',
    sets: [
      { weight: 25, reps: 10 },
      { weight: 30, reps: 10 },
      { weight: 35, reps: 8 },
    ],
  },
  [exerciseIds.latPulldown]: {
    id: exerciseIds.latPulldown,
    name: 'Lat Pulldown',
    sets: [
      { weight: 100, reps: 10 },
      { weight: 120, reps: 10 },
      { weight: 140, reps: 8 },
    ],
  },
  [exerciseIds.cableFlyes]: {
    id: exerciseIds.cableFlyes,
    name: 'Cable Flyes',
    sets: [
      { weight: 20, reps: 12 },
      { weight: 25, reps: 12 },
    ],
  },
  [exerciseIds.plankHold]: {
    id: exerciseIds.plankHold,
    name: 'Plank Hold',
    sets: [
      { weight: 0, reps: 60 },
      { weight: 0, reps: 60 },
    ],
  },
  [exerciseIds.russianTwist]: {
    id: exerciseIds.russianTwist,
    name: 'Russian Twist',
    sets: [
      { weight: 15, reps: 20 },
      { weight: 15, reps: 20 },
      { weight: 15, reps: 20 },
    ],
  },
  [exerciseIds.shoulderStretch]: {
    id: exerciseIds.shoulderStretch,
    name: 'Shoulder Stretch',
    sets: [{ weight: 0, reps: 30 }],
  },
  [exerciseIds.hipFlexorStretch]: {
    id: exerciseIds.hipFlexorStretch,
    name: 'Hip Flexor Stretch',
    sets: [{ weight: 0, reps: 30 }],
  },
};

export const initialWorkouts: Workout.Map = {
  [workoutIds.chestDay]: {
    id: workoutIds.chestDay,
    name: 'Chest Day - with Arm exercises',
    exerciseIds: [
      exerciseIds.benchPress,
      exerciseIds.inclineDumbbellPress,
      exerciseIds.tricepPushdown,
    ],
  },
  [workoutIds.legDay]: {
    id: workoutIds.legDay,
    name: 'Leg Day',
    exerciseIds: [exerciseIds.barbellSquat, exerciseIds.legPress, exerciseIds.calfRaises],
  },
  [workoutIds.backShoulders]: {
    id: workoutIds.backShoulders,
    name: 'Back & Shoulders',
    exerciseIds: [exerciseIds.deadlift, exerciseIds.pullUps, exerciseIds.overheadPress],
  },
  [workoutIds.upperBody]: {
    id: workoutIds.upperBody,
    name: 'Upper Body',
    exerciseIds: [exerciseIds.dumbbellCurl, exerciseIds.latPulldown, exerciseIds.cableFlyes],
  },
  [workoutIds.coreCardio]: {
    id: workoutIds.coreCardio,
    name: 'Core & Cardio',
    exerciseIds: [exerciseIds.plankHold, exerciseIds.russianTwist],
  },
  [workoutIds.morningStretch]: {
    id: workoutIds.morningStretch,
    name: 'Morning Stretch Routine',
    exerciseIds: [exerciseIds.shoulderStretch, exerciseIds.hipFlexorStretch],
  },
};

export const initialSchedule: Schedule.Week = {
  '2026-03-09': [workoutIds.chestDay, workoutIds.morningStretch],
  '2026-03-10': [workoutIds.legDay],
  '2026-03-11': [workoutIds.backShoulders],
  '2026-03-12': [workoutIds.upperBody],
  '2026-03-13': [workoutIds.coreCardio],
  '2026-03-14': [],
  '2026-03-15': [],
};
