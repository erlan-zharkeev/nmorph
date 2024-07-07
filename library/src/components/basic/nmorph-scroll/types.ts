import { INmorphCoords } from '@/types';

export type NmorphCoordsType = INmorphCoords<number>;

export enum NmorphOverflowProp {
  auto = 'auto',
  hidden = 'hidden',
  scroll = 'scroll',
}

export enum NmorphScrollBehavior {
  auto = 'auto',
  smooth = 'smooth',
  inherit = 'inherit',
  initial = 'initial',
  unset = 'unset',
}
