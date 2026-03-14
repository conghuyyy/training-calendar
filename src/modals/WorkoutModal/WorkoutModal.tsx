import Modal from 'components/Modal';
import WorkoutForm from './WorkoutForm';
import type { FunctionComponent } from 'react';

const WorkoutModal: FunctionComponent<{
  isOpen: boolean;
  workout?: Workout.Entity | null;
  onSave: (name: string) => void;
  onClose: () => void;
}> = ({ isOpen, workout, onSave, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={workout ? 'Edit Workout' : 'Add Workout'}
    >
      <WorkoutForm workout={workout} onSave={onSave} onCancel={onClose} />
    </Modal>
  );
};

export default WorkoutModal;
