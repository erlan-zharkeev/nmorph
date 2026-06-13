import type { Meta } from '@storybook/vue3';
import { NmorphIcon, NmorphIconSearch } from '@/components';
import { color, render, select, text, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Basic',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Icon: Story = {
  args: {
    size: 'small',
    width: undefined,
    height: undefined,
    color: undefined,
  },
  argTypes: {
    size: select(['small', 'medium', 'large']),
    width: text,
    height: text,
    color: color,
  },
  render: render({ NmorphIcon, NmorphIconSearch }, '<NmorphIcon v-bind="args"><NmorphIconSearch /></NmorphIcon>'),
};
