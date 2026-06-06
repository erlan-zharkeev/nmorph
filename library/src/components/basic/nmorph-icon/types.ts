export const NmorphIconSize = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

export type NmorphIconSize = keyof typeof NmorphIconSize;

export interface INmorphIconProps {
  size?: NmorphIconSize;
  width?: string;
  height?: string;
  color?: string;
}
