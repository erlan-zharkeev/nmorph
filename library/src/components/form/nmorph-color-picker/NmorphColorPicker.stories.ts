import type { Meta } from '@storybook/vue3';
import { NmorphColorPicker } from '@/components';
import { boolean, color, commonInputArgTypes, render, select, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Form',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const ColorPicker: Story = {
  args: {
    id: undefined,
    name: undefined,
    autocomplete: undefined,
    thickness: 'basic',
    disabled: false,
    tabindex: 0,
    modelValue: '',
    showValue: false,
    displayFormat: 'hex',
  },
  argTypes: {
    ...commonInputArgTypes,
    modelValue: color,
    showValue: boolean,
    displayFormat: select(['hex', 'rgb', 'hsl']),
  },
  render: render({ NmorphColorPicker }, '<NmorphColorPicker v-bind="args" v-model="modelValue" />'),
};
