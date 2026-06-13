import type { Meta } from '@storybook/vue3';
import { NmorphNotificationProvider } from '@/components';
import { boolean, number, object, render, select, text, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Providers',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const NotificationProvider: Story = {
  args: {
    notifications: [],
    placement: 'top-right',
    zIndex: undefined,
    quantity: 100,
    teleportTo: 'body',
    disabledTeleport: false,
  },
  argTypes: {
    notifications: object,
    placement: select(['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right']),
    zIndex: number,
    quantity: number,
    teleportTo: text,
    disabledTeleport: boolean,
  },
  render: render({ NmorphNotificationProvider }, '<NmorphNotificationProvider v-bind="args" />'),
};
