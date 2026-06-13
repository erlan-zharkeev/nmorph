import type { Meta } from '@storybook/vue3';
import { NmorphSlider } from '@/components';
import { boolean, number, object, render, text, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Form',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Slider: Story = {
  args: {
    id: undefined,
    name: undefined,
    autocomplete: undefined,
    disabled: false,
    tabindex: 0,
    modelValue: 0,
    max: 100,
    min: 0,
    step: 1,
    fill: true,
    showTooltip: true,
    thumbWidth: 50,
    sliderHeight: undefined,
    valueFixedContainerHeight: undefined,
  },
  argTypes: {
    id: text,
    name: text,
    autocomplete: text,
    disabled: boolean,
    tabindex: number,
    modelValue: number,
    max: number,
    min: number,
    step: number,
    fill: boolean,
    showTooltip: boolean,
    thumbWidth: number,
    sliderHeight: object,
    valueFixedContainerHeight: object,
  },
  render: render(
    { NmorphSlider },
    '<div style="width: 360px;"><NmorphSlider v-bind="args" v-model="modelValue" /></div>'
  ),
};
