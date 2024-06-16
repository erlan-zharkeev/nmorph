import { App, Component } from 'vue';
import * as components from './components';

const library = {
  install(Vue: App): void {
    Object.entries(components).forEach(([name, component]) => {
      if (isVueComponent(component)) {
        Vue.component(name, component);
      }
    });
  },
};

function isVueComponent(component: any): component is Component {
  return (
    component &&
    (typeof component === 'object' || typeof component === 'function') &&
    ('render' in component || 'template' in component || 'setup' in component)
  );
}

export * from './types/common.ts';
export * from './components';
export * from './utils';
export * from './hooks';

export default library;
