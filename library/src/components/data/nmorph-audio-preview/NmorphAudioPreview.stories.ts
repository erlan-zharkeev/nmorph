import type { Meta } from '@storybook/vue3';
import { NmorphAudioPreview } from '@/components';
import { boolean, number, object, render, select, text, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Data',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const AudioPreview: Story = {
  args: {
    src: '',
    name: '',
    durationMs: undefined,
    width: undefined,
    surface: 'card',
    embedded: false,
    showIcon: true,
    showHeader: true,
    compact: false,
    preload: 'metadata',
    downloadHref: '',
    loading: false,
    error: false,
    errorText: '',
    showPlaybackButton: true,
    showDefaultActions: true,
  },
  argTypes: {
    src: text,
    name: text,
    durationMs: number,
    width: object,
    surface: select(['card', 'soft', 'plain']),
    embedded: boolean,
    showIcon: boolean,
    showHeader: boolean,
    compact: boolean,
    preload: select(['none', 'metadata', 'auto']),
    downloadHref: text,
    loading: boolean,
    error: boolean,
    errorText: text,
    showPlaybackButton: boolean,
    showDefaultActions: boolean,
  },
  render: render({ NmorphAudioPreview }, '<NmorphAudioPreview v-bind="args" />'),
};
