import type { Meta } from '@storybook/vue3';
import { NmorphButton, NmorphTooltip } from '@/components';
import { boolean, number, object, render, select, text, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Feedback',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Tooltip: Story = {
  args: {
    text: '',
    position: 'top',
    forceShow: false,
    forceCoordinate: null,
    disabled: false,
    trigger: 'hover',
    touch: 'click',
    openDelay: 0,
    closeDelay: 0,
    zIndex: undefined,
    teleportTo: 'body',
    disabledTeleport: true,
    width: undefined,
    maxWidth: undefined,
    height: undefined,
  },
  argTypes: {
    text: text,
    position: select(['left', 'right', 'top', 'bottom']),
    forceShow: boolean,
    forceCoordinate: object,
    disabled: boolean,
    trigger: select(['hover', 'click', 'manual']),
    touch: select(['disable', 'click', 'longpress']),
    openDelay: number,
    closeDelay: number,
    zIndex: number,
    teleportTo: text,
    disabledTeleport: boolean,
    width: object,
    maxWidth: object,
    height: object,
  },
  render: render(
    { NmorphTooltip, NmorphButton },
    '<NmorphTooltip v-bind="args"><NmorphButton text="Hover" /></NmorphTooltip>'
  ),
};
