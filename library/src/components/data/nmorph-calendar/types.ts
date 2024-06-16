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
export type NmorphDateType = Date | null;
export type NmorphSelectedDateModelType = NmorphDateType | NmorphDateType[];
