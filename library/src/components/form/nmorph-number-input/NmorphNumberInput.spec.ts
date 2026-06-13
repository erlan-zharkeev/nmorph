import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { NmorphNumberInput } from '@/components';

describe('NmorphNumberInput', () => {
  it('renders number input right action buttons with increase above decrease', () => {
    const wrapper = mount(NmorphNumberInput, {
      props: {
        modelValue: 10,
        actionBtnPositionRight: true,
      },
    });

    const actionButtons = wrapper.findAll('.nmorph-number-input__action-btns > div');

    expect(actionButtons[0].classes()).toContain('nmorph-number-input__increase');
    expect(actionButtons[1].classes()).toContain('nmorph-number-input__decrease');

    wrapper.unmount();
  });
});
