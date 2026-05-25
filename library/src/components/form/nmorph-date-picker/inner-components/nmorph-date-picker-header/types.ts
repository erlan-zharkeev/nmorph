export interface INmorphDatePickerHeaderProps {
  year: number;
  month: number;
}

export interface INmorphDatePickerHeaderEmit {
  (e: 'prev-month'): void;
  (e: 'next-month'): void;
  (e: 'prev-year'): void;
  (e: 'next-year'): void;
  (e: 'change-year'): void;
  (e: 'change-month'): void;
}
