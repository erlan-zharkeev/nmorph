import type { Meta } from '@storybook/vue3';
import { NmorphVideoPreview } from '@/components';
import { boolean, number, object, render, select, text, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Data',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const VideoPreview: Story = {
  args: {
    src: '',
    poster: undefined,
    name: '',
    width: undefined,
    height: undefined,
    previewWidth: undefined,
    previewHeight: undefined,
    durationMs: undefined,
    surface: 'card',
    embedded: false,
    showMeta: true,
    compact: false,
    controls: true,
    muted: false,
    playsinline: true,
    preload: 'metadata',
    fit: 'cover',
    downloadHref: '',
    loading: false,
    error: false,
    errorText: '',
    showPlaybackButton: true,
    showDefaultActions: true,
    showPreviewAction: true,
    showFullscreenAction: true,
    previewMode: 'internal',
  },
  argTypes: {
    src: text,
    poster: text,
    name: text,
    width: object,
    height: object,
    previewWidth: object,
    previewHeight: object,
    durationMs: number,
    surface: select(['card', 'soft', 'plain']),
    embedded: boolean,
    showMeta: boolean,
    compact: boolean,
    controls: boolean,
    muted: boolean,
    playsinline: boolean,
    preload: select(['none', 'metadata', 'auto']),
    fit: select(['cover', 'contain']),
    downloadHref: text,
    loading: boolean,
    error: boolean,
    errorText: text,
    showPlaybackButton: boolean,
    showDefaultActions: boolean,
    showPreviewAction: boolean,
    showFullscreenAction: boolean,
    previewMode: select(['internal', 'emit']),
  },
  render: render({ NmorphVideoPreview }, '<NmorphVideoPreview v-bind="args" />'),
};
