export const NmorphSelectionDateType = {
  date: 'date',
  dates: 'dates',
  daterange: 'daterange',
} as const;

export type NmorphSelectionDateType = keyof typeof NmorphSelectionDateType;

export type NmorphInnerPickerType = 'calendar' | 'year' | 'month';

export type NmorphDatePickerControlsType = 'decrease' | 'increase';
