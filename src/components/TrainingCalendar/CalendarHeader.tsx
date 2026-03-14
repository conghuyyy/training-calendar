import type { FunctionComponent } from 'react';

const CalendarHeader: FunctionComponent<{
  weekRange: string;
  onPreviousWeek: () => void;
  onNextWeek: () => void;
  onToday: () => void;
}> = ({ weekRange, onPreviousWeek, onNextWeek, onToday }) => (
  <div className="calendar__header">
    <div className="calendar__navigation">
      <button
        className="calendar__navigation-button"
        onClick={onPreviousWeek}
        title="Previous week"
      >
        ‹
      </button>
      <button
        className="calendar__navigation-button"
        onClick={onNextWeek}
        title="Next week"
      >
        ›
      </button>
      <button className="calendar__today-button" onClick={onToday}>
        Today
      </button>
    </div>
    <h2 className="calendar__title">{weekRange}</h2>
  </div>
);

export default CalendarHeader;
