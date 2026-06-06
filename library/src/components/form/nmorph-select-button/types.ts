import type { INmorphCommonInputProps } from '@/types';
import { Ref } from 'vue';

export type NmorphSelectButtonChangeHandlerInjectionType = (value: string) => void;
export type NmorphSelectButtonSelectedValueInjectionType = Ref<string>;

export interface INmorphSelectButtonOption {
  value: string;
  label?: string;
  disabled?: boolean;
}

export interface INmorphSelectButtonProps extends INmorphCommonInputProps {
  modelValue?: string;
  options?: INmorphSelectButtonOption[];
  fill?: boolean;
  trackPadding?: number | string;
  itemSize?: number | string;
  itemFontSize?: string;
  itemLineHeight?: string;
}

export interface INmorphSelectButtonEmit {
  (e: 'update:model-value', val: string): void;
}
