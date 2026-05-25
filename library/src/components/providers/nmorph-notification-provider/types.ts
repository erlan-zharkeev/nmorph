import type { INmorphAlertProps } from '../../feedback/nmorph-alert/types';

export interface INmorphNotification extends INmorphAlertProps {
  id?: string;
  duration?: number;
  width?: string;
  placement?: TNmorphNotificationPlacement;
}

export enum NmorphNotificationPlacement {
  'top-left' = 'top-left',
  'top-center' = 'top-center',
  'top-right' = 'top-right',
  'bottom-left' = 'bottom-left',
  'bottom-center' = 'bottom-center',
  'bottom-right' = 'bottom-right',
}

export type TNmorphNotificationPlacement = keyof typeof NmorphNotificationPlacement;

export type TNmorphNotificationItem = INmorphNotification & {
  id: string;
};

export interface INmorphNotificationProviderProps {
  notifications: INmorphNotification[];
  placement?: TNmorphNotificationPlacement;
  zIndex?: number;
  quantity?: number;
}
