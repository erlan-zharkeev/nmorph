export type NmorphLayoutAsidePositionType = 'left' | 'right';

export interface INmorphLayoutProps {
  tag?: string;
  gap?: number | string;
  asideWidth?: number | string;
  asidePosition?: NmorphLayoutAsidePositionType;
  fullHeight?: boolean;
}
