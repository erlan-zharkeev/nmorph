export enum AvatarShapeType {
  circle = 'circle',
  square = 'square',
}

export enum NmorphImageFit {
  fill = 'fill',
  contain = 'contain',
  cover = 'cover',
  none = 'none',
  'scale-down' = 'scale-down',
}

export interface INmorphImage {
  src?: string;
  srcSet?: string;
  fit?: keyof typeof NmorphImageFit;
  alt?: string;
}
