import { DefineComponent } from 'vue';

export interface INmorphAction {
  icon: DefineComponent<{}, {}, unknown>;
  handler: () => void;
}
