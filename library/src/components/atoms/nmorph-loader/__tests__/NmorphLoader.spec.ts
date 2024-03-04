import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import NmorphLoader from './../NmorphLoader.vue'; // Путь к вашему компоненту

describe('NmorphLoader', () => {
  it('renders correctly', () => {
    const wrapper = mount(NmorphLoader);
    expect(wrapper.classes()).toContain('nmorph-loader');
  });
});
