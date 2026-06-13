import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { NmorphCheckbox, NmorphCheckboxGroup, NmorphRadio, NmorphRadioGroup } from '@/components';
import { options, checkboxOptions } from '@test/utils/components';

describe('NmorphCheckbox', () => {
  it('keeps design variants on checkbox and radio controls', async () => {
    const checkbox = mount(NmorphCheckbox, {
      props: {
        id: 'plain-checkbox',
        design: 'plain',
        label: 'Plain checkbox',
      },
    });

    expect(checkbox.find('.nmorph-checkbox').classes()).toContain('nmorph-checkbox--plain');
    checkbox.unmount();

    const checkboxGroup = mount(NmorphCheckboxGroup, {
      props: {
        modelValue: ['first'],
        options: checkboxOptions,
        design: 'plain',
      },
    });

    expect(checkboxGroup.find('.nmorph-checkbox-group').classes()).toContain('nmorph-checkbox-group--plain');
    expect(checkboxGroup.find('.nmorph-checkbox').classes()).toContain('nmorph-checkbox--plain');
    checkboxGroup.unmount();

    const radio = mount(NmorphRadio, {
      props: {
        value: 'first',
        checked: true,
        design: 'plain',
        label: 'Plain radio',
      },
    });

    expect(radio.find('.nmorph-radio').classes()).toContain('nmorph-radio--plain');
    radio.unmount();

    const radioGroup = mount(NmorphRadioGroup, {
      props: {
        modelValue: 'first',
        options,
        design: 'plain',
      },
    });

    expect(radioGroup.find('.nmorph-radio-group').classes()).toContain('nmorph-radio-group--plain');
    expect(radioGroup.find('.nmorph-radio').classes()).toContain('nmorph-radio--plain');
    radioGroup.unmount();
  });

  it('uses checkbox design for native and nmorph variants', () => {
    const checkbox = mount(NmorphCheckbox, {
      props: {
        id: 'native',
        design: 'plain',
        label: 'Native',
      },
    });

    expect(checkbox.find('.nmorph-checkbox').classes()).not.toContain('nmorph-checkbox--nmorph');
    expect(checkbox.find('.nmorph-checkbox__input-wrapper').exists()).toBe(true);
    checkbox.unmount();

    const group = mount(NmorphCheckboxGroup, {
      props: {
        modelValue: ['first'],
        options: checkboxOptions,
        design: 'plain',
      },
    });

    expect(group.find('.nmorph-checkbox-group').classes()).toContain('nmorph-checkbox-group--plain');
    expect(group.find('.nmorph-checkbox').classes()).not.toContain('nmorph-checkbox--nmorph');
    group.unmount();
  });
});
