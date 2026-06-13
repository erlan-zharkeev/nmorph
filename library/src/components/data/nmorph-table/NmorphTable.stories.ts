import type { Meta } from '@storybook/vue3';
import { NmorphTable, NmorphTableColumn } from '@/components';
import { boolean, color, design, number, object, render, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Data',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Table: Story = {
  args: {
    data: [],
    sort: undefined,
    design: 'nmorph',
    rowHover: true,
    virtual: false,
    virtualHeight: '320px',
    virtualOverscan: 5,
    virtualRowHeight: 42,
    virtualDynamicHeight: false,
    borderColor: undefined,
    cellHeight: undefined,
    rowHoverBackground: undefined,
    bordered: undefined,
  },
  argTypes: {
    data: object,
    sort: object,
    design: design,
    rowHover: boolean,
    virtual: boolean,
    virtualHeight: object,
    virtualOverscan: number,
    virtualRowHeight: number,
    virtualDynamicHeight: boolean,
    borderColor: color,
    cellHeight: object,
    rowHoverBackground: color,
    bordered: boolean,
  },
  render: render(
    { NmorphTable, NmorphTableColumn },
    `<NmorphTable v-bind="args" style="min-width: 520px;">
      <NmorphTableColumn prop="name" label="Name" width="180" alignment="left" />
      <NmorphTableColumn prop="group" label="Group" width="160" />
      <NmorphTableColumn prop="status" label="Status" width="160" />
    </NmorphTable>`
  ),
};
