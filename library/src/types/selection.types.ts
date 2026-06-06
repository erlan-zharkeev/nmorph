import type { Ref } from 'vue';
import type {
  NmorphSelectionControlNmorphThicknessType,
  NmorphSelectionControlPlainThicknessType,
} from './common.types';

export type NmorphSelectionControlDesignProps =
  | {
      design: 'plain';
      thickness?: NmorphSelectionControlPlainThicknessType;
    }
  | {
      design?: 'nmorph';
      thickness?: NmorphSelectionControlNmorphThicknessType;
    };

type INmorphCheckboxOptionBase = {
  id?: string;
  disabled?: boolean;
  modelValue?: boolean;
  label?: string;
};

export type INmorphCheckboxOption = INmorphCheckboxOptionBase & NmorphSelectionControlDesignProps;

export type INmorphCheckboxGroupOption = Omit<INmorphCheckboxOptionBase, 'modelValue'> & {
  id: string;
} & NmorphSelectionControlDesignProps;

export type NmorphCheckboxGroupSelectedValueInjectionType = Ref<string[]>;
export type NmorphCheckboxGroupChangeCheckboxValueHandlerInjectionType = (value: string) => void;

type INmorphRadioOptionBase = {
  disabled?: boolean;
  label?: string;
  value: string;
  tabindex?: number;
};

export type INmorphRadioOption = INmorphRadioOptionBase & NmorphSelectionControlDesignProps;

export type NmorphRadioGroupSelectedValueInjectionType = Ref<string>;

export type NmorphRadioChangeRadioButtonValueHandlerInjectionType = (value: string) => void;
