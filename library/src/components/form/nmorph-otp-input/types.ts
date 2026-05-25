import type { INmorphCommonInputProps } from '@/types';

export type NmorphOtpInputMode = 'numeric' | 'text' | 'alphanumeric';

export interface INmorphOTPInputProps extends INmorphCommonInputProps {
  modelValue?: string;
  length?: number;
  mode?: NmorphOtpInputMode;
  autofocus?: boolean;
  autocapitalize?: string;
}

export interface INmorphOTPInputEmit {
  (e: 'update:model-value', val: string): void;
  (e: 'focus'): void;
  (e: 'blur'): void;
  (e: 'complete', val: string): void;
}

export interface INmorphTextInputExpose {
  inputDOMRef?: HTMLInputElement | null;
  focus?: () => void;
  blur?: () => void;
  select?: () => void;
}
