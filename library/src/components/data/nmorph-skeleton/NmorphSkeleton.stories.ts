import type { Meta } from '@storybook/vue3';
import { NmorphSkeleton, NmorphSkeletonItem } from '@/components';
import { boolean, design, number, render, select, text, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Data',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Skeleton: Story = {
  args: {
    animated: true,
    loading: true,
    rows: 0,
    loadingGradient: undefined,
    itemVariant: 'rect',
    itemWidth: 'auto',
    itemHeight: 'auto',
    itemDesign: 'nmorph',
  },
  argTypes: {
    animated: boolean,
    loading: boolean,
    rows: number,
    loadingGradient: text,
    itemVariant: select(['rect', 'circle', 'image']),
    itemWidth: text,
    itemHeight: text,
    itemDesign: design,
  },
  render: render(
    { NmorphSkeleton, NmorphSkeletonItem },
    `<NmorphSkeleton :animated="args.animated" :loading="args.loading" :rows="args.rows">
      <template #template><NmorphSkeletonItem :variant="args.itemVariant" :width="args.itemWidth" :height="args.itemHeight" :design="args.itemDesign" /></template>
      <div>Loaded content</div>
    </NmorphSkeleton>`
  ),
};
