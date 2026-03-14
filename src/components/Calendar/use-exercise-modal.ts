import { useState } from 'react';
import { without, omit, findKey, generateId } from 'utils/helpers';
import type { Dispatch, SetStateAction } from 'react';

export const useExerciseModal = (
  workouts: Workout.Map,
  setWorkouts: Dispatch<SetStateAction<Workout.Map>>,
  setExercises: Dispatch<SetStateAction<Exercise.Map>>,
) => {
  const [exerciseModal, setExerciseModal] = useState<{
    isOpen: boolean;
    workoutId?: string;
    exercise?: Exercise.Entity | null;
  }>({ isOpen: false });

  const handleAddExercise = (workoutId: string): void => {
    setExerciseModal({ isOpen: true, workoutId, exercise: null });
  };

  const handleEditExercise = (exercise: Exercise.Entity): void => {
    const workoutId = findKey(workouts, (workout) =>
      workout.exerciseIds.includes(exercise.id),
    );
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

  return {
    exerciseModal,
    handleAddExercise,
    handleEditExercise,
    handleSaveExercise,
    handleDeleteExercise,
    closeExerciseModal,
  };
};
