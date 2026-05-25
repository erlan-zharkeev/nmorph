export enum NmorphSkeletonItemPropsType {
  image = 'image',
  circle = 'circle',
  rect = 'rect',
}

export interface INmorphSkeletonProps {
  animated?: boolean;
  loading?: boolean;
  rows?: number;
  loadingGradient?: string;
}
