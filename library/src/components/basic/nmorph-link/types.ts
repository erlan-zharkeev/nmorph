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

export const NmorphLinkTarget = {
  self: '_self',
  blank: '_blank',
  parent: '_parent',
  top: '_top',
} as const;

export type NmorphLinkTarget = keyof typeof NmorphLinkTarget;

export interface INmorphLinkProps {
  type?: NmorphColor;
  underline?: boolean;
  href?: string;
  text?: string;
  target?: NmorphLinkTarget;
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
