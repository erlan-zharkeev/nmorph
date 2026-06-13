import type { Meta } from '@storybook/vue3';
import { NmorphSelectButton } from '@/components';
import { boolean, commonInputArgTypes, object, render, text, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Form',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const SelectButton: Story = {
  args: {
    id: undefined,
    name: undefined,
    autocomplete: undefined,
    thickness: 'basic',
    disabled: false,
    tabindex: 0,
    modelValue: '',
    options: [],
    fill: false,
    customThickness: undefined,
  },
  argTypes: {
    ...commonInputArgTypes,
    modelValue: text,
    options: object,
    fill: boolean,
    customThickness: object,
  },
  render: render({ NmorphSelectButton }, '<NmorphSelectButton v-bind="args" v-model="modelValue" />'),
};
