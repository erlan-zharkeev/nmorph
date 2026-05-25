import type { NmorphColor } from '@/types';
export enum NmorphLinkTarget {
  self = '_self',
  blank = '_blank',
  parent = '_parent',
  top = '_top',
}

export interface INmorphLinkProps {
  type?: keyof typeof NmorphColor;
  underline?: boolean;
  href?: string;
  text?: string;
  target?: keyof typeof NmorphLinkTarget;
  disabled?: boolean;
  color?: string;
  iconName?: string;
}
