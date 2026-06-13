import type { Meta } from '@storybook/vue3';
import {
  boolean,
  design,
  noControl,
  number,
  object,
  placement,
  renderWithAnchor,
  text,
  type Story,
} from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Navigation',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Dropdown: Story = {
  args: {
    open: false,
    placement: 'bottom',
    width: 160,
    minWidth: undefined,
    maxWidth: undefined,
    xOffset: 0,
    yOffset: 0,
    fillWidth: true,
    zIndex: undefined,
    closeOnEscape: true,
    trapFocus: false,
    restoreFocus: true,
    role: 'listbox',
    ariaLabel: '',
    contentClass: '',
    hideShadow: false,
    design: 'nmorph',
  },
  argTypes: {
    open: boolean,
    relativeElement: noControl,
    width: object,
    minWidth: object,
    maxWidth: object,
    placement,
    xOffset: number,
    yOffset: number,
    fillWidth: boolean,
    zIndex: number,
    closeOnEscape: boolean,
    trapFocus: boolean,
    restoreFocus: boolean,
    role: text,
    ariaLabel: text,
    contentClass: text,
    hideShadow: boolean,
    design,
  },
  render: renderWithAnchor(
    `<div style="height: 180px; width: 320px;">
      <NmorphButton ref="anchor" text="Anchor" />
      <NmorphDropdown v-if="anchor" v-bind="args" :relative-element="anchor.$el || anchor">
        <div style="padding: 12px;">Dropdown content</div>
      </NmorphDropdown>
    </div>`
  ),
};
