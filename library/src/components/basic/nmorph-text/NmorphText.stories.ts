import type { Meta } from '@storybook/vue3';
import { NmorphText } from '@/components';
import { boolean, number, render, select, text, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Basic',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Text: Story = {
  args: {
    as: 'span',
    text: 'Nmorph typography',
    variant: 'body',
    weight: undefined,
    color: 'text',
    align: 'inherit',
    truncate: false,
    nowrap: false,
    lineClamp: undefined,
  },
  argTypes: {
    as: select(['span', 'p', 'div', 'label', 'strong', 'em', 'small', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
    text: text,
    variant: select([
      'display-large',
      'display-medium',
      'title-large',
      'title',
      'title-small',
      'body-large',
      'body',
      'body-small',
      'caption',
      'label',
      'control-large',
      'control',
      'control-small',
      'control-tiny',
    ]),
    weight: select([undefined, 'regular', 'medium', 'semibold', 'bold', 'extrabold']),
    color: text,
    align: select(['inherit', 'left', 'center', 'right', 'justify']),
    truncate: boolean,
    nowrap: boolean,
    lineClamp: number,
  },
  render: render({ NmorphText }, '<NmorphText v-bind="args" />'),
};
