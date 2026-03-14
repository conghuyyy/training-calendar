import './ExerciseItem.css';
import { Draggable } from '@hello-pangea/dnd';
import type { FunctionComponent } from 'react';

const ExerciseItem: FunctionComponent<{
  exercise: Exercise.Entity;
  index: number;
  onEdit?: (exercise: Exercise.Entity) => void;
}> = ({ exercise, index, onEdit }) => {
  const setsText = exercise.sets
    .map((set) =>
      set.weight > 0 ? `${set.weight} lb x ${set.reps}` : `BW x ${set.reps}`,
    )
    .join(', ');

  const setCount = exercise.sets.length;

  return (
    <Draggable draggableId={exercise.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`exercise-item ${snapshot.isDragging ? 'exercise-item--dragging' : ''}`}
          onDoubleClick={() => onEdit?.(exercise)}
        >
          <div className="exercise-item__name">{exercise.name}</div>
          <div className="exercise-item__meta">
            <span className="exercise-item__set-count">{setCount}x</span>
            <span className="exercise-item__sets">{setsText}</span>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default ExerciseItem;
