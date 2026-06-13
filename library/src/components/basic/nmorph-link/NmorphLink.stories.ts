import type { Meta } from '@storybook/vue3';
import { NmorphIconSearch, NmorphLink } from '@/components';
import { boolean, color, render, select, text, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Basic',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Link: Story = {
  args: {
    type: 'accent',
    href: '',
    underline: false,
    text: '',
    target: 'self',
    rel: undefined,
    referrerpolicy: undefined,
    referrerPolicy: undefined,
    download: undefined,
    ariaLabel: undefined,
    title: undefined,
    disabled: false,
    color: undefined,
    iconName: undefined,
  },
  argTypes: {
    type: select(['accent', 'success', 'error', 'warning']),
    href: text,
    underline: boolean,
    text: text,
    target: select(['blank', 'self', 'parent', 'top']),
    rel: text,
    referrerpolicy: text,
    referrerPolicy: text,
    download: text,
    ariaLabel: text,
    title: text,
    disabled: boolean,
    color: color,
    iconName: text,
  },
  render: render(
    { NmorphLink, NmorphIconSearch },
    '<NmorphLink v-bind="args"><template #icon><NmorphIconSearch /></template></NmorphLink>'
  ),
};
