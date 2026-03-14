import Modal from 'components/Modal';
import ExerciseForm from './ExerciseForm';
import type { FunctionComponent } from 'react';

const ExerciseModal: FunctionComponent<{
  isOpen: boolean;
  exercise?: Exercise.Entity | null;
  onSave: (name: string, sets: Exercise.Set[]) => void;
  onDelete?: () => void;
  onClose: () => void;
}> = ({ isOpen, exercise, onSave, onDelete, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={exercise ? 'Edit Exercise' : 'Add Exercise'}
    >
      <ExerciseForm
        exercise={exercise}
        onSave={onSave}
        onCancel={onClose}
        onDelete={exercise ? onDelete : undefined}
      />
    </Modal>
  );
};

export default ExerciseModal;
