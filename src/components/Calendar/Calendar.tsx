import './Calendar.css';
import { lazy } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import DayColumn from 'components/DayColumn';
import { useCalendar } from './use-calendar';
import type { FunctionComponent } from 'react';

const WorkoutModal = lazy(() => import('modals/WorkoutModal'));
const ExerciseModal = lazy(() => import('modals/ExerciseModal'));

const Calendar: FunctionComponent = () => {
  const {
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
  } = useCalendar();

  return (
    <div className="calendar">
      <div className="calendar__header">
        <div className="calendar__navigation">
          <button
            className="calendar__navigation-button"
            onClick={goToPreviousWeek}
            title="Previous week"
          >
            ‹
          </button>
          <button
            className="calendar__navigation-button"
            onClick={goToNextWeek}
            title="Next week"
          >
            ›
          </button>
          <button className="calendar__today-button" onClick={goToToday}>
            Today
          </button>
        </div>
        <h2 className="calendar__title">{weekRange}</h2>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="calendar__grid">
          {weekDays.map((dateKey) => (
            <DayColumn
              key={dateKey}
              dateKey={dateKey}
              workoutIds={schedule[dateKey] || []}
              workouts={workouts}
              exercises={exercises}
              onAddWorkout={handleAddWorkout}
              onEditWorkout={handleEditWorkout}
              onEditExercise={handleEditExercise}
              onAddExercise={handleAddExercise}
              onDeleteWorkout={handleDeleteWorkout}
            />
          ))}
        </div>
      </DragDropContext>

      {workoutModal.isOpen && (
        <WorkoutModal
          isOpen={workoutModal.isOpen}
          workout={workoutModal.workout}
          onSave={handleSaveWorkout}
          onClose={closeWorkoutModal}
        />
      )}

      {exerciseModal.isOpen && (
        <ExerciseModal
          isOpen={exerciseModal.isOpen}
          exercise={exerciseModal.exercise}
          onSave={handleSaveExercise}
          onDelete={exerciseModal.exercise ? handleDeleteExercise : undefined}
          onClose={closeExerciseModal}
        />
      )}
    </div>
  );
};

export default Calendar;
