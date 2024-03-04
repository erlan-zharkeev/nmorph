import NmorphTextInput from './../NmorphTextInput.vue';
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

describe('NmorphTextInput', () => {
  it('renders input with provided placeholder', () => {
    const placeholder = 'Enter your name';
    const wrapper = mount(NmorphTextInput, {
      props: { placeholder, id: 'name' },
    });

    expect(wrapper.find('input').attributes('placeholder')).toBe(placeholder);
  });

  it('emits update:modelValue event on input', async () => {
    const wrapper = mount(NmorphTextInput);
    const inputElement = wrapper.find('input');

    await inputElement.setValue('new value');
    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    expect(wrapper.emitted('update:modelValue')?.[0] ?? []).toEqual(['new value']);
  });

  it('binds provided id to label and input', () => {
    const id = 'test-id';
    const wrapper = mount(NmorphTextInput, {
      props: { id },
    });

    expect(wrapper.find('label').attributes('for')).toBe(id);
    expect(wrapper.find('input').attributes('id')).toBe(id);
  });

  it('disables input when disabled prop is true', () => {
    const wrapper = mount(NmorphTextInput, {
      props: { disabled: true, id: 'name' },
    });

    expect(wrapper.find('input').attributes('disabled')).toBeDefined();
  });

  it('applies typePassword prop correctly', () => {
    const wrapper = mount(NmorphTextInput, {
      props: { typePassword: true, id: 'name' },
    });

    expect(wrapper.find('input').attributes('type')).toBe('password');
  });

  it('shows label text when provided', () => {
    const label = 'Username';
    const wrapper = mount(NmorphTextInput, {
      props: { label, id: 'name' },
    });

    expect(wrapper.find('label').text()).toContain(label);
  });
});
