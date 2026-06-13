import type { Meta } from '@storybook/vue3';
import { NmorphDialog } from '@/components';
import { boolean, number, render, text, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Feedback',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Dialog: Story = {
  args: {
    modelValue: false,
    title: '',
    width: '330px',
    maxWidth: undefined,
    maxHeight: undefined,
    openDelay: 0,
    closeDelay: 0,
    showClose: true,
    zIndex: undefined,
    closeOnOverlay: true,
    closeOnEscape: true,
  },
  argTypes: {
    modelValue: boolean,
    title: text,
    width: text,
    maxWidth: text,
    maxHeight: text,
    openDelay: number,
    closeDelay: number,
    showClose: boolean,
    zIndex: number,
    closeOnOverlay: boolean,
    closeOnEscape: boolean,
  },
  parameters: {
    layout: 'fullscreen',
  },
  render: render({ NmorphDialog }, '<NmorphDialog v-bind="args" v-model="modelValue">Dialog content</NmorphDialog>'),
};
