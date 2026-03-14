import './TrainingCalendar.css';
import { lazy, useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import DayColumn from 'components/DayColumn';
import { initialExercises } from 'data/exercises';
import { initialWorkouts } from 'data/workouts';
import { initialSchedule } from 'data/schedule';
import CalendarHeader from './CalendarHeader';
import { useWeekNavigation } from './use-week-navigation';
import { useDragDrop } from './use-drag-drop';
import { useWorkoutModal } from './use-workout-modal';
import { useExerciseModal } from './use-exercise-modal';
import type { FunctionComponent } from 'react';

const WorkoutModal = lazy(() => import('modals/WorkoutModal'));
const ExerciseModal = lazy(() => import('modals/ExerciseModal'));

const TrainingCalendar: FunctionComponent = () => {
  const [schedule, setSchedule] = useState<Schedule.Week>(initialSchedule);
  const [workouts, setWorkouts] = useState<Workout.Map>(initialWorkouts);
  const [exercises, setExercises] = useState<Exercise.Map>(initialExercises);

  const { weekDays, weekRange, goToPreviousWeek, goToNextWeek, goToToday } =
    useWeekNavigation();
  const { handleDragEnd } = useDragDrop(setSchedule, setWorkouts);
  const {
    workoutModal,
    handleAddWorkout,
    handleEditWorkout,
    handleSaveWorkout,
    handleDeleteWorkout,
    closeWorkoutModal,
  } = useWorkoutModal(
    schedule,
    workouts,
    setWorkouts,
    setSchedule,
    setExercises,
  );
  const {
    exerciseModal,
    handleAddExercise,
    handleEditExercise,
    handleSaveExercise,
    handleDeleteExercise,
    closeExerciseModal,
  } = useExerciseModal(workouts, setWorkouts, setExercises);

  return (
    <div className="calendar">
      <CalendarHeader
        weekRange={weekRange}
        onPreviousWeek={goToPreviousWeek}
        onNextWeek={goToNextWeek}
        onToday={goToToday}
      />

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

export default TrainingCalendar;
