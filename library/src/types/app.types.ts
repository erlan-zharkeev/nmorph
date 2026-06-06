import type { NmorphFormValidationDataType } from '@/components';
import type { useNmorphBrowser } from '@/outside-hooks/use-nmorph-browser';
import type { useNmorphTheme } from '@/outside-hooks/use-nmorph-theme';
import type { useNmorphZIndex } from '@/outside-hooks/use-nmorph-z-index';
import type { INmorphThemeOptions } from './theme.types';
import type { INmorphApplyTranslation } from './translation.types';

export interface INmorphInstance {
  theme: ReturnType<typeof useNmorphTheme>;
  browser: ReturnType<typeof useNmorphBrowser>;
  zIndex: ReturnType<typeof useNmorphZIndex>;
}

export interface INmorphFormDataExpose {
  formData: NmorphFormValidationDataType;
}

export interface INmorphOptions {
  theme?: INmorphThemeOptions;
  i18n?: INmorphApplyTranslation;
  zIndex?: {
    base?: number;
  };
}
