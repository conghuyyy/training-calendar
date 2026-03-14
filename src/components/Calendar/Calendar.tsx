import './Calendar.css';
import { lazy, Suspense } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import DayColumn from 'components/DayColumn';
import { useCalendar } from './use-calendar';
import type { FunctionComponent } from 'react';

const LazyModal = lazy(() => import('components/Modal'));
const LazyWorkoutForm = lazy(() => import('components/WorkoutForm'));
const LazyExerciseForm = lazy(() => import('components/ExerciseForm'));

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
        <Suspense fallback={null}>
          <LazyModal
            isOpen={workoutModal.isOpen}
            onClose={closeWorkoutModal}
            title={workoutModal.workout ? 'Edit Workout' : 'Add Workout'}
          >
            <LazyWorkoutForm
              workout={workoutModal.workout}
              onSave={handleSaveWorkout}
              onCancel={closeWorkoutModal}
            />
          </LazyModal>
        </Suspense>
      )}

      {exerciseModal.isOpen && (
        <Suspense fallback={null}>
          <LazyModal
            isOpen={exerciseModal.isOpen}
            onClose={closeExerciseModal}
            title={exerciseModal.exercise ? 'Edit Exercise' : 'Add Exercise'}
          >
            <LazyExerciseForm
              exercise={exerciseModal.exercise}
              onSave={handleSaveExercise}
              onCancel={closeExerciseModal}
              onDelete={
                exerciseModal.exercise ? handleDeleteExercise : undefined
              }
            />
          </LazyModal>
        </Suspense>
      )}
    </div>
  );
};

export default Calendar;
