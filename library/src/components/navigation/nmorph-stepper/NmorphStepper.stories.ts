import type { Meta } from '@storybook/vue3';
import { NmorphStepper } from '@/components';
import { boolean, number, render, text, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Navigation',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Stepper: Story = {
  args: {
    modelValue: 0,
    count: 0,
    disabled: false,
    loop: false,
    wheel: true,
    swipe: true,
    ariaLabel: 'Stepper',
  },
  argTypes: {
    modelValue: number,
    count: number,
    disabled: boolean,
    loop: boolean,
    wheel: boolean,
    swipe: boolean,
    ariaLabel: text,
  },
  render: render(
    { NmorphStepper },
    `<NmorphStepper v-bind="args" v-model="modelValue" style="width: 320px; height: 180px;">
      <div style="height: 100%; display: grid; place-items: center; background: rgba(87,139,214,.16);">Step {{ modelValue + 1 }}</div>
    </NmorphStepper>`
  ),
};
