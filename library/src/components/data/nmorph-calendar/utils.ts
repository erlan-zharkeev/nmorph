import {
  INmorphDateFormatOptions,
  NmorphCalendarDatesType,
  NmorphCalendarRangeType,
  NmorphSelectedDateModelType,
} from './types';
import { useCalendarTexts } from './hooks/use-calendar-texts';
import { Ref } from 'vue';

export const getDecadeYears = (year: number) => {
  const startYear = year - (year % 10);
  const years = [];
  for (let i = 0; i < 10; i++) {
    years.push(startYear + i);
  }
  return years;
};

const defaultDateFormatOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
};

const padDatePart = (value: number) => String(value).padStart(2, '0');

const formatDateByPattern = (date: Date, format: string) => {
  const values: Record<string, string> = {
    YYYY: String(date.getFullYear()),
    YY: String(date.getFullYear()).slice(-2),
    MM: padDatePart(date.getMonth() + 1),
    M: String(date.getMonth() + 1),
    DD: padDatePart(date.getDate()),
    D: String(date.getDate()),
  };

  return format.replace(/YYYY|YY|MM|M|DD|D/g, (token) => values[token]);
};

export const formatDate = (date: NmorphSelectedDateModelType, formatOptions: INmorphDateFormatOptions = {}) => {
  if (!date) return;

  const formatSingleDate = (value: Date) => {
    if (formatOptions.formatter) return formatOptions.formatter(value);
    if (formatOptions.format) return formatDateByPattern(value, formatOptions.format);
    return new Intl.DateTimeFormat(
      formatOptions.locale || 'en-CA',
      formatOptions.options || defaultDateFormatOptions
    ).format(value);
  };

  if (Array.isArray(date)) {
    return date.map((value) => (value ? formatSingleDate(value) : null));
  }
  return formatSingleDate(date);
};

export const formatDateIntl = (date: NmorphSelectedDateModelType) => formatDate(date);

export const hasAnyRangeDateInPrevMonth = (currentDate: Date, prevMonthRange: Date) => {
  return currentDate.getMonth() > prevMonthRange.getMonth();
};

export const hasAnyRangeDateInNextMonth = (currentDate: Date, nextMonthRange: Date) => {
  return currentDate.getMonth() < nextMonthRange.getMonth();
};

export const isTodayInMonthRange = (range: NmorphCalendarRangeType) => {
  const currentDate = new Date();
  if (!range) return true;
  const prevMonthRange = range && range[0];
  const nextMonthRange = range && range[1];
  return currentDate >= prevMonthRange && currentDate <= nextMonthRange;
};

export const getMonthName = (monthIndex: number) => {
  const { months } = useCalendarTexts();
  return months[monthIndex];
};

const isLeapYear = (year: number): boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

const maxDaysInMonth = (year: number, month: number): number => {
  if ([0, 2, 4, 6, 7, 9, 11].includes(month)) return 31;
  if ([3, 5, 8, 10].includes(month)) return 30;
  return isLeapYear(year) ? 29 : 28;
};

export const resetTimeToZero = (date: Date): Date => new Date(date.getFullYear(), date.getMonth(), date.getDate());

export const getMonthDaysByWeek = (
  selectedDate: Ref<Date>,
  range: NmorphCalendarRangeType | undefined
): NmorphCalendarDatesType[] => {
  const isDateHidden = (candidateDate: Date) => {
    return range ? candidateDate < resetTimeToZero(range[0]) || candidateDate > resetTimeToZero(range[1]) : false;
  };

  const year: number = selectedDate.value.getFullYear();
  const month: number = selectedDate.value.getMonth();

  const startDate = new Date(year, month, 1);

  const startDayOfWeek = startDate.getDay() + 1;
  const daysQuantityInMonth = maxDaysInMonth(year, month);
  const daysQuantityInWeekInPrevMonth = 7 + startDayOfWeek - 8;

  const endDate = new Date(year, month, daysQuantityInMonth);
  const endDayOfWeek = endDate.getDay() + 1;
  let daysQuantityInWeekInNextMonth = 7 - endDayOfWeek;
  const today = new Date();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth();

  const prevMonth = month - 1;
  const lastDayInLastMonth = maxDaysInMonth(year, prevMonth);
  let startDayInPrevMonthDates = lastDayInLastMonth - daysQuantityInWeekInPrevMonth;
  const prevDates: NmorphCalendarDatesType = [];
  while (startDayInPrevMonthDates < lastDayInLastMonth) {
    startDayInPrevMonthDates++;
    const isToday = todayMonth === prevMonth && todayDate === startDayInPrevMonthDates;
    const candidateDate = new Date(year, prevMonth, startDayInPrevMonthDates);
    prevDates.push({
      value: startDayInPrevMonthDates,
      monthType: 'previous',
      isToday,
      date: candidateDate,
      hidden: isDateHidden(candidateDate),
    });
  }

  const nextMonth = month + 1;
  const nextDates: NmorphCalendarDatesType = [];
  let nextMonthDaysCounter = 0;
  while (daysQuantityInWeekInNextMonth) {
    nextMonthDaysCounter++;
    daysQuantityInWeekInNextMonth--;
    const isToday = todayMonth === nextMonth && todayDate === nextMonthDaysCounter;
    const candidateDate = new Date(year, nextMonth, nextMonthDaysCounter);
    nextDates.push({
      value: nextMonthDaysCounter,
      monthType: 'next',
      isToday,
      date: candidateDate,
      hidden: isDateHidden(candidateDate),
    });
  }

  let daysCounter = 0;
  const datesInCurrentMonth: NmorphCalendarDatesType = [];
  while (daysCounter < daysQuantityInMonth) {
    const todayDate = today.getDate();
    daysCounter++;
    const isToday = todayMonth === month && todayDate === daysCounter;
    const candidateDate = new Date(year, month, daysCounter);
    datesInCurrentMonth.push({
      value: daysCounter,
      monthType: 'current',
      isToday,
      date: candidateDate,
      hidden: isDateHidden(candidateDate),
    });
  }

  const calendarDates = [...prevDates, ...datesInCurrentMonth, ...nextDates];

  const chunkedArrays = [];
  for (let i = 0; i < calendarDates.length; i += 7) {
    const chunk = calendarDates.slice(i, i + 7);
    chunkedArrays.push(chunk);
  }

  return chunkedArrays.filter((week) => {
    return !week.every((day) => day.hidden);
  });
};
