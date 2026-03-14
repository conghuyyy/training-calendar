import { reorder } from 'utils/helpers';
import type { DropResult } from '@hello-pangea/dnd';
import type { Dispatch, SetStateAction } from 'react';

export const useDragDrop = (
  setSchedule: Dispatch<SetStateAction<Schedule.Week>>,
  setWorkouts: Dispatch<SetStateAction<Workout.Map>>,
) => {
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

  return { handleDragEnd };
};
