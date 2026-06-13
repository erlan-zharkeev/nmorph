import type { Meta } from '@storybook/vue3';
import { NmorphTextInput } from '@/components';
import { boolean, color, commonInputArgTypes, object, render, text, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Form',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const TextInput: Story = {
  args: {
    id: undefined,
    name: undefined,
    autocomplete: undefined,
    thickness: 'basic',
    disabled: false,
    tabindex: 0,
    placeholder: '',
    typePassword: false,
    modelValue: '',
    clearable: false,
    indentation: '',
    prependIconIndent: undefined,
    prependIconSize: undefined,
    prependIconColor: undefined,
    inputAttrs: {},
  },
  argTypes: {
    ...commonInputArgTypes,
    placeholder: text,
    typePassword: boolean,
    modelValue: text,
    clearable: boolean,
    indentation: text,
    prependIconIndent: object,
    prependIconSize: object,
    prependIconColor: color,
    inputAttrs: object,
  },
  render: render({ NmorphTextInput }, '<NmorphTextInput v-bind="args" v-model="modelValue" />'),
};
