import type {
  NmorphTextAlignType,
  NmorphTypographyColorType,
  NmorphTypographyVariantType,
  NmorphTypographyWeightType,
} from '@/types';

export type NmorphTextTag =
  | 'span'
  | 'p'
  | 'div'
  | 'label'
  | 'strong'
  | 'em'
  | 'small'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6';

export interface INmorphTextProps {
  as?: NmorphTextTag;
  variant?: NmorphTypographyVariantType;
  weight?: NmorphTypographyWeightType;
  color?: NmorphTypographyColorType | string;
  align?: NmorphTextAlignType;
  truncate?: boolean;
  nowrap?: boolean;
  lineClamp?: number;
}
