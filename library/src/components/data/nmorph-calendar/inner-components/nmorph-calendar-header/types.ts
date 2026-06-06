import type { NmorphElementDesignType } from '@/types';

export interface INmorphCalendarHeaderProps {
  year: number;
  month: number;
  showPreviousMonthButton: boolean;
  showNextMonthButton: boolean;
  showTodayButton: boolean;
  design?: NmorphElementDesignType;
}

export interface INmorphCalendarHeaderEmit {
  (e: 'click-previous-month'): void;
  (e: 'click-today'): void;
  (e: 'click-next-month'): void;
}
