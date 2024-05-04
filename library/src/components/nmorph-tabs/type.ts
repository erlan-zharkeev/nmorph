import { Ref } from 'vue';

export type NmorphTableModelType = string | number;

export interface NmorphTabPaneProps {
  label?: string;
  name: string;
  disabled?: boolean;
}

export interface NmorphTabsDataProvider {
  tabsData: Ref<NmorphTabPaneProps[]>;
  tabsIdentifier: string;
}
