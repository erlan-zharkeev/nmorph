import type { INmorphCommonInputProps } from '@/types';

export interface INmorphSelectButtonItemProps extends Omit<INmorphCommonInputProps, 'height'> {
  value: string;
}
