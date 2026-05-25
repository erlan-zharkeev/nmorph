export type NmorphBadgeSize = 'tiny' | 'extra-small' | 'base' | 'medium' | 'large' | 'extra-large';

export type NmorphBadgeType = 'default' | 'dot' | 'tag' | 'ribbon';

export type NmorphBadgeRibbonCorner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export interface INmorphBadgeProps {
  value?: number | string;
  max?: number;
  type?: NmorphBadgeType;
  ribbonCorner?: NmorphBadgeRibbonCorner;
  ribbonTilt?: boolean;
  /**
   * @deprecated Use `type="dot"` instead.
   */
  isDot?: boolean;
  /**
   * @deprecated Use `type="tag"` instead.
   */
  isTag?: boolean;
  hidden?: boolean;
  hideOnFalsyValue?: boolean;
  color?: string;
  size?: NmorphBadgeSize;
  offsetY?: number;
  offsetX?: number;
  zIndex?: number;
  disabled?: boolean;
}

export type NmorphBadgeValueSlotProps = {
  value: INmorphBadgeProps['value'];
  displayValue: string | number | undefined;
};

export interface INmorphBadgeSlots {
  default?: (props: Record<string, never>) => unknown;
  value?: (props: NmorphBadgeValueSlotProps) => unknown;
}
