import type { Meta } from '@storybook/vue3';
import { NmorphSelect } from '@/components';
import { boolean, commonInputArgTypes, number, object, render, select, text, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Form',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Select: Story = {
  args: {
    id: undefined,
    name: undefined,
    autocomplete: undefined,
    thickness: 'basic',
    disabled: false,
    tabindex: 0,
    noElementPlaceholder: '',
    valueRequired: false,
    options: [],
    optionsMap: [],
    modelValue: '',
    multiple: undefined,
    nullable: false,
    loading: false,
    open: false,
    fill: false,
    optionsWidth: 'truncate',
    zIndex: undefined,
    virtual: false,
    virtualItemHeight: 0,
    virtualMaxHeight: 240,
    virtualOverscan: 5,
    virtualDynamicHeight: false,
    width: undefined,
  },
  argTypes: {
    ...commonInputArgTypes,
    noElementPlaceholder: text,
    valueRequired: boolean,
    options: object,
    optionsMap: object,
    modelValue: object,
    multiple: boolean,
    nullable: boolean,
    loading: boolean,
    open: boolean,
    fill: boolean,
    optionsWidth: select(['truncate', 'auto']),
    zIndex: number,
    virtual: boolean,
    virtualItemHeight: number,
    virtualMaxHeight: number,
    virtualOverscan: number,
    virtualDynamicHeight: boolean,
    width: object,
  },
  render: render({ NmorphSelect }, '<NmorphSelect v-bind="args" v-model="modelValue" />'),
};
