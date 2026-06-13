import type { Meta } from '@storybook/vue3';
import { NmorphOverlay } from '@/components';
import { boolean, number, render, text, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Other',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Overlay: Story = {
  args: {
    show: false,
    transparent: false,
    zIndex: undefined,
    teleportTo: 'body',
    disabledTeleport: false,
    closeOnEscape: true,
    trapFocus: false,
    restoreFocus: true,
  },
  argTypes: {
    show: boolean,
    transparent: boolean,
    zIndex: number,
    teleportTo: text,
    disabledTeleport: boolean,
    closeOnEscape: boolean,
    trapFocus: boolean,
    restoreFocus: boolean,
  },
  parameters: {
    layout: 'fullscreen',
  },
  render: render(
    { NmorphOverlay },
    '<NmorphOverlay v-bind="args"><div style="padding: 24px; background: var(--nmorph-main-color);">Overlay content</div></NmorphOverlay>'
  ),
};
