import type { Meta } from '@storybook/vue3';
import { NmorphSelectButton, NmorphSelectButtonItem } from '@/components';
import { boolean, number, render, text, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Form',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const SelectButtonItem: Story = {
  args: {
    value: 'middle',
    disabled: false,
    tabindex: 0,
  },
  argTypes: {
    value: text,
    disabled: boolean,
    tabindex: number,
  },
  render: render(
    { NmorphSelectButton, NmorphSelectButtonItem },
    `<NmorphSelectButton model-value="middle">
      <NmorphSelectButtonItem value="left">Left</NmorphSelectButtonItem>
      <NmorphSelectButtonItem v-bind="args">Story item</NmorphSelectButtonItem>
      <NmorphSelectButtonItem value="right">Right</NmorphSelectButtonItem>
    </NmorphSelectButton>`
  ),
};
