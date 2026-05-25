import type { NmorphShadowType, INmorphA11yProps, NmorphElementDesignType } from '@/types';

export interface INmorphEmptyProps extends INmorphA11yProps {
  title?: string;
  description?: string;
  iconSize?: number | string;
  minHeight?: number | string;
  padding?: number | string;
  design?: NmorphElementDesignType;
  shadowType?: keyof typeof NmorphShadowType;
  hideIcon?: boolean;
}
