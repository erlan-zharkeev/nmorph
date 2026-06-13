import type { Meta } from '@storybook/vue3';
import { NmorphButton, NmorphGuide, NmorphGuideStep } from '@/components';
import { boolean, number, object, render, text, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Feedback',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Guide: Story = {
  args: {
    modelValue: true,
    activeStep: undefined,
    steps: [],
    loop: false,
    closeOnFinish: true,
    showClose: true,
    showProgress: true,
    bordered: false,
    backText: 'Back',
    nextText: 'Next',
    finishText: 'Finish',
    closeText: 'Close',
    zIndex: undefined,
    teleportTo: 'body',
    disabledTeleport: true,
    width: undefined,
    maxWidth: '280px',
  },
  argTypes: {
    modelValue: boolean,
    activeStep: object,
    steps: object,
    loop: boolean,
    closeOnFinish: boolean,
    showClose: boolean,
    showProgress: boolean,
    bordered: boolean,
    backText: text,
    nextText: text,
    finishText: text,
    closeText: text,
    zIndex: number,
    teleportTo: object,
    disabledTeleport: boolean,
    width: object,
    maxWidth: object,
  },
  render: render(
    { NmorphButton, NmorphGuide, NmorphGuideStep },
    `<NmorphGuide v-bind="args" v-model="modelValue">
      <NmorphGuideStep name="first" title="First step" text="Guide step content">
        <NmorphButton text="Target" />
      </NmorphGuideStep>
    </NmorphGuide>`
  ),
};
