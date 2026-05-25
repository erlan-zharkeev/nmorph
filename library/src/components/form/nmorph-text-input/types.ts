import type { INmorphCommonInputProps } from '@/types';

export interface INmorphTextInputProps extends INmorphCommonInputProps {
  placeholder?: string;
  typePassword?: boolean;
  modelValue?: string;
  clearable?: boolean;
  indentation?: string;
  inputAttrs?: Record<string, string | number | boolean | undefined>;
}

export interface INmorphTextInputEmit {
  (e: 'update:model-value', val: string): void;
  (e: 'focus'): void;
  (e: 'blur'): void;
  (e: 'on-enter'): void;
  (e: 'keydown', event: KeyboardEvent): void;
}
