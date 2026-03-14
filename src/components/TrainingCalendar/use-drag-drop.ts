import { reorder } from 'utils/helpers';
import type { DropResult } from '@hello-pangea/dnd';
import type { Dispatch, SetStateAction } from 'react';

export const useDragDrop = (
  setSchedule: Dispatch<SetStateAction<Schedule.Week>>,
  setWorkouts: Dispatch<SetStateAction<Workout.Map>>,
) => {
  const handleWorkoutDrag = (
    source: DropResult['source'],
    destination: NonNullable<DropResult['destination']>,
  ): void => {
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
  };

  const handleExerciseDrag = (
    source: DropResult['source'],
    destination: NonNullable<DropResult['destination']>,
  ): void => {
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
  };

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
      handleWorkoutDrag(source, destination);
    }
    if (type === 'EXERCISE') {
      handleExerciseDrag(source, destination);
    }
  };

  return { handleDragEnd };
};
