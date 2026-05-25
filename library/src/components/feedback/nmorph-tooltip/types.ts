import type { INmorphCoords, NmorphPlacementType } from '@/types';

export interface INmorphTooltipProps {
  text?: string;
  position?: NmorphPlacementType;
  forceShow?: boolean;
  forceCoordinate?: Partial<INmorphCoords<string>> | null;
  zIndex?: number;
  width?: number | string;
  maxWidth?: number | string;
  height?: number | string;
}
