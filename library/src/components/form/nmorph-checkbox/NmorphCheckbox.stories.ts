import type { Meta } from '@storybook/vue3';
import { NmorphCheckbox } from '@/components';
import { boolean, render, selectionDesign, text, thickness, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Form',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Checkbox: Story = {
  args: {
    id: '',
    disabled: false,
    modelValue: false,
    label: '',
    design: 'nmorph',
    thickness: undefined,
  },
  argTypes: {
    id: text,
    disabled: boolean,
    modelValue: boolean,
    label: text,
    design: selectionDesign,
    thickness,
  },
  render: render({ NmorphCheckbox }, '<NmorphCheckbox v-bind="args" v-model="modelValue" />'),
};
