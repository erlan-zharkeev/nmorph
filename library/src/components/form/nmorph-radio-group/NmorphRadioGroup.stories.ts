import type { Meta } from '@storybook/vue3';
import { NmorphRadioGroup } from '@/components';
import { boolean, direction, object, render, select, text, thickness, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Form',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const RadioGroup: Story = {
  args: {
    modelValue: '',
    design: 'nmorph',
    options: [],
    direction: 'row',
    label: '',
    disabled: false,
    thickness: 'basic',
  },
  argTypes: {
    modelValue: text,
    design: select(['plain', 'nmorph']),
    options: object,
    direction,
    label: text,
    disabled: boolean,
    thickness,
  },
  render: render({ NmorphRadioGroup }, '<NmorphRadioGroup v-bind="args" v-model="modelValue" />'),
};
