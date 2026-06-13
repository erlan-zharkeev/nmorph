import type { Meta } from '@storybook/vue3';
import { NmorphProgress } from '@/components';
import { boolean, color, number, object, render, select, text, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Data',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Progress: Story = {
  args: {
    type: 'linear',
    color: 'var(--nmorph-accent-color)',
    percentage: 0,
    valueInside: false,
    valueRightSide: true,
    indeterminate: false,
    circleSize: 120,
    height: undefined,
    widthTransition: undefined,
    indeterminateAnimation: undefined,
  },
  argTypes: {
    type: select(['linear', 'circle']),
    color: color,
    percentage: number,
    valueInside: boolean,
    valueRightSide: boolean,
    indeterminate: boolean,
    circleSize: number,
    height: object,
    widthTransition: text,
    indeterminateAnimation: text,
  },
  render: render({ NmorphProgress }, '<div style="width: 320px;"><NmorphProgress v-bind="args" /></div>'),
};
