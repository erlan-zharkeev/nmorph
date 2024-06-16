import { Ref } from 'vue';

export type NmorphCollapseModelType = string | string[];

export interface INmorphCollapseItemProps {
  name: string;
  title?: string;
  disabled?: boolean;
}

export type NmorphCollapseDataInjectionType = Ref<NmorphCollapseModelType>;

export type NmorphCollapseUpdateModelInjectionType = (id: string, value: boolean) => void;
