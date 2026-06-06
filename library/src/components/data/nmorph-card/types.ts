import type { NmorphElementDesignType, NmorphShadowType } from '@/types';

export interface INmorphCardProps {
  design?: NmorphElementDesignType;
  shadowType?: keyof typeof NmorphShadowType;
  combinedShadowBorderWidth?: number;
  cardPadding?: number | string;
  padding?: number | string;
  radius?: number | string;
  contentPadding?: number | string;
  contentClass?: string;
  fill?: boolean;
  tag?: string;
}
