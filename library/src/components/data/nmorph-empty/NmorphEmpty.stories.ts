import type { Meta } from '@storybook/vue3';
import { NmorphButton, NmorphEmpty } from '@/components';
import { boolean, design, object, render, select, text, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Data',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Empty: Story = {
  args: {
    title: 'No data',
    description: '',
    iconSize: 56,
    minHeight: 160,
    padding: 'var(--indentation-05)',
    design: 'nmorph',
    shadowType: 'inset',
    hideIcon: false,
    role: 'status',
    ariaLabel: undefined,
    ariaOrientation: undefined,
  },
  argTypes: {
    title: text,
    description: text,
    iconSize: object,
    minHeight: object,
    padding: text,
    design,
    shadowType: select(['inset', 'outset', 'combined', 'not-defined']),
    hideIcon: boolean,
    role: text,
    ariaLabel: text,
    ariaOrientation: text,
  },
  render: render(
    { NmorphEmpty, NmorphButton },
    '<NmorphEmpty v-bind="args"><template #action><NmorphButton text="Create" thickness="thin" /></template></NmorphEmpty>'
  ),
};
