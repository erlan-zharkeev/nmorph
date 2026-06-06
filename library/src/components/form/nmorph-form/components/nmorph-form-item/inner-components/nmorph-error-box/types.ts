import type { NmorphComponentThickness } from '@/types';
import type { Ref } from 'vue';

export interface INmorphErrorBoxProps {
  thickness?: keyof typeof NmorphComponentThickness;
  errors?: string[] | Ref<string[]>;
  staticHeight?: boolean;
}
