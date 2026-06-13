import type { Meta } from '@storybook/vue3';
import { NmorphButton, NmorphSpace } from '@/components';
import { boolean, render, select, text, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Basic',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Space: Story = {
  args: {
    tag: 'div',
    direction: 'row',
    size: 'medium',
    align: 'start',
    justify: 'start',
    wrap: false,
    inline: false,
    fill: false,
  },
  argTypes: {
    tag: text,
    direction: select(['row', 'column']),
    size: select(['small', 'medium', 'large']),
    align: select(['start', 'center', 'end', 'stretch', 'baseline']),
    justify: select(['start', 'center', 'end', 'space-between', 'space-around', 'space-evenly']),
    wrap: boolean,
    inline: boolean,
    fill: boolean,
  },
  render: render(
    { NmorphSpace, NmorphButton },
    '<NmorphSpace v-bind="args"><NmorphButton text="One" /><NmorphButton text="Two" /><NmorphButton text="Three" /></NmorphSpace>'
  ),
};
