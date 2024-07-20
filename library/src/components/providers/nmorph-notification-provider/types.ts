import { INmorphAlertProps } from '@/main';

export interface INmorphNotification extends INmorphAlertProps {
  id?: number;
  duration?: number;
  width?: string;
}

export enum NmorphNotificationPlacement {
  'top-left' = 'top-left',
  'top-center' = 'top-center',
  'top-right' = 'top-right',
  'bottom-left' = 'bottom-left',
  'bottom-center' = 'bottom-center',
  'bottom-right' = 'bottom-right',
}
