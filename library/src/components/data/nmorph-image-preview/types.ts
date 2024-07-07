import { NmorphIconList } from '@/types';

export interface INmorphAction {
  icon: keyof typeof NmorphIconList;
  handler: () => void;
}
