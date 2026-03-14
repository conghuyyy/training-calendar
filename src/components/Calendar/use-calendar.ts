import { useState } from 'react';
import { initialExercises } from 'data/exercises';
import { initialWorkouts } from 'data/workouts';
import { initialSchedule } from 'data/schedule';
import { getWeekDays, getWeekRange, addWeeks } from 'utils/date';
import { reorder, without, findKey, omit, generateId } from 'utils/helpers';
import type { DropResult } from '@hello-pangea/dnd';

export const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [schedule, setSchedule] = useState<Schedule.Week>(initialSchedule);
  const [workouts, setWorkouts] = useState<Workout.Map>(initialWorkouts);
  const [exercises, setExercises] = useState<Exercise.Map>(initialExercises);

  const [workoutModal, setWorkoutModal] = useState<{
    isOpen: boolean;
    dateKey?: string;
    workout?: Workout.Entity | null;
  }>({ isOpen: false });

  const [exerciseModal, setExerciseModal] = useState<{
    isOpen: boolean;
    workoutId?: string;
    exercise?: Exercise.Entity | null;
  }>({ isOpen: false });

  const weekDays = getWeekDays(currentDate);
  const weekRange = getWeekRange(weekDays);

  // ── Lookups ──

  const findDayForWorkout = (workoutId: string): string | undefined => {
    return findKey(schedule, (workoutIds) => workoutIds.includes(workoutId));
  };

  const findWorkoutForExercise = (exerciseId: string): string | undefined => {
    return findKey(workouts, (workout) =>
      workout.exerciseIds.includes(exerciseId),
    );
  };

  // ── Drag & Drop ──

  const handleDragEnd = (result: DropResult): void => {
    const { source, destination, type } = result;
    if (!destination) {
      return;
    }
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    if (type === 'WORKOUT') {
      const sourceDayKey = source.droppableId;
      const destinationDayKey = destination.droppableId;
      setSchedule((prev) => {
        if (sourceDayKey === destinationDayKey) {
          return {
            ...prev,
            [sourceDayKey]: reorder(
              prev[sourceDayKey] || [],
              source.index,
              destination.index,
            ),
          };
        }
        const sourceIds = [...(prev[sourceDayKey] || [])];
        const destinationIds = [...(prev[destinationDayKey] || [])];
        const [movedId] = sourceIds.splice(source.index, 1);
        destinationIds.splice(destination.index, 0, movedId);
        return {
          ...prev,
          [sourceDayKey]: sourceIds,
          [destinationDayKey]: destinationIds,
        };
      });
    } else if (type === 'EXERCISE') {
      const sourceWorkoutId = source.droppableId;
      const destinationWorkoutId = destination.droppableId;
      setWorkouts((prev) => {
        if (sourceWorkoutId === destinationWorkoutId) {
          const target = prev[sourceWorkoutId];
          return {
            ...prev,
            [sourceWorkoutId]: {
              ...target,
              exerciseIds: reorder(
                target.exerciseIds,
                source.index,
                destination.index,
              ),
            },
          };
        }
        const sourceWorkout = prev[sourceWorkoutId];
        const destinationWorkout = prev[destinationWorkoutId];
        const sourceExerciseIds = [...sourceWorkout.exerciseIds];
        const destinationExerciseIds = [...destinationWorkout.exerciseIds];
        const [movedId] = sourceExerciseIds.splice(source.index, 1);
        destinationExerciseIds.splice(destination.index, 0, movedId);
        return {
          ...prev,
          [sourceWorkoutId]: {
            ...sourceWorkout,
            exerciseIds: sourceExerciseIds,
          },
          [destinationWorkoutId]: {
            ...destinationWorkout,
            exerciseIds: destinationExerciseIds,
          },
        };
      });
    }
  };

  // ── Workout CRUD ──

  const handleAddWorkout = (dateKey: string): void => {
    setWorkoutModal({ isOpen: true, dateKey, workout: null });
  };

  const handleEditWorkout = (workout: Workout.Entity): void => {
    const dateKey = findDayForWorkout(workout.id);
    setWorkoutModal({ isOpen: true, dateKey, workout });
  };

  const handleSaveWorkout = (name: string): void => {
    if (workoutModal.workout) {
      setWorkouts((prev) => ({
        ...prev,
        [workoutModal.workout!.id]: { ...workoutModal.workout!, name },
      }));
    } else if (workoutModal.dateKey) {
      const workoutId = generateId();
      const newWorkout: Workout.Entity = {
        id: workoutId,
        name,
        exerciseIds: [],
      };
      setWorkouts((prev) => ({ ...prev, [workoutId]: newWorkout }));
      setSchedule((prev) => ({
        ...prev,
        [workoutModal.dateKey!]: [
          ...(prev[workoutModal.dateKey!] || []),
          workoutId,
        ],
      }));
    }
    setWorkoutModal({ isOpen: false });
  };

  const handleDeleteWorkout = (workoutId: string, dateKey: string): void => {
    const targetWorkout = workouts[workoutId];
    setSchedule((prev) => ({
      ...prev,
      [dateKey]: without(prev[dateKey] || [], workoutId),
    }));
    if (targetWorkout) {
      setExercises((prev) => omit(prev, targetWorkout.exerciseIds));
    }
    setWorkouts((prev) => omit(prev, [workoutId]));
  };

  const closeWorkoutModal = (): void => {
    setWorkoutModal({ isOpen: false });
  };

  // ── Exercise CRUD ──

  const handleAddExercise = (workoutId: string): void => {
    setExerciseModal({ isOpen: true, workoutId, exercise: null });
  };

  const handleEditExercise = (exercise: Exercise.Entity): void => {
    const workoutId = findWorkoutForExercise(exercise.id);
    setExerciseModal({ isOpen: true, workoutId, exercise });
  };

  const handleSaveExercise = (name: string, sets: Exercise.Set[]): void => {
    if (exerciseModal.exercise) {
      setExercises((prev) => ({
        ...prev,
        [exerciseModal.exercise!.id]: {
          ...exerciseModal.exercise!,
          name,
          sets,
        },
      }));
    } else if (exerciseModal.workoutId) {
      const exerciseId = generateId();
      const newExercise: Exercise.Entity = { id: exerciseId, name, sets };
      setExercises((prev) => ({ ...prev, [exerciseId]: newExercise }));
      setWorkouts((prev) => {
        const workout = prev[exerciseModal.workoutId!];
        return {
          ...prev,
          [exerciseModal.workoutId!]: {
            ...workout,
            exerciseIds: [...(workout?.exerciseIds ?? []), exerciseId],
          },
        };
      });
    }
    setExerciseModal({ isOpen: false });
  };

  const handleDeleteExercise = (): void => {
    if (!exerciseModal.exercise || !exerciseModal.workoutId) {
      return;
    }
    const exerciseId = exerciseModal.exercise.id;
    const workoutId = exerciseModal.workoutId;
    setWorkouts((prev) => {
      const workout = prev[workoutId];
      return {
        ...prev,
        [workoutId]: {
          ...workout,
          exerciseIds: without(workout?.exerciseIds ?? [], exerciseId),
        },
      };
    });
    setExercises((prev) => omit(prev, [exerciseId]));
    setExerciseModal({ isOpen: false });
  };

  const closeExerciseModal = (): void => {
    setExerciseModal({ isOpen: false });
  };

  // ── Navigation ──

  const goToPreviousWeek = (): void => {
    setCurrentDate((prev) => addWeeks(getWeekDays(prev)[0], -1));
  };

  const goToNextWeek = (): void => {
    setCurrentDate((prev) => addWeeks(getWeekDays(prev)[0], 1));
  };

  const goToToday = (): void => {
    setCurrentDate(new Date());
  };

  return {
    weekDays,
    weekRange,
    schedule,
    workouts,
    exercises,
    workoutModal,
    exerciseModal,
    handleDragEnd,
    handleAddWorkout,
    handleEditWorkout,
    handleSaveWorkout,
    handleDeleteWorkout,
    closeWorkoutModal,
    handleAddExercise,
    handleEditExercise,
    handleSaveExercise,
    handleDeleteExercise,
    closeExerciseModal,
    goToPreviousWeek,
    goToNextWeek,
    goToToday,
  };
};
