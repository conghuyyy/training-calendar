import { useState, useRef, useEffect, useCallback } from 'react';
import type { FunctionComponent } from 'react';

const WorkoutCardMenu: FunctionComponent<{
  workout: Workout.Entity;
  dateKey: string;
  onEdit: (workout: Workout.Entity) => void;
  onDelete: (workoutId: string, dateKey: string) => void;
}> = ({ workout, dateKey, onEdit, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback((): void => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }
    const handleClickOutside = (event: MouseEvent): void => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen, closeMenu]);

  return (
    <div className="workout-card__menu-wrapper" ref={menuRef}>
      <button
        className="workout-card__dots-button"
        onClick={(event) => {
          event.stopPropagation();
          setMenuOpen((prev) => !prev);
        }}
        title="Options"
      >
        <span className="workout-card__dot" />
        <span className="workout-card__dot" />
        <span className="workout-card__dot" />
      </button>
      {menuOpen && (
        <div className="workout-card__dropdown">
          <button
            className="workout-card__dropdown-item"
            onClick={() => {
              onEdit(workout);
              closeMenu();
            }}
          >
            Edit Workout
          </button>
          <button
            className="workout-card__dropdown-item workout-card__dropdown-item--danger"
            onClick={() => {
              onDelete(workout.id, dateKey);
              closeMenu();
            }}
          >
            Delete Workout
          </button>
        </div>
      )}
    </div>
  );
};

export default WorkoutCardMenu;
