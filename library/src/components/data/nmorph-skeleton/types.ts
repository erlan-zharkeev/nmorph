export const NmorphSkeletonItemPropsType = {
  image: 'image',
  circle: 'circle',
  rect: 'rect',
} as const;

export type NmorphSkeletonItemPropsType = keyof typeof NmorphSkeletonItemPropsType;

export interface INmorphSkeletonProps {
  animated?: boolean;
  loading?: boolean;
  rows?: number;
  loadingGradient?: string;
}
