import type { Meta } from '@storybook/vue3';
import { NmorphCollapse, NmorphCollapseItem } from '@/components';
import { boolean, number, render, text, thickness, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Data',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const CollapseItem: Story = {
  args: {
    name: 'item',
    thickness: 'basic',
    title: '',
    disabled: false,
    block: false,
    transitionSpeed: undefined,
  },
  argTypes: {
    name: text,
    title: text,
    disabled: boolean,
    thickness,
    block: boolean,
    transitionSpeed: number,
  },
  render: render(
    { NmorphCollapse, NmorphCollapseItem },
    `<NmorphCollapse model-value="item">
      <NmorphCollapseItem v-bind="args">Collapse item content</NmorphCollapseItem>
    </NmorphCollapse>`
  ),
};
