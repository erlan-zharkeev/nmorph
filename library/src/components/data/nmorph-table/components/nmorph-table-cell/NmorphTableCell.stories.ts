import type { Meta } from '@storybook/vue3';
import { NmorphTable, NmorphTableCell, NmorphTableColumn } from '@/components';
import { number, render, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Data',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const TableCell: Story = {
  args: {
    row: 0,
  },
  argTypes: {
    row: number,
  },
  render: render(
    { NmorphTable, NmorphTableColumn, NmorphTableCell },
    `<NmorphTable :data="tableData" style="min-width: 360px;">
      <NmorphTableColumn prop="name" label="Name" width="180" />
      <NmorphTableColumn prop="status" label="Status" width="160">
        <template #default="{ scope }">
          <NmorphTableCell v-bind="args">{{ scope.rows[args.row]?.status }}</NmorphTableCell>
        </template>
      </NmorphTableColumn>
    </NmorphTable>`
  ),
};
