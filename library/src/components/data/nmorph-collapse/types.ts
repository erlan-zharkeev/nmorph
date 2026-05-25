import { Ref } from 'vue';

export type NmorphCollapseModelType = string | string[];

export interface INmorphCollapseItemProps {
  name: string;
  title?: string;
  disabled?: boolean;
}

export type NmorphCollapseDataInjectionType = Ref<NmorphCollapseModelType>;

export type NmorphCollapseUpdateModelInjectionType = (id: string, value: boolean) => void;

export interface INmorphCollapseProps {
  modelValue: NmorphCollapseModelType;
  accordion?: boolean;
}

export interface INmorphCollapseEmit {
  (e: 'update:model-value', value: NmorphCollapseModelType): void;
}
