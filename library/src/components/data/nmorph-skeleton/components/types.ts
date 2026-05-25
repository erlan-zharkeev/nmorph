import type { NmorphSkeletonItemPropsType } from '@/components';
import type { NmorphElementDesignType } from '@/types';

export interface INmorphSkeletonItemProps {
  variant: keyof typeof NmorphSkeletonItemPropsType;
  width: string;
  height: string;
  design?: NmorphElementDesignType;
}
