import type { Meta } from '@storybook/vue3';
import { NmorphMediaTile } from '@/components';
import { boolean, object, render, select, text, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Data',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const MediaTile: Story = {
  args: {
    design: 'nmorph',
    aspect: 'video',
    src: '',
    srcObject: null,
    sinkId: undefined,
    fit: 'cover',
    mirrored: false,
    muted: true,
    autoplay: true,
    playsinline: true,
    name: 'Nmorph',
    avatarSrc: '',
    loading: false,
    showFallback: true,
    showStatus: true,
    micMuted: false,
    videoOff: false,
    screenSharing: false,
    speaking: false,
    selected: false,
    error: false,
    errorText: '',
  },
  argTypes: {
    design: select(['nmorph', 'plain']),
    aspect: select(['video', 'fill']),
    src: text,
    srcObject: object,
    sinkId: text,
    fit: select(['cover', 'contain']),
    mirrored: boolean,
    muted: boolean,
    autoplay: boolean,
    playsinline: boolean,
    name: text,
    avatarSrc: text,
    loading: boolean,
    showFallback: boolean,
    showStatus: boolean,
    micMuted: boolean,
    videoOff: boolean,
    screenSharing: boolean,
    speaking: boolean,
    selected: boolean,
    error: boolean,
    errorText: text,
  },
  render: render({ NmorphMediaTile }, '<NmorphMediaTile v-bind="args" style="width: 360px;" />'),
};
