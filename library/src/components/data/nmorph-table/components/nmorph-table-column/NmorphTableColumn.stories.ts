import type { Meta } from '@storybook/vue3';
import { NmorphTable, NmorphTableColumn } from '@/components';
import { render, select, text, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Data',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const TableColumn: Story = {
  args: {
    prop: 'name',
    label: '',
    width: '',
    alignment: 'center',
  },
  argTypes: {
    prop: text,
    label: text,
    width: text,
    alignment: select(['left', 'center', 'right']),
  },
  render: render(
    { NmorphTable, NmorphTableColumn },
    `<NmorphTable :data="tableData" style="min-width: 360px;">
      <NmorphTableColumn v-bind="args" />
      <NmorphTableColumn prop="status" label="Status" width="160" />
    </NmorphTable>`
  ),
};
