import type { NmorphColor } from '@/types';

export type NmorphLinkReferrerPolicy =
  | ''
  | 'no-referrer'
  | 'no-referrer-when-downgrade'
  | 'origin'
  | 'origin-when-cross-origin'
  | 'same-origin'
  | 'strict-origin'
  | 'strict-origin-when-cross-origin'
  | 'unsafe-url';

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
  rel?: string;
  referrerpolicy?: NmorphLinkReferrerPolicy;
  referrerPolicy?: NmorphLinkReferrerPolicy;
  download?: string | boolean;
  ariaLabel?: string;
  title?: string;
  disabled?: boolean;
  color?: string;
  iconName?: string;
}
