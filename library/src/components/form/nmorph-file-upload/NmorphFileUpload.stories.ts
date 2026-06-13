import type { Meta } from '@storybook/vue3';
import { NmorphFileUpload } from '@/components';
import { boolean, number, object, render, select, text, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Form',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const FileUpload: Story = {
  args: {
    id: undefined,
    name: undefined,
    autocomplete: undefined,
    tabindex: 0,
    modelValue: [],
    disabled: false,
    multiple: false,
    allowedTypes: [],
    photoWithPreview: true,
    buttonText: '',
    compact: false,
    layout: 'list',
    fileNameWidth: undefined,
  },
  argTypes: {
    id: text,
    name: text,
    autocomplete: text,
    tabindex: number,
    modelValue: object,
    disabled: boolean,
    multiple: boolean,
    allowedTypes: object,
    photoWithPreview: boolean,
    buttonText: text,
    compact: boolean,
    layout: select(['list', 'grid', 'inline']),
    fileNameWidth: object,
  },
  render: render({ NmorphFileUpload }, '<NmorphFileUpload v-bind="args" v-model="modelValue" />'),
};
