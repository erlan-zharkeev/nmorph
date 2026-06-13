import type { Meta } from '@storybook/vue3';
import { NmorphDivider } from '@/components';
import { design, render, select, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Other',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Divider: Story = {
  args: {
    direction: 'horizontal',
    design: 'nmorph',
  },
  argTypes: {
    direction: select(['vertical', 'horizontal']),
    design,
  },
  render: render(
    { NmorphDivider },
    '<div style="width: 320px; height: 120px; display: flex;"><NmorphDivider v-bind="args" /></div>'
  ),
};
