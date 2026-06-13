import type { Meta } from '@storybook/vue3';
import { NmorphSkeletonItem } from '@/components';
import { design, render, select, text, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Data',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const SkeletonItem: Story = {
  args: {
    variant: 'rect',
    width: 'auto',
    height: 'auto',
    design: 'nmorph',
  },
  argTypes: {
    variant: select(['rect', 'circle', 'image']),
    width: text,
    height: text,
    design,
  },
  render: render({ NmorphSkeletonItem }, '<NmorphSkeletonItem v-bind="args" />'),
};
