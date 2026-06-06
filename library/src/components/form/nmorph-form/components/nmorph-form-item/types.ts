import type { NmorphComponentThickness } from '@/types';

export interface INmorphFormItemProps {
  id: string;
  name?: string;
  autocomplete?: string;
  thickness?: keyof typeof NmorphComponentThickness;
  label?: string;
  showValidationIcon?: boolean;
  staticErrorBoxSpace?: boolean;
}
