import { App } from 'vue';
import * as components from './components';

const library = {
  install(Vue: App): void {
    Object.entries(components).forEach(([name, component]) => {
      Vue.component(name, component);
    });
  },
};

export * from './components';
export * from './utils';

export default library;
