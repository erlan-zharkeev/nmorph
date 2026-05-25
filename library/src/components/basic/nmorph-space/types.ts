export type NmorphSpaceDirectionType = 'row' | 'column';

export type NmorphSpaceAlignType = 'start' | 'center' | 'end' | 'stretch' | 'baseline';

export type NmorphSpaceJustifyType = 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';

export type NmorphSpaceSizeType = 'small' | 'medium' | 'large' | number | string;

export interface INmorphSpaceProps {
  tag?: string;
  direction?: NmorphSpaceDirectionType;
  size?: NmorphSpaceSizeType;
  align?: NmorphSpaceAlignType;
  justify?: NmorphSpaceJustifyType;
  wrap?: boolean;
  inline?: boolean;
  fill?: boolean;
}
