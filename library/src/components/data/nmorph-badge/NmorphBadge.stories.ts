import type { Meta } from '@storybook/vue3';
import { NmorphBadge, NmorphButton } from '@/components';
import { boolean, color, number, object, render, select, text, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Data',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Badge: Story = {
  args: {
    value: undefined,
    max: 99,
    type: 'default',
    ribbonCorner: 'top-right',
    ribbonTilt: true,
    hidden: false,
    hideOnFalsyValue: false,
    color: 'var(--nmorph-accent-color)',
    size: 'base',
    dotSize: undefined,
    ribbonSize: undefined,
    ribbonWidth: undefined,
    ribbonCornerSize: undefined,
    ribbonRadius: undefined,
    offsetX: 0,
    offsetY: 0,
    zIndex: 1,
    disabled: false,
  },
  argTypes: {
    value: text,
    max: number,
    type: select(['default', 'dot', 'tag', 'ribbon']),
    ribbonCorner: select(['top-left', 'top-right', 'bottom-left', 'bottom-right']),
    ribbonTilt: boolean,
    hidden: boolean,
    hideOnFalsyValue: boolean,
    color: color,
    size: select(['tiny', 'extra-small', 'base', 'medium', 'large', 'extra-large']),
    dotSize: object,
    ribbonSize: object,
    ribbonWidth: object,
    ribbonCornerSize: object,
    ribbonRadius: object,
    offsetX: number,
    offsetY: number,
    zIndex: number,
    disabled: boolean,
  },
  render: render(
    { NmorphBadge, NmorphButton },
    '<NmorphBadge v-bind="args"><NmorphButton text="Inbox" /></NmorphBadge>'
  ),
};
