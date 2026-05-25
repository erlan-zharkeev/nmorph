import type { NmorphSelectionDateType } from '@/types';
export type NmorphCalendarDateType = 'current' | 'previous' | 'next';
export interface INmorphCalendarDate {
  monthType: NmorphCalendarDateType;
  value: number;
  isToday: boolean;
  date: Date;
  hidden: boolean;
}
export type NmorphCalendarRangeType = [Date, Date] | undefined;
export type NmorphCalendarDatesType = INmorphCalendarDate[];
export type NmorphDateType = Date;
export type NmorphSelectedDateModelType = NmorphDateType | NmorphDateType[] | null;
export type NmorphDateFormatterType = (date: Date) => string;
export interface INmorphDateFormatOptions {
  locale?: string | string[];
  options?: Intl.DateTimeFormatOptions;
  format?: string;
  formatter?: NmorphDateFormatterType;
}

export interface INmorphCalendarProps {
  markToday?: boolean;
  initialDate?: Date;
  range?: NmorphCalendarRangeType;
  type?: keyof typeof NmorphSelectionDateType;
  modelValue?: NmorphSelectedDateModelType;
  cellHeight?: number | string;
}

export interface INmorphCalendarEmit {
  (e: 'update:model-value', date: NmorphSelectedDateModelType): void;
  (e: 'update-initial-date', date: Date): void;
}
