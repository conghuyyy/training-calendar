import './WorkoutForm.css';
import { useState } from 'react';
import { noop } from 'utils/helpers';
import type { FunctionComponent } from 'react';

const WorkoutForm: FunctionComponent<{
  workout?: Workout.Entity | null;
  onSave: (name: string) => void;
  onCancel?: () => void;
}> = ({ workout, onSave, onCancel = noop }) => {
  const [name, setName] = useState(workout?.name ?? '');

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) {
      return;
    }
    onSave(trimmedName);
  };

  return (
    <form className="workout-form" onSubmit={handleSubmit}>
      <div className="workout-form__field">
        <label className="workout-form__label">Workout Name</label>
        <input
          className="workout-form__input"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="e.g. Chest Day - with Arm exercises"
          autoFocus
        />
      </div>
      <div className="workout-form__actions">
        <button
          type="button"
          className="workout-form__button workout-form__button--secondary"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="workout-form__button workout-form__button--primary"
          disabled={!name.trim()}
        >
          {workout ? 'Save' : 'Add Workout'}
        </button>
      </div>
    </form>
  );
};

export default WorkoutForm;
