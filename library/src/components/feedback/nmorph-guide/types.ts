import type { ComputedRef, InjectionKey } from 'vue';
import type { NmorphPlacementType } from '@/types';

export type NmorphGuideStepName = string | number;

export interface INmorphGuideStepItem {
  name: NmorphGuideStepName;
  title?: string;
  text?: string;
  imageSrc?: string;
  imageAlt?: string;
  position?: NmorphPlacementType;
  order?: number;
  disabled?: boolean;
}

export interface INmorphGuideResolvedStep extends INmorphGuideStepItem {
  registrationOrder: number;
}

export interface INmorphGuideProps {
  modelValue?: boolean;
  activeStep?: NmorphGuideStepName;
  steps?: INmorphGuideStepItem[];
  loop?: boolean;
  closeOnFinish?: boolean;
  showClose?: boolean;
  showProgress?: boolean;
  backText?: string;
  nextText?: string;
  finishText?: string;
  closeText?: string;
  zIndex?: number;
  teleportTo?: string | HTMLElement;
  disabledTeleport?: boolean;
  width?: number | string;
  maxWidth?: number | string;
}

export interface INmorphGuideEmit {
  (event: 'update:model-value', value: boolean): void;
  (event: 'update:active-step', value: NmorphGuideStepName): void;
  (event: 'change', step: INmorphGuideResolvedStep, index: number): void;
  (event: 'back', step: INmorphGuideResolvedStep, index: number): void;
  (event: 'next', step: INmorphGuideResolvedStep, index: number): void;
  (event: 'finish', step: INmorphGuideResolvedStep | null, index: number): void;
  (event: 'close', step: INmorphGuideResolvedStep | null, index: number): void;
}

export interface INmorphGuideStepProps {
  name: NmorphGuideStepName;
  title?: string;
  text?: string;
  imageSrc?: string;
  imageAlt?: string;
  position?: NmorphPlacementType;
  order?: number;
  disabled?: boolean;
}

export interface INmorphGuideStepSlotProps {
  step: INmorphGuideResolvedStep;
  index: number;
  total: number;
  isFirst: boolean;
  isLast: boolean;
  back: () => void;
  next: () => void;
  close: () => void;
  finish: () => void;
}

export interface INmorphGuideStepSlots {
  default?: (props: Record<string, never>) => unknown;
  content?: (props: INmorphGuideStepSlotProps) => unknown;
}

export interface INmorphGuideContext {
  active: ComputedRef<boolean>;
  activeStep: ComputedRef<INmorphGuideResolvedStep | null>;
  activeIndex: ComputedRef<number>;
  steps: ComputedRef<INmorphGuideResolvedStep[]>;
  loop: ComputedRef<boolean>;
  showClose: ComputedRef<boolean>;
  showProgress: ComputedRef<boolean>;
  backText: ComputedRef<string>;
  nextText: ComputedRef<string>;
  finishText: ComputedRef<string>;
  closeText: ComputedRef<string>;
  zIndex: ComputedRef<number | undefined>;
  teleportTo: ComputedRef<string | HTMLElement>;
  disabledTeleport: ComputedRef<boolean>;
  width: ComputedRef<number | string | undefined>;
  maxWidth: ComputedRef<number | string | undefined>;
  registerStep: (step: INmorphGuideStepItem) => void;
  unregisterStep: (name: NmorphGuideStepName) => void;
  goToStep: (name: NmorphGuideStepName) => void;
  back: () => void;
  next: () => void;
  finish: () => void;
  close: () => void;
}

export const nmorphGuideInjectionKey: InjectionKey<INmorphGuideContext> = Symbol('nmorph-guide');
