import type { Meta } from '@storybook/vue3';
import { NmorphCarousel, NmorphCarouselItem } from '@/components';
import { boolean, design, render, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Data',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Carousel: Story = {
  args: {
    design: 'nmorph',
    loop: true,
  },
  argTypes: {
    design,
    loop: boolean,
  },
  render: render(
    { NmorphCarousel, NmorphCarouselItem },
    `<NmorphCarousel v-bind="args" style="width: 360px; height: 200px;">
      <NmorphCarouselItem name="one"><div style="height: 180px; padding: 40px; background: rgba(87,139,214,.2);">First slide</div></NmorphCarouselItem>
      <NmorphCarouselItem name="two"><div style="height: 180px; padding: 40px; background: rgba(77,159,114,.2);">Second slide</div></NmorphCarouselItem>
    </NmorphCarousel>`
  ),
};
