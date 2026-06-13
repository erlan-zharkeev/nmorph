import type { Meta } from '@storybook/vue3';
import { NmorphButton, NmorphDrawer } from '@/components';
import { boolean, number, object, render, select, text, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Feedback',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Drawer: Story = {
  args: {
    modelValue: false,
    title: '',
    placement: 'right',
    size: '360px',
    showClose: true,
    closeOnOverlay: true,
    closeOnEscape: true,
    zIndex: undefined,
    teleportTo: 'body',
    disabledTeleport: false,
    contentClass: '',
  },
  argTypes: {
    modelValue: boolean,
    title: text,
    placement: select(['left', 'right', 'top', 'bottom']),
    size: object,
    showClose: boolean,
    closeOnOverlay: boolean,
    closeOnEscape: boolean,
    zIndex: number,
    teleportTo: text,
    disabledTeleport: boolean,
    contentClass: text,
  },
  parameters: {
    layout: 'fullscreen',
  },
  render: render(
    { NmorphDrawer, NmorphButton },
    `<NmorphDrawer v-bind="args" v-model="modelValue">
      <div style="display: grid; gap: 12px;">
        <p>Drawer content</p>
        <NmorphButton text="Close" @click="modelValue = false" />
      </div>
    </NmorphDrawer>`
  ),
};
