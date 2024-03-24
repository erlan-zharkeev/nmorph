import { NmorphIconList } from '@/types/common.enums';

export enum IconSize {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

export type IconName = keyof typeof NmorphIconList | '';
