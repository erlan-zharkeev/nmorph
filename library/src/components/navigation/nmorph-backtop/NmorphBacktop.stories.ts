import type { Meta } from '@storybook/vue3';
import { NmorphBacktop } from '@/components';
import { boolean, design, number, render, text, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Navigation',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Backtop: Story = {
  args: {
    right: 40,
    bottom: 40,
    visibilityHeight: 200,
    design: 'nmorph',
    zIndex: 10,
    teleportTo: 'body',
    teleportDisabled: false,
  },
  argTypes: {
    right: number,
    bottom: number,
    visibilityHeight: number,
    design: design,
    zIndex: number,
    teleportTo: text,
    teleportDisabled: boolean,
  },
  render: render(
    { NmorphBacktop },
    '<div style="width: 360px; height: 220px; overflow: auto;"><div style="height: 520px; padding: 16px;">Scroll this area<NmorphBacktop v-bind="args" /></div></div>'
  ),
};
