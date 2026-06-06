export const NmorphAlertType = {
  success: 'success',
  error: 'error',
  warning: 'warning',
  info: 'info',
} as const;

export type NmorphAlertType = keyof typeof NmorphAlertType;

export interface INmorphAlertProps {
  id?: string;
  type?: NmorphAlertType;
  closable?: boolean;
  title?: string;
  content?: string;
  fill?: boolean;
  showIcon?: boolean;
  bordered?: boolean;
  html?: string;
  closeIconPosition?: string;
  backgroundColor?: string;
}

export interface INmorphAlertComponentProps extends INmorphAlertProps {}

export interface INmorphAlertEmit {
  (e: 'close'): void;
}
