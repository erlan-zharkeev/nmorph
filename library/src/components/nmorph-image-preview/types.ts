import { NmorphIconName } from '../nmorph-icon/types';

export interface INmorphAction {
  icon: NmorphIconName;
  handler: () => void;
}
