import { useI18n } from 'vue-i18n';
const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const DAYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

export const useCalendarTexts = () => {
  const { t } = useI18n();

  return {
    months: MONTHS.map((key) => t(`NmorphCalendar.${key}`)),
    days: DAYS.map((key) => t(`NmorphCalendar.${key}`)),
  };
};
