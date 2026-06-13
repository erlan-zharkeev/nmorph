import type { Meta } from '@storybook/vue3';
import { NmorphTextarea } from '@/components';
import { boolean, commonInputArgTypes, number, object, render, select, text, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Form',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Textarea: Story = {
  args: {
    id: undefined,
    name: undefined,
    autocomplete: undefined,
    thickness: 'basic',
    disabled: false,
    tabindex: 0,
    placeholder: '',
    modelValue: '',
    rows: 3,
    minRows: 2,
    maxRows: undefined,
    resize: 'vertical',
    autoSize: false,
    indentation: '12px',
    textareaAttrs: {},
  },
  argTypes: {
    ...commonInputArgTypes,
    modelValue: text,
    placeholder: text,
    rows: number,
    minRows: number,
    maxRows: number,
    resize: select(['none', 'both', 'horizontal', 'vertical']),
    autoSize: boolean,
    indentation: text,
    textareaAttrs: object,
  },
  render: render({ NmorphTextarea }, '<NmorphTextarea v-bind="args" v-model="modelValue" style="width: 360px;" />'),
};
