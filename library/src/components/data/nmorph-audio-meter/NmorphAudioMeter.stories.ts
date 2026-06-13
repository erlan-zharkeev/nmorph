import type { Meta } from '@storybook/vue3';
import { NmorphAudioMeter } from '@/components';
import { color, number, render, select, text, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Data',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const AudioMeter: Story = {
  args: {
    value: undefined,
    volumeDb: undefined,
    variant: 'bars',
    bars: 12,
    warnThreshold: 0.7,
    errorThreshold: 0.9,
    color: undefined,
    warnColor: undefined,
    errorColor: undefined,
    trackColor: undefined,
    label: 'Audio level',
  },
  argTypes: {
    value: number,
    volumeDb: number,
    variant: select(['bars', 'line', 'ring']),
    bars: number,
    warnThreshold: number,
    errorThreshold: number,
    color,
    warnColor: color,
    errorColor: color,
    trackColor: color,
    label: text,
  },
  render: render({ NmorphAudioMeter }, '<NmorphAudioMeter v-bind="args" />'),
};
