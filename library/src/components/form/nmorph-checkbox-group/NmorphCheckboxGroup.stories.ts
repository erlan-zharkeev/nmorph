import type { Meta } from '@storybook/vue3';
import { NmorphCheckboxGroup } from '@/components';
import { boolean, direction, object, render, selectionDesign, thickness, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Form',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const CheckboxGroup: Story = {
  args: {
    modelValue: [],
    options: [],
    design: 'nmorph',
    direction: 'row',
    thickness: 'basic',
    disabled: false,
  },
  argTypes: {
    modelValue: object,
    options: object,
    design: selectionDesign,
    direction,
    thickness,
    disabled: boolean,
  },
  render: render({ NmorphCheckboxGroup }, '<NmorphCheckboxGroup v-bind="args" v-model="modelValue" />'),
};
