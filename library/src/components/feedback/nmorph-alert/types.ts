export enum NmorphAlertType {
  success = 'success',
  error = 'error',
  warning = 'warning',
  info = 'info',
}

export interface INmorphAlertProps {
  id?: number;
  type?: keyof typeof NmorphAlertType;
  closable?: boolean;
  title?: string;
  content?: string;
  fill?: boolean;
  showIcon?: boolean;
  bordered?: boolean;
  html?: string;
}
