import type { NmorphComponentHeight } from '@/types';
import type { Ref } from 'vue';

export interface INmorphErrorBoxProps {
  height?: keyof typeof NmorphComponentHeight;
  errors?: string[] | Ref<string[]>;
  staticHeight?: boolean;
}
