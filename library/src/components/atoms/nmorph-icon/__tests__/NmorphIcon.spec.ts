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

  it('applies custom size through props', () => {
    const width = 50;
    const height = 50;
    const wrapper = mount(NmorphIcon, {
      props: { width, height },
    });
    expect(wrapper.attributes('style')).toContain(`width: ${width}px`);
    expect(wrapper.attributes('style')).toContain(`height: ${height}px`);
  });

  it('renders default slot when no name or path provided', () => {
    const wrapper = mount(NmorphIcon, {
      slots: {
        default: 'Default slot content',
      },
    });
    expect(wrapper.text()).toContain('Default slot content');
  });

  it('applies default size when no size provided', () => {
    const wrapper = mount(NmorphIcon);
    expect(wrapper.attributes('style')).toContain('width: 14px');
    expect(wrapper.attributes('style')).toContain('height: 14px');
  });
});
