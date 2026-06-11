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
  paper?: number;
  fill?: boolean;
  tag?: string;
}
