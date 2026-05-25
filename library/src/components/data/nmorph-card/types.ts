import type { NmorphShadowType } from '@/types';

export interface INmorphCardProps {
  shadowType?: keyof typeof NmorphShadowType;
  combinedShadowBorderWidth?: number;
  cardPadding?: number | string;
  contentClass?: string;
  fill?: boolean;
  tag?: string;
}
