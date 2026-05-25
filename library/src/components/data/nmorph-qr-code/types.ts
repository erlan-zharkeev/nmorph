import type { NmorphQRCodeErrorCorrectionLevel } from './qr-code';

export interface INmorphQRCodeProps {
  value?: string | number;
  size?: number | string;
  margin?: number;
  color?: string;
  background?: string;
  level?: NmorphQRCodeErrorCorrectionLevel;
  minVersion?: number;
  maxVersion?: number;
  title?: string;
}
