import type { Meta } from '@storybook/vue3';
import { NmorphAutocomplete } from '@/components';
import {
  boolean,
  commonInputArgTypes,
  noControl,
  number,
  object,
  render,
  text,
  type Story,
} from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Form',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Autocomplete: Story = {
  args: {
    id: undefined,
    name: undefined,
    autocomplete: undefined,
    thickness: 'basic',
    disabled: false,
    tabindex: 0,
    modelValue: '',
    placeholder: '',
    clearable: true,
    list: [],
    actionCallback: undefined,
    zIndex: undefined,
    virtual: false,
    virtualItemHeight: undefined,
    virtualMaxHeight: 240,
    virtualOverscan: 5,
    virtualDynamicHeight: false,
  },
  argTypes: {
    ...commonInputArgTypes,
    modelValue: text,
    placeholder: text,
    clearable: boolean,
    list: object,
    actionCallback: noControl,
    zIndex: number,
    virtual: boolean,
    virtualItemHeight: number,
    virtualMaxHeight: number,
    virtualOverscan: number,
    virtualDynamicHeight: boolean,
  },
  render: render({ NmorphAutocomplete }, '<NmorphAutocomplete v-bind="args" v-model="modelValue" />'),
};
