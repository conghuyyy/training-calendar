import './WorkoutCard.css';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import ExerciseItem from 'components/ExerciseItem';
import WorkoutCardMenu from './WorkoutCardMenu';
import { DND_TYPE_EXERCISE } from 'config/constants';
import { mapCompact, noop } from 'utils/helpers';
import type { FunctionComponent } from 'react';

const WorkoutCard: FunctionComponent<{
  workout: Workout.Entity;
  exercises: Exercise.Map;
  dateKey: string;
  index: number;
  onEditWorkout?: (workout: Workout.Entity) => void;
  onEditExercise?: (exercise: Exercise.Entity) => void;
  onAddExercise?: (workoutId: string) => void;
  onDeleteWorkout?: (workoutId: string, dateKey: string) => void;
}> = ({
  workout,
  exercises,
  dateKey,
  index,
  onEditWorkout = noop,
  onEditExercise = noop,
  onAddExercise = noop,
  onDeleteWorkout = noop,
}) => {
  const workoutExercises = mapCompact(
    workout.exerciseIds,
    (id) => exercises[id],
  );

  return (
    <Draggable draggableId={workout.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`workout-card ${snapshot.isDragging ? 'workout-card--dragging' : ''}`}
        >
          <div className="workout-card__header" {...provided.dragHandleProps}>
            <span className="workout-card__name" title={workout.name}>
              {workout.name}
            </span>
            <WorkoutCardMenu
              workout={workout}
              dateKey={dateKey}
              onEdit={onEditWorkout}
              onDelete={onDeleteWorkout}
            />
          </div>

          <Droppable droppableId={workout.id} type={DND_TYPE_EXERCISE}>
            {(exerciseDropProvided, exerciseDropSnapshot) => (
              <div
                ref={exerciseDropProvided.innerRef}
                {...exerciseDropProvided.droppableProps}
                className={`workout-card__exercise-list ${exerciseDropSnapshot.isDraggingOver ? 'workout-card__exercise-list--over' : ''}`}
              >
                {workoutExercises.length === 0 &&
                  !exerciseDropSnapshot.isDraggingOver && (
                    <div className="workout-card__empty">No exercises yet</div>
                  )}
                {workoutExercises.map((exercise, exerciseIndex) => (
                  <ExerciseItem
                    key={exercise.id}
                    exercise={exercise}
                    index={exerciseIndex}
                    onEdit={onEditExercise}
                  />
                ))}
                {exerciseDropProvided.placeholder}
              </div>
            )}
          </Droppable>

          <button
            className="workout-card__add-exercise-button"
            onClick={() => onAddExercise(workout.id)}
            title="Add exercise"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <ellipse cx="6" cy="6" rx="6" ry="6" fill="currentColor" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7 4.93V2.96H5V4.93H3V6.91H5V8.88H7V6.91H9V4.93H7Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      )}
    </Draggable>
  );
};

export default WorkoutCard;
