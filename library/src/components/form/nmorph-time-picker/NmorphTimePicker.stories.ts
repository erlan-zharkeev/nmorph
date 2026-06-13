import type { Meta } from '@storybook/vue3';
import { NmorphTimePicker } from '@/components';
import { boolean, commonInputArgTypes, number, object, render, text, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Form',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const TimePicker: Story = {
  args: {
    id: undefined,
    name: undefined,
    autocomplete: undefined,
    thickness: 'basic',
    disabled: false,
    tabindex: 0,
    modelValue: null,
    placeholder: '',
    hourStep: 1,
    minuteStep: 5,
    secondStep: 1,
    showSeconds: false,
    minTime: '',
    maxTime: '',
    clearable: true,
    zIndex: undefined,
    width: undefined,
  },
  argTypes: {
    ...commonInputArgTypes,
    modelValue: text,
    placeholder: text,
    hourStep: number,
    minuteStep: number,
    secondStep: number,
    showSeconds: boolean,
    minTime: text,
    maxTime: text,
    clearable: boolean,
    width: object,
    zIndex: number,
  },
  render: render({ NmorphTimePicker }, '<NmorphTimePicker v-bind="args" v-model="modelValue" />'),
};
