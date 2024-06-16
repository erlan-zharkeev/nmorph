import { NmorphIconName } from '@/components';

export interface INmorphAction {
  icon: NmorphIconName;
  handler: () => void;
}
