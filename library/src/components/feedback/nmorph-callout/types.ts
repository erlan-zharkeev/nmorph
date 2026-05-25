export type NmorphCalloutType = 'info' | 'warning' | 'success' | 'error';

export interface INmorphCalloutProps {
  type?: NmorphCalloutType;
  title?: string;
  content: string;
  color?: string;
  padding?: number | string;
  borderRadius?: number | string;
  accentWidth?: number | string;
  titleGap?: number | string;
  titleFontSize?: number | string;
  contentFontSize?: number | string;
}
