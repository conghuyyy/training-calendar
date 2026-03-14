import { useState } from 'react';
import { without, omit, findKey, generateId } from 'utils/helpers';
import type { Dispatch, SetStateAction } from 'react';

export const useWorkoutModal = (
  schedule: Schedule.Week,
  workouts: Workout.Map,
  setWorkouts: Dispatch<SetStateAction<Workout.Map>>,
  setSchedule: Dispatch<SetStateAction<Schedule.Week>>,
  setExercises: Dispatch<SetStateAction<Exercise.Map>>,
) => {
  const [workoutModal, setWorkoutModal] = useState<{
    isOpen: boolean;
    dateKey?: string;
    workout?: Workout.Entity | null;
  }>({ isOpen: false });

  const handleAddWorkout = (dateKey: string): void => {
    setWorkoutModal({ isOpen: true, dateKey, workout: null });
  };

  const handleEditWorkout = (workout: Workout.Entity): void => {
    const dateKey = findKey(schedule, (workoutIds) =>
      workoutIds.includes(workout.id),
    );
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

  return {
    workoutModal,
    handleAddWorkout,
    handleEditWorkout,
    handleSaveWorkout,
    handleDeleteWorkout,
    closeWorkoutModal,
  };
};
