import { NmorphComponentHeight, NmorphElementDesignType } from '@/types';

export interface INmorphTagItemProps {
  value: string;
  text: string;
  removable?: boolean;
  height?: keyof typeof NmorphComponentHeight;
  design?: NmorphElementDesignType;
}
