import './DayColumn.css';
import { Droppable } from '@hello-pangea/dnd';
import WorkoutCard from 'components/WorkoutCard';
import { DND_TYPE_WORKOUT } from 'config/constants';
import { getDayName, getDayOfMonth, isToday } from 'utils/date';
import { mapCompact, noop } from 'utils/helpers';
import type { FunctionComponent, ReactElement } from 'react';

const DayColumn: FunctionComponent<{
  dateKey: string;
  workoutIds: string[];
  workouts: Workout.Map;
  exercises: Exercise.Map;
  onAddWorkout?: (dateKey: string) => void;
  onEditWorkout?: (workout: Workout.Entity) => void;
  onEditExercise?: (exercise: Exercise.Entity) => void;
  onAddExercise?: (workoutId: string) => void;
  onDeleteWorkout?: (workoutId: string, dateKey: string) => void;
}> = ({
  dateKey,
  workoutIds,
  workouts,
  exercises,
  onAddWorkout = noop,
  onEditWorkout = noop,
  onEditExercise = noop,
  onAddExercise = noop,
  onDeleteWorkout = noop,
}) => {
  const isTodayDate = isToday(dateKey);
  const dayName = getDayName(dateKey);
  const dayOfMonth = getDayOfMonth(dateKey);

  const dayWorkouts = mapCompact(workoutIds, (id) => workouts[id]);

  const renderColumnHeader = (): ReactElement => (
    <div className="day-column__top-row">
      <span
        className={`day-column__date ${isTodayDate ? 'day-column__date--today' : ''}`}
      >
        {String(dayOfMonth).padStart(2, '0')}
      </span>
      <button
        className="day-column__add-button"
        onClick={() => onAddWorkout(dateKey)}
        title="Add workout"
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
  );

  return (
    <div className="day-column">
      <span
        className={`day-column__day-name ${isTodayDate ? 'day-column__day-name--today' : ''}`}
      >
        {dayName}
      </span>

      <div className="day-column__body">
        {renderColumnHeader()}
        <Droppable droppableId={dateKey} type={DND_TYPE_WORKOUT}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`day-column__content ${snapshot.isDraggingOver ? 'day-column__content--over' : ''}`}
            >
              {dayWorkouts.map((workout, workoutIndex) => (
                <WorkoutCard
                  key={workout.id}
                  workout={workout}
                  exercises={exercises}
                  dateKey={dateKey}
                  index={workoutIndex}
                  onEditWorkout={onEditWorkout}
                  onEditExercise={onEditExercise}
                  onAddExercise={onAddExercise}
                  onDeleteWorkout={onDeleteWorkout}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default DayColumn;
