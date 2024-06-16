import { NmorphIconList } from '@/types/common';

export enum NmorphIconSize {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

export type NmorphIconName = keyof typeof NmorphIconList | '';
