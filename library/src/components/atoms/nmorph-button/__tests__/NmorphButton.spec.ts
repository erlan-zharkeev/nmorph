import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import NmorphButton from '../NmorphButton.vue';
import NmorphLoader from './../../nmorph-loader/NmorphLoader.vue';

describe('NmorphButton', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(NmorphButton);
    expect(wrapper.find('.nmorph-button').exists()).toBe(true);
  });

  it('displays text when provided', () => {
    const text = 'Test Button';
    const wrapper = mount(NmorphButton, {
      props: { text },
    });
    expect(wrapper.text()).toContain(text);
  });

  it('is disabled when disabled prop is true', () => {
    const wrapper = mount(NmorphButton, {
      props: { disabled: true },
    });
    expect(wrapper.find('button').attributes('disabled')).toBeDefined();
  });

  it('shows loader when loading prop is true', () => {
    const wrapper = mount(NmorphButton, {
      props: { loading: true },
    });
    expect(wrapper.findComponent(NmorphLoader).exists()).toBe(true);
  });

  it('emits click event when clicked', async () => {
    const wrapper = mount(NmorphButton);
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('click')).toHaveLength(1);
  });
});
