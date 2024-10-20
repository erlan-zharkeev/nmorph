import { Ref } from 'vue';

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
