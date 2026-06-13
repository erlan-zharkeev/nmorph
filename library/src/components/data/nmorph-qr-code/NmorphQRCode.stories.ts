import type { Meta } from '@storybook/vue3';
import { NmorphQRCode } from '@/components';
import { color, number, object, render, select, text, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Data',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const QRCode: Story = {
  args: {
    value: '',
    size: 160,
    margin: 4,
    color: 'var(--nmorph-text-color)',
    background: 'var(--nmorph-main-color)',
    level: 'medium',
    minVersion: 1,
    maxVersion: 40,
    title: '',
  },
  argTypes: {
    value: text,
    size: object,
    margin: number,
    color,
    background: color,
    level: select(['low', 'medium', 'quartile', 'high']),
    minVersion: number,
    maxVersion: number,
    title: text,
  },
  render: render({ NmorphQRCode }, '<NmorphQRCode v-bind="args" />'),
};
