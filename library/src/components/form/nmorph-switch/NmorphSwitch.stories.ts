import type { Meta } from '@storybook/vue3';
import { NmorphSwitch } from '@/components';
import { boolean, number, object, render, text, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Form',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Switch: Story = {
  args: {
    id: undefined,
    name: undefined,
    autocomplete: undefined,
    disabled: false,
    tabindex: 0,
    modelValue: false,
    loading: false,
    activeValue: true,
    inactiveValue: false,
    width: undefined,
    height: undefined,
    offset: undefined,
    thumbHeight: undefined,
  },
  argTypes: {
    id: text,
    name: text,
    autocomplete: text,
    disabled: boolean,
    tabindex: number,
    modelValue: object,
    loading: boolean,
    activeValue: object,
    inactiveValue: object,
    width: object,
    height: object,
    offset: object,
    thumbHeight: object,
  },
  render: render({ NmorphSwitch }, '<NmorphSwitch v-bind="args" v-model="modelValue" />'),
};
