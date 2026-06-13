import type { Meta } from '@storybook/vue3';
import { NmorphImage } from '@/components';
import { design, number, object, render, select, text, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Data',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Image: Story = {
  args: {
    design: 'nmorph',
    src: undefined,
    srcSet: '',
    fit: 'cover',
    alt: '',
    width: undefined,
    height: undefined,
    loadFailedText: '',
    frameBorder: 2.67,
  },
  argTypes: {
    design,
    src: text,
    srcSet: text,
    fit: select(['fill', 'contain', 'cover', 'none', 'scale-down']),
    alt: text,
    width: object,
    height: object,
    loadFailedText: text,
    frameBorder: number,
  },
  render: render({ NmorphImage }, '<NmorphImage v-bind="args" style="width: 320px; height: 220px;" />'),
};
