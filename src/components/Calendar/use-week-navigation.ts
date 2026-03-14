import { useState } from 'react';
import { getWeekDays, getWeekRange, addWeeks } from 'utils/date';

export const useWeekNavigation = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const weekDays = getWeekDays(currentDate);
  const weekRange = getWeekRange(weekDays);

  const goToPreviousWeek = (): void => {
    setCurrentDate((prev) => addWeeks(getWeekDays(prev)[0], -1));
  };

  const goToNextWeek = (): void => {
    setCurrentDate((prev) => addWeeks(getWeekDays(prev)[0], 1));
  };

  const goToToday = (): void => {
    setCurrentDate(new Date());
  };

  return { weekDays, weekRange, goToPreviousWeek, goToNextWeek, goToToday };
};
