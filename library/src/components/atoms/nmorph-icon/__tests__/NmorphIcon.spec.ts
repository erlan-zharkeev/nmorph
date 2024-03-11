import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import NmorphIcon from './../NmorphIcon.vue';
import { NmorphIconsMap } from '../NmorphIconsMap';

describe('YourIconComponent', () => {
  it('renders with name prop', () => {
    const name = 'eye';
    const wrapper = mount(NmorphIcon, {
      props: { name },
    });
    expect(wrapper.findComponent(NmorphIconsMap[name]).exists()).toBe(true);
  });

  it('renders with path prop', () => {
    const path = 'path/to/your/image.svg';
    const wrapper = mount(NmorphIcon, {
      props: { path },
    });
    expect(wrapper.find('img').attributes('src')).toBe(path);
  });

  it('renders default slot when no name or path provided', () => {
    const wrapper = mount(NmorphIcon, {
      slots: {
        default: 'Default slot content',
      },
    });
    expect(wrapper.text()).toContain('Default slot content');
  });
});
