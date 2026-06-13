import type { Meta } from '@storybook/vue3';
import { NmorphVirtualList } from '@/components';
import { boolean, number, object, render, text, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Data',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const VirtualList: Story = {
  args: {
    items: [],
    height: '320px',
    maxHeight: 'none',
    itemHeight: 40,
    overscan: 5,
    dynamic: false,
    disabled: false,
    itemKey: undefined,
    itemTag: 'div',
  },
  argTypes: {
    items: object,
    height: object,
    maxHeight: object,
    itemHeight: number,
    overscan: number,
    dynamic: boolean,
    disabled: boolean,
    itemKey: text,
    itemTag: text,
  },
  render: render(
    { NmorphVirtualList },
    `<NmorphVirtualList v-bind="args" style="width: 360px;">
      <template #default="{ item }">
        <div style="box-sizing: border-box; min-height: 44px; padding: 8px 12px; border-bottom: 1px solid rgba(127,127,127,.24);">
          {{ item.title }}
        </div>
      </template>
    </NmorphVirtualList>`
  ),
};
