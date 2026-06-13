import type { Meta } from '@storybook/vue3';
import { NmorphPagination } from '@/components';
import { boolean, number, object, render, thickness, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Data',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Pagination: Story = {
  args: {
    totalElementsQuantity: 0,
    modelValue: 1,
    elementsQuantityOnPage: 2,
    disabled: false,
    loading: false,
    hideOnSinglePage: true,
    maxVisiblePages: 9,
    fastForwardStep: 5,
    thickness: 'basic',
    fixedContainer: false,
    width: undefined,
    minWidth: undefined,
  },
  argTypes: {
    totalElementsQuantity: number,
    modelValue: number,
    elementsQuantityOnPage: number,
    disabled: boolean,
    loading: boolean,
    hideOnSinglePage: boolean,
    maxVisiblePages: number,
    fastForwardStep: number,
    thickness,
    fixedContainer: boolean,
    width: object,
    minWidth: object,
  },
  render: render({ NmorphPagination }, '<NmorphPagination v-bind="args" v-model="modelValue" />'),
};
