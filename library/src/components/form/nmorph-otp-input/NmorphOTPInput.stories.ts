import type { Meta } from '@storybook/vue3';
import { NmorphOTPInput } from '@/components';
import { boolean, commonInputArgTypes, number, render, select, text, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Form',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const OTPInput: Story = {
  args: {
    id: undefined,
    name: undefined,
    autocomplete: undefined,
    thickness: 'basic',
    disabled: false,
    tabindex: 0,
    modelValue: '',
    length: 6,
    mode: 'numeric',
    autofocus: false,
    autocapitalize: 'none',
  },
  argTypes: {
    ...commonInputArgTypes,
    modelValue: text,
    length: number,
    mode: select(['numeric', 'text', 'alphanumeric']),
    autofocus: boolean,
    autocapitalize: text,
  },
  render: render({ NmorphOTPInput }, '<NmorphOTPInput v-bind="args" v-model="modelValue" />'),
};
