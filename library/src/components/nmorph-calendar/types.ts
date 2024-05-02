export type NmorphCalendarDateType = 'current' | 'previous' | 'next';
export interface NmorphCalendarDate {
  monthType: NmorphCalendarDateType;
  value: number;
  isToday: boolean;
  date: Date;
  hidden: boolean;
}
export type NmorphCalendarRange = [Date, Date] | undefined;
export type NmorphCalendarDates = NmorphCalendarDate[];
export type NmorphDate = Date | null;
export type NmorphSelectedDateModel = NmorphDate | NmorphDate[];
