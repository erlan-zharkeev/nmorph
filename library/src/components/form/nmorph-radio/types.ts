import type { NmorphSelectionControlDesignProps } from '@/types';

export type INmorphRadioProps = {
  disabled?: boolean;
  label?: string;
  value?: string;
  tabindex?: number;
  checked?: boolean;
} & NmorphSelectionControlDesignProps;
