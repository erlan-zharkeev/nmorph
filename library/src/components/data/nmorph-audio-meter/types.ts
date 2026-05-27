export type NmorphAudioMeterVariant = 'bars' | 'line' | 'ring';

export interface INmorphAudioMeterProps {
  value?: number;
  volumeDb?: number;
  variant?: NmorphAudioMeterVariant;
  bars?: number;
  warnThreshold?: number;
  errorThreshold?: number;
  label?: string;
}
