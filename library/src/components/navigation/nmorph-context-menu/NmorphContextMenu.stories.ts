import type { Meta } from '@storybook/vue3';
import { NmorphButton, NmorphContextMenu } from '@/components';
import { boolean, number, object, placement, render, select, text, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Navigation',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const ContextMenu: Story = {
  args: {
    modelValue: null,
    options: [],
    trigger: 'contextmenu',
    placement: 'bottom-start',
    width: 'max-content',
    minWidth: undefined,
    maxWidth: undefined,
    xOffset: 0,
    yOffset: 0,
    fillWidth: false,
    zIndex: undefined,
    closeOnEscape: true,
    trapFocus: false,
    disabled: false,
    closeOnScroll: true,
    role: 'menu',
    ariaLabel: '',
    hideShadow: false,
    mobileMode: 'dropdown',
  },
  argTypes: {
    modelValue: object,
    options: object,
    trigger: select(['contextmenu', 'click', 'both', 'longpress', 'manual']),
    placement,
    width: object,
    minWidth: object,
    maxWidth: object,
    xOffset: number,
    yOffset: number,
    fillWidth: boolean,
    zIndex: number,
    closeOnEscape: boolean,
    trapFocus: boolean,
    disabled: boolean,
    closeOnScroll: boolean,
    role: text,
    ariaLabel: text,
    hideShadow: boolean,
    mobileMode: select(['dropdown', 'bottom-sheet']),
  },
  render: render(
    { NmorphContextMenu, NmorphButton },
    '<NmorphContextMenu v-bind="args" v-model="modelValue"><NmorphButton text="Open menu" /></NmorphContextMenu>'
  ),
};
