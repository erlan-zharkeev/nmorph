import type { Meta } from '@storybook/vue3';
import { NmorphCollapse, NmorphCollapseItem } from '@/components';
import { boolean, number, object, render, thickness, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Data',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Collapse: Story = {
  args: {
    modelValue: undefined,
    accordion: false,
    itemThickness: 'basic',
    firstDisabled: false,
    itemBlock: false,
    itemTransitionSpeed: undefined,
  },
  argTypes: {
    modelValue: object,
    accordion: boolean,
    itemThickness: thickness,
    firstDisabled: boolean,
    itemBlock: boolean,
    itemTransitionSpeed: number,
  },
  render: render(
    { NmorphCollapse, NmorphCollapseItem },
    `<NmorphCollapse v-model="modelValue" :accordion="args.accordion">
      <NmorphCollapseItem name="first" title="First item" :thickness="args.itemThickness" :disabled="args.firstDisabled" :block="args.itemBlock" :transition-speed="args.itemTransitionSpeed">First content</NmorphCollapseItem>
      <NmorphCollapseItem name="second" title="Second item" :thickness="args.itemThickness" :block="args.itemBlock" :transition-speed="args.itemTransitionSpeed">Second content</NmorphCollapseItem>
    </NmorphCollapse>`
  ),
};
