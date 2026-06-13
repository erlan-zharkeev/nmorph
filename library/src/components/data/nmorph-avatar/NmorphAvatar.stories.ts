import type { Meta } from '@storybook/vue3';
import { NmorphAvatar } from '@/components';
import { boolean, design, noControl, number, object, render, select, text, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Data',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Avatar: Story = {
  args: {
    design: 'nmorph',
    borderless: false,
    src: '',
    size: 48,
    shape: 'circle',
    frameBorder: 2,
    imagePadding: 4,
    name: '',
    fallback: undefined,
    preview: false,
    previewSrc: undefined,
    previewInitialIndex: 0,
    previewScaleStep: 0.2,
    previewMinScaleLevel: 0.2,
    previewMaxScaleLevel: 4,
  },
  argTypes: {
    design,
    borderless: boolean,
    src: object,
    size: number,
    shape: select(['circle', 'square']),
    frameBorder: number,
    imagePadding: number,
    name: text,
    fallback: noControl,
    preview: boolean,
    previewSrc: object,
    previewInitialIndex: number,
    previewScaleStep: number,
    previewMinScaleLevel: number,
    previewMaxScaleLevel: number,
  },
  render: render({ NmorphAvatar }, '<NmorphAvatar v-bind="args" />'),
};
