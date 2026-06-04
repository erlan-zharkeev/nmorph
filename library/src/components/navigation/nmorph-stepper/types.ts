export type NmorphStepperDirection = 'previous' | 'next';

export interface INmorphStepperChangePayload {
  index: number;
  previousIndex: number;
  direction: NmorphStepperDirection;
}

export interface INmorphStepperProps {
  modelValue?: number;
  count?: number;
  disabled?: boolean;
  loop?: boolean;
  wheel?: boolean;
  swipe?: boolean;
  ariaLabel?: string;
}

export interface INmorphStepperEmit {
  (event: 'update:model-value', value: number): void;
  (event: 'change', value: INmorphStepperChangePayload): void;
}

export interface INmorphStepperIndicatorSlotProps {
  index: number;
  count: number;
  goTo: (index: number) => void;
  next: () => void;
  previous: () => void;
}

export interface INmorphStepperSlots {
  default?: (props: Record<string, never>) => unknown;
  indicator?: (props: INmorphStepperIndicatorSlotProps) => unknown;
}
