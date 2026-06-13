import type { Meta } from '@storybook/vue3';
import { NmorphLayout } from '@/components';
import { boolean, object, render, select, text, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Basic',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Layout: Story = {
  args: {
    tag: 'section',
    gap: 0,
    asideWidth: '240px',
    asidePosition: 'left',
    fullHeight: false,
  },
  argTypes: {
    gap: object,
    asideWidth: object,
    asidePosition: select(['left', 'right']),
    fullHeight: boolean,
    tag: text,
  },
  render: render(
    { NmorphLayout },
    `<NmorphLayout v-bind="args" style="width: 520px;">
      <template #header><div style="padding: 12px; background: rgba(87,139,214,.16);">Header</div></template>
      <template #aside><div style="min-height: 110px; padding: 12px; background: rgba(87,139,214,.12);">Aside</div></template>
      <div style="min-height: 110px; padding: 12px; background: rgba(87,139,214,.08);">Main</div>
      <template #footer><div style="padding: 12px; background: rgba(87,139,214,.16);">Footer</div></template>
    </NmorphLayout>`
  ),
};
