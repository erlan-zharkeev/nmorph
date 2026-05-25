export interface INmorphYearMonthPickerProps {
  currentDate: Date;
  type?: 'year' | 'month';
}

export interface INmorphYearMonthPickerEmit {
  (e: 'update-year', val: string): void;
  (e: 'update-month', val: string): void;
  (e: 'back-to-years'): void;
}
