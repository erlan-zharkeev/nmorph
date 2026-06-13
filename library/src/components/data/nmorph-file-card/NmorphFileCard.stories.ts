import type { Meta } from '@storybook/vue3';
import { NmorphFileCard } from '@/components';
import { boolean, number, object, render, select, text, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Data',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const FileCard: Story = {
  args: {
    name: 'report.pdf',
    extension: '',
    mimeType: '',
    size: undefined,
    previewSrc: '',
    downloadHref: '',
    mediaPreview: 'none',
    previewMode: 'internal',
    surface: 'card',
    height: undefined,
    showName: true,
    showMeta: true,
    showSize: true,
    showExtensionBadge: true,
    iconSurface: true,
    compact: false,
    loading: false,
    error: false,
    errorText: '',
    showDefaultActions: true,
    showPlaybackButton: true,
  },
  argTypes: {
    name: text,
    extension: text,
    mimeType: text,
    size: number,
    previewSrc: text,
    downloadHref: text,
    mediaPreview: select(['none', 'audio', 'video', 'image']),
    previewMode: select(['internal', 'emit', 'none']),
    surface: select(['card', 'soft', 'plain']),
    height: object,
    showName: boolean,
    showMeta: boolean,
    showSize: boolean,
    showExtensionBadge: boolean,
    iconSurface: boolean,
    compact: boolean,
    loading: boolean,
    error: boolean,
    errorText: text,
    showDefaultActions: boolean,
    showPlaybackButton: boolean,
  },
  render: render({ NmorphFileCard }, '<NmorphFileCard v-bind="args" />'),
};
