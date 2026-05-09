import { type Component } from 'vue';

export interface INmorphAction {
  icon: Component;
  handler: () => void;
}
