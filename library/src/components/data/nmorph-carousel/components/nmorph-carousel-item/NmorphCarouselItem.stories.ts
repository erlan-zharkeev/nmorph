import type { Meta } from '@storybook/vue3';
import { NmorphCarousel, NmorphCarouselItem } from '@/components';
import { render, text, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Data',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const CarouselItem: Story = {
  args: {
    name: 'story-slide',
  },
  argTypes: {
    name: text,
  },
  render: render(
    { NmorphCarousel, NmorphCarouselItem },
    `<NmorphCarousel style="width: 360px; height: 180px;">
      <NmorphCarouselItem v-bind="args">
        <div style="height: 160px; display: grid; place-items: center; background: rgba(87,139,214,.2);">Carousel item</div>
      </NmorphCarouselItem>
    </NmorphCarousel>`
  ),
};
