import type { NmorphComponentHeight } from '@/types';

export interface INmorphFormItemProps {
  id: string;
  name?: string;
  autocomplete?: string;
  height?: keyof typeof NmorphComponentHeight;
  label?: string;
  showValidationIcon?: boolean;
  staticErrorBoxSpace?: boolean;
}
