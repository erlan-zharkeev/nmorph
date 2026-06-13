import type { Meta } from '@storybook/vue3';
import { NmorphNumberInput } from '@/components';
import { boolean, commonInputArgTypes, number, render, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Form',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const NumberInput: Story = {
  args: {
    id: undefined,
    name: undefined,
    autocomplete: undefined,
    thickness: 'basic',
    disabled: false,
    tabindex: 0,
    modelValue: 0,
    max: Infinity,
    min: -Infinity,
    step: 1,
    actionBtnPositionRight: false,
  },
  argTypes: {
    ...commonInputArgTypes,
    modelValue: number,
    max: number,
    min: number,
    step: number,
    actionBtnPositionRight: boolean,
  },
  render: render({ NmorphNumberInput }, '<NmorphNumberInput v-bind="args" v-model="modelValue" />'),
};
