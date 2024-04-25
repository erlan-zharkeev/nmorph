const isLeapYear = (year: number): boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

const maxDaysInMonth = (year: number, month: number): number => {
  if ([0, 2, 4, 6, 7, 9, 11].includes(month)) return 31;
  if ([3, 5, 8, 10].includes(month)) return 30;
  return isLeapYear(year) ? 29 : 28;
};

export const getMonthDaysByWeek = (year: number, month: number): number[][] => {
  const startDate = new Date(year, month, 1);

  const startDayOfWeek = startDate.getDay() + 1;
  const daysQuantityInMonth = maxDaysInMonth(year, month);
  const daysQuantityInWeekInPrevMonth = 7 + startDayOfWeek - 8;

  const endDate = new Date(year, month, daysQuantityInMonth);
  const endDayOfWeek = endDate.getDay() + 1;
  let daysQuantityInWeekInNextMonth = 7 - endDayOfWeek;

  const lasMonth = month - 1;
  const lastDayInLastMonth = maxDaysInMonth(year, lasMonth);
  let startDayInPrevMonthDates = lastDayInLastMonth - daysQuantityInWeekInPrevMonth;
  const prevDates = [];
  while (startDayInPrevMonthDates < lastDayInLastMonth) {
    startDayInPrevMonthDates++;
    prevDates.push(startDayInPrevMonthDates);
  }

  const nextDates = [];
  let nextMonthCounter = 0;
  while (daysQuantityInWeekInNextMonth) {
    nextMonthCounter++;
    daysQuantityInWeekInNextMonth--;
    nextDates.push(nextMonthCounter);
  }

  let daysCounter = 0;
  const datesInCurrentMonth = [];
  while (daysCounter < daysQuantityInMonth) {
    daysCounter++;
    datesInCurrentMonth.push(daysCounter);
  }

  const calendarDates = [...prevDates, ...datesInCurrentMonth, ...nextDates];

  const chunkedArrays = [];
  for (let i = 0; i < calendarDates.length; i += 7) {
    const chunk = calendarDates.slice(i, i + 7);
    chunkedArrays.push(chunk);
  }

  return chunkedArrays;
};
