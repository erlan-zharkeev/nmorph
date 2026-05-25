import type { INmorphCommonInputProps } from '@/types';

export type NmorphTextareaResizeType = 'none' | 'both' | 'horizontal' | 'vertical';

export interface INmorphTextareaProps extends INmorphCommonInputProps {
  placeholder?: string;
  modelValue?: string;
  rows?: number;
  minRows?: number;
  maxRows?: number;
  resize?: NmorphTextareaResizeType;
  autoSize?: boolean;
  indentation?: string;
  textareaAttrs?: Record<string, string | number | boolean | undefined>;
}

export interface INmorphTextareaEmit {
  (e: 'update:model-value', val: string): void;
  (e: 'focus'): void;
  (e: 'blur'): void;
  (e: 'on-enter'): void;
  (e: 'keydown', event: KeyboardEvent): void;
}
