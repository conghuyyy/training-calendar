import './ExerciseForm.css';
import { useState } from 'react';
import { last, updateAt, removeAt, noop } from 'utils/helpers';
import type { FunctionComponent } from 'react';

const ExerciseForm: FunctionComponent<{
  exercise?: Exercise.Entity | null;
  onSave: (name: string, sets: Exercise.Set[]) => void;
  onCancel?: () => void;
  onDelete?: () => void;
}> = ({ exercise, onSave, onCancel = noop, onDelete }) => {
  const [name, setName] = useState(exercise?.name ?? '');
  const [sets, setSets] = useState<Exercise.Set[]>(
    exercise?.sets ?? [{ weight: 0, reps: 10 }],
  );

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName || sets.length === 0) {
      return;
    }
    onSave(trimmedName, sets);
  };

  const updateSet = (
    index: number,
    field: keyof Exercise.Set,
    value: number,
  ): void => {
    setSets((previousSets) =>
      updateAt(previousSets, index, (set) => ({ ...set, [field]: value })),
    );
  };

  const removeSet = (targetIndex: number): void => {
    setSets((previousSets) => removeAt(previousSets, targetIndex));
  };

  const addSet = (): void => {
    const lastSet = last(sets);
    setSets((previousSets) => [
      ...previousSets,
      lastSet ? { ...lastSet } : { weight: 0, reps: 10 },
    ]);
  };

  return (
    <form className="exercise-form" onSubmit={handleSubmit}>
      <div className="exercise-form__field">
        <label className="exercise-form__label">Exercise Name</label>
        <input
          className="exercise-form__input"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="e.g. Bench Press Medium Grip"
          autoFocus
        />
      </div>

      <div className="exercise-form__field">
        <label className="exercise-form__label">Sets</label>
        {sets.map((set, index) => (
          <div key={index} className="exercise-form__set-row">
            <span className="exercise-form__set-label">{index + 1}.</span>
            <input
              className="exercise-form__input exercise-form__input--narrow"
              type="number"
              min="0"
              value={set.weight}
              onChange={(event) =>
                updateSet(index, 'weight', Number(event.target.value))
              }
              placeholder="Weight"
            />
            <span className="exercise-form__set-label">lb ×</span>
            <input
              className="exercise-form__input exercise-form__input--narrow"
              type="number"
              min="1"
              value={set.reps}
              onChange={(event) =>
                updateSet(index, 'reps', Number(event.target.value))
              }
              placeholder="Reps"
            />
            {sets.length > 1 && (
              <button
                type="button"
                className="exercise-form__remove-set-button"
                onClick={() => removeSet(index)}
              >
                ×
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          className="exercise-form__add-set-button"
          onClick={addSet}
        >
          + Add set
        </button>
      </div>

      <div className="exercise-form__actions">
        {exercise && onDelete && (
          <button
            type="button"
            className="exercise-form__button exercise-form__button--danger"
            onClick={onDelete}
            style={{ marginRight: 'auto' }}
          >
            Delete
          </button>
        )}
        <button
          type="button"
          className="exercise-form__button exercise-form__button--secondary"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="exercise-form__button exercise-form__button--primary"
          disabled={!name.trim() || sets.length === 0}
        >
          {exercise ? 'Save' : 'Add Exercise'}
        </button>
      </div>
    </form>
  );
};

export default ExerciseForm;
