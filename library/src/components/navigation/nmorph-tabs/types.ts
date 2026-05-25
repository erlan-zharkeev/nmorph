import type { Ref } from 'vue';

export type NmorphTableModelType = string | number;

export interface INmorphTabPaneProps {
  label?: string;
  name: string;
  disabled?: boolean;
  content?: string;
}

export interface INmorphTabsDataProvider {
  tabsData: Ref<INmorphTabPaneProps[]>;
  tabsIdentifier: string;
}

export interface INmorphTabsProps {
  modelValue?: NmorphTableModelType;
  stretch?: boolean;
  panes?: Array<INmorphTabPaneProps>;
}

export interface INmorphTabsEmit {
  (e: 'update:model-value', value: NmorphTableModelType): void;
  (e: 'tab-change', value: NmorphTableModelType): void;
}
