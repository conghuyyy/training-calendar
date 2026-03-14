const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function formatDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getWeekDays(referenceDate: Date = new Date()): string[] {
  const date = new Date(referenceDate);
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  const monday = new Date(date);
  monday.setDate(date.getDate() + diff);

  const days: string[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    days.push(formatDateKey(d));
  }
  return days;
}

export function isToday(dateKey: string): boolean {
  return dateKey === formatDateKey(new Date());
}

export function getDayName(dateKey: string): string {
  const date = new Date(dateKey + 'T12:00:00');
  const dayIndex = date.getDay();
  const mondayBasedIndex = dayIndex === 0 ? 6 : dayIndex - 1;
  return DAY_NAMES[mondayBasedIndex];
}

export function getDayOfMonth(dateKey: string): number {
  return new Date(dateKey + 'T12:00:00').getDate();
}

export function getMonthName(dateKey: string): string {
  const date = new Date(dateKey + 'T12:00:00');
  return date.toLocaleDateString('en-US', { month: 'long' });
}

export function getYear(dateKey: string): number {
  return new Date(dateKey + 'T12:00:00').getFullYear();
}

export function getWeekRange(days: string[]): string {
  if (days.length === 0) {
    return '';
  }
  const first = days[0];
  const last = days[days.length - 1];
  const firstMonth = getMonthName(first);
  const lastMonth = getMonthName(last);
  const firstDay = getDayOfMonth(first);
  const lastDay = getDayOfMonth(last);
  const year = getYear(first);

  if (firstMonth === lastMonth) {
    return `${firstMonth} ${firstDay} - ${lastDay}, ${year}`;
  }
  return `${firstMonth} ${firstDay} - ${lastMonth} ${lastDay}, ${year}`;
}

export function addWeeks(dateKey: string, weeks: number): Date {
  const date = new Date(dateKey + 'T12:00:00');
  date.setDate(date.getDate() + weeks * 7);
  return date;
}
