import type { Meta } from '@storybook/vue3';
import { NmorphDatePicker } from '@/components';
import {
  commonInputArgTypes,
  noControl,
  number,
  object,
  render,
  select,
  text,
  type Story,
} from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Form',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const DatePicker: Story = {
  args: {
    id: undefined,
    name: undefined,
    autocomplete: undefined,
    thickness: 'basic',
    disabled: false,
    tabindex: 0,
    placeholder: '',
    modelValue: null,
    type: 'date',
    textSeparator: '-',
    initialDate: new Date(),
    zIndex: undefined,
    dateLocale: undefined,
    dateFormatOptions: undefined,
    dateFormat: '',
    dateFormatter: undefined,
    valueSeparator: ', ',
    rangeSeparator: ' - ',
    width: undefined,
    rangeWidth: undefined,
    calendarCellHeight: undefined,
  },
  argTypes: {
    ...commonInputArgTypes,
    placeholder: text,
    modelValue: object,
    type: select(['date', 'dates', 'daterange']),
    textSeparator: text,
    initialDate: object,
    zIndex: number,
    dateLocale: object,
    dateFormatOptions: object,
    dateFormat: text,
    dateFormatter: noControl,
    valueSeparator: text,
    rangeSeparator: text,
    width: object,
    rangeWidth: object,
    calendarCellHeight: object,
  },
  render: render({ NmorphDatePicker }, '<NmorphDatePicker v-bind="args" v-model="modelValue" />'),
};
