import type { Meta } from '@storybook/vue3';
import { NmorphCalendar } from '@/components';
import { boolean, design, object, render, select, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Data',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Calendar: Story = {
  args: {
    markToday: true,
    initialDate: new Date(),
    range: undefined,
    type: 'date',
    modelValue: new Date(),
    cellHeight: undefined,
    design: 'nmorph',
  },
  argTypes: {
    markToday: boolean,
    initialDate: object,
    range: object,
    type: select(['date', 'dates', 'daterange']),
    modelValue: object,
    cellHeight: object,
    design,
  },
  render: render({ NmorphCalendar }, '<NmorphCalendar v-bind="args" v-model="modelValue" />'),
};
