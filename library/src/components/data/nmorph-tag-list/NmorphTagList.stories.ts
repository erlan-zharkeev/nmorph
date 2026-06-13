import type { Meta } from '@storybook/vue3';
import { NmorphTagList } from '@/components';
import { color, design, object, render, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Data',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const TagList: Story = {
  args: {
    modelValue: [],
    design: 'nmorph',
    color: undefined,
  },
  argTypes: {
    modelValue: object,
    design: design,
    color: color,
  },
  render: render({ NmorphTagList }, '<NmorphTagList v-bind="args" v-model="modelValue" />'),
};
