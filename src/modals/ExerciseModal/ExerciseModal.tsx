import './ExerciseModal.css';
import 'styles/ModalForm.css';
import { useState } from 'react';
import Modal from 'components/Modal';
import { DEFAULT_SET } from 'config/constants';
import { last, updateAt, removeAt, noop } from 'utils/helpers';
import type { FunctionComponent } from 'react';

const ExerciseModal: FunctionComponent<{
  isOpen: boolean;
  exercise?: Exercise.Entity | null;
  onSave: (name: string, sets: Exercise.Set[]) => void;
  onDelete?: () => void;
  onClose: () => void;
}> = ({ isOpen, exercise, onSave, onDelete, onClose = noop }) => {
  const [name, setName] = useState(exercise?.name ?? '');
  const [sets, setSets] = useState<Exercise.Set[]>(
    exercise?.sets ?? [{ ...DEFAULT_SET }],
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
    setSets((prev) =>
      updateAt(prev, index, (set) => ({ ...set, [field]: value })),
    );
  };

  const removeSet = (index: number): void => {
    setSets((prev) => removeAt(prev, index));
  };

  const addSet = (): void => {
    const lastSet = last(sets);
    setSets((prev) => [...prev, lastSet ? { ...lastSet } : { ...DEFAULT_SET }]);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={exercise ? 'Edit Exercise' : 'Add Exercise'}
    >
      <form className="modal-form" onSubmit={handleSubmit}>
        <div className="modal-form__field">
          <label className="modal-form__label">Exercise Name</label>
          <input
            className="modal-form__input"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="e.g. Bench Press Medium Grip"
            autoFocus
          />
        </div>

        <div className="modal-form__field">
          <label className="modal-form__label">Sets</label>
          {sets.map((set, index) => (
            <div key={index} className="exercise-form__set-row">
              <span className="exercise-form__set-label">{index + 1}.</span>
              <input
                className="modal-form__input modal-form__input--narrow"
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
                className="modal-form__input modal-form__input--narrow"
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

        <div className="modal-form__actions">
          {exercise && onDelete && (
            <button
              type="button"
              className="modal-form__button modal-form__button--danger"
              onClick={onDelete}
              style={{ marginRight: 'auto' }}
            >
              Delete
            </button>
          )}
          <button
            type="button"
            className="modal-form__button modal-form__button--secondary"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="modal-form__button modal-form__button--primary"
            disabled={!name.trim() || sets.length === 0}
          >
            {exercise ? 'Save' : 'Add Exercise'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ExerciseModal;
