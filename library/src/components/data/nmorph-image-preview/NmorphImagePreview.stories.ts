import type { Meta } from '@storybook/vue3';
import { NmorphImagePreview } from '@/components';
import { boolean, number, object, render, select, text, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Data',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const ImagePreview: Story = {
  args: {
    alt: '',
    modelValue: false,
    initialIndex: 0,
    src: '',
    scaleStep: 0.2,
    minScaleLevel: 0.2,
    maxScaleLevel: 4,
    zIndex: undefined,
    showTrigger: true,
    showNavigationButtons: true,
    showActionBar: true,
    width: undefined,
    height: undefined,
    previewWidth: undefined,
    previewHeight: undefined,
    radius: undefined,
    fit: 'cover',
    navigationButtonMargin: undefined,
    triggerView: 'single',
    triggerLimit: undefined,
    triggerGap: 8,
  },
  argTypes: {
    alt: text,
    modelValue: boolean,
    initialIndex: number,
    src: object,
    scaleStep: number,
    minScaleLevel: number,
    maxScaleLevel: number,
    zIndex: number,
    showTrigger: boolean,
    showNavigationButtons: boolean,
    showActionBar: boolean,
    width: number,
    height: number,
    previewWidth: object,
    previewHeight: object,
    radius: object,
    fit: select(['cover', 'contain']),
    navigationButtonMargin: object,
    triggerView: select(['single', 'gallery']),
    triggerLimit: number,
    triggerGap: number,
  },
  render: render({ NmorphImagePreview }, '<NmorphImagePreview v-bind="args" v-model="modelValue" />'),
};
