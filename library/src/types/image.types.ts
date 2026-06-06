export const AvatarShapeType = {
  circle: 'circle',
  square: 'square',
} as const;

export type AvatarShapeType = keyof typeof AvatarShapeType;

export const NmorphImageFit = {
  fill: 'fill',
  contain: 'contain',
  cover: 'cover',
  none: 'none',
  'scale-down': 'scale-down',
} as const;

export type NmorphImageFit = keyof typeof NmorphImageFit;

export interface INmorphImage {
  src?: string;
  srcSet?: string;
  width?: number | string;
  height?: number | string;
  fit?: NmorphImageFit;
  alt?: string;
}
