export type NmorphProgressType = 'linear' | 'circle';
export type NmorphProgressColorFn = (percentage: number) => string;
export type NmorphProgressColorType = string | { color: string; percentage: number }[] | NmorphProgressColorFn;

export interface INmorphProgressProps {
  type?: NmorphProgressType;
  color?: NmorphProgressColorType;
  percentage: number;
  valueInside?: boolean;
  valueRightSide?: boolean;
  indeterminate?: boolean;
  circleSize?: number;
  height?: number | string;
  widthTransition?: string;
  indeterminateAnimation?: string;
}
