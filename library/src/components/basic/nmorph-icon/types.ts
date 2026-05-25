export enum NmorphIconSize {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

export interface INmorphIconProps {
  size?: keyof typeof NmorphIconSize;
  width?: string;
  height?: string;
  color?: string;
}
