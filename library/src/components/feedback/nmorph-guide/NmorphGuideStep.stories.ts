import type { Meta } from '@storybook/vue3';
import { NmorphButton, NmorphGuide, NmorphGuideStep } from '@/components';
import { boolean, number, render, select, text, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Feedback',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const GuideStep: Story = {
  args: {
    name: 'story-step',
    title: '',
    text: '',
    imageSrc: '',
    imageAlt: '',
    position: 'bottom',
    order: undefined,
    disabled: false,
  },
  argTypes: {
    name: text,
    title: text,
    text,
    imageSrc: text,
    imageAlt: text,
    position: select(['top', 'right', 'bottom', 'left']),
    order: number,
    disabled: boolean,
  },
  render: render(
    { NmorphButton, NmorphGuide, NmorphGuideStep },
    `<NmorphGuide model-value disabled-teleport>
      <NmorphGuideStep v-bind="args">
        <NmorphButton text="Target" />
      </NmorphGuideStep>
    </NmorphGuide>`
  ),
};
