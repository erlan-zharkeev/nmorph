import type { ComputedRef } from 'vue';

export interface INmorphValidationIconProps {
  valid: boolean | ComputedRef<boolean>;
  show?: boolean | ComputedRef<boolean>;
}
