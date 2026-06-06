import type { INmorphImage, AvatarShapeType, NmorphElementDesignType } from '@/types';
import type { Component } from 'vue';

export interface INmorphAvatarProps extends Omit<INmorphImage, 'src' | 'width' | 'height'> {
  design?: NmorphElementDesignType;
  src?: string | string[];
  size?: number;
  shape?: keyof typeof AvatarShapeType;
  frameBorder?: number;
  imagePadding?: number;
  name?: string;
  fallback?: Component;
  preview?: boolean;
  previewSrc?: string | string[];
  previewInitialIndex?: number;
  previewScaleStep?: number;
  previewMinScaleLevel?: number;
  previewMaxScaleLevel?: number;
}

export interface INmorphAvatarEmit {
  (e: 'error', event: Event): void;
  (e: 'load', event: Event): void;
}
