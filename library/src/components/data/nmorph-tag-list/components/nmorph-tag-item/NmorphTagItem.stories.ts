import type { Meta } from '@storybook/vue3';
import { NmorphTagItem } from '@/components';
import { boolean, color, design, render, text, thickness, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Data',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const TagItem: Story = {
  args: {
    value: 'story',
    text: '',
    thickness: 'basic',
    removable: true,
    design: 'nmorph',
    color: 'var(--nmorph-gray-color)',
  },
  argTypes: {
    value: text,
    text: text,
    removable: boolean,
    thickness,
    design,
    color: color,
  },
  render: render({ NmorphTagItem }, '<NmorphTagItem v-bind="args" />'),
};
