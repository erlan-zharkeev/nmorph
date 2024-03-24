export interface ICheckboxOption {
  id: string;
  disabled?: boolean;
  modelValue?: boolean;
  label?: string;
  styleType?: keyof typeof ICheckboxStyleType;
}

export enum ICheckboxStyleType {
  'checkbox-style' = 'checkbox-style',
  'button-style' = 'button-style',
}
