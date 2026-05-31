export type NmorphCalloutType = 'info' | 'warning' | 'success' | 'error';
export type NmorphCalloutRootTag = keyof HTMLElementTagNameMap;
export type NmorphCalloutTarget = '_self' | '_blank' | '_parent' | '_top' | 'self' | 'blank' | 'parent' | 'top';
export type NmorphCalloutReferrerPolicy =
  | ''
  | 'no-referrer'
  | 'no-referrer-when-downgrade'
  | 'origin'
  | 'origin-when-cross-origin'
  | 'same-origin'
  | 'strict-origin'
  | 'strict-origin-when-cross-origin'
  | 'unsafe-url';

export interface INmorphCalloutProps {
  type?: NmorphCalloutType;
  title?: string;
  content?: string;
  as?: NmorphCalloutRootTag;
  href?: string;
  target?: NmorphCalloutTarget;
  rel?: string;
  referrerpolicy?: NmorphCalloutReferrerPolicy;
  referrerPolicy?: NmorphCalloutReferrerPolicy;
  download?: string | boolean;
  ariaLabel?: string;
  color?: string;
  padding?: number | string;
  borderRadius?: number | string;
  accentWidth?: number | string;
  titleGap?: number | string;
  titleFontSize?: number | string;
  contentFontSize?: number | string;
}
