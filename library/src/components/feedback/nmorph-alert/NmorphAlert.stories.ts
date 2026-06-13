import type { Meta } from '@storybook/vue3';
import { NmorphAlert } from '@/components';
import { boolean, color, render, select, text, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Feedback',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Alert: Story = {
  args: {
    id: undefined,
    type: 'info',
    closable: false,
    title: '',
    content: '',
    fill: false,
    showIcon: true,
    bordered: true,
    html: '',
    closeIconPosition: 'center',
    backgroundColor: undefined,
  },
  argTypes: {
    id: text,
    type: select(['success', 'error', 'warning', 'info']),
    closable: boolean,
    title: text,
    content: text,
    fill: boolean,
    showIcon: boolean,
    bordered: boolean,
    html: text,
    closeIconPosition: text,
    backgroundColor: color,
  },
  render: render({ NmorphAlert }, '<NmorphAlert v-bind="args" />'),
};
