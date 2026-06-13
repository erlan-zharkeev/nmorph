import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { defineComponent, nextTick } from 'vue';
import { NmorphCarousel, NmorphCarouselItem } from '@/components';

describe('NmorphCarousel', () => {
  it('loops carousel navigation without rendering blank slides', async () => {
    const wrapper = mount(
      defineComponent({
        components: { NmorphCarousel, NmorphCarouselItem },
        template: `
          <NmorphCarousel>
            <NmorphCarouselItem name="first">First</NmorphCarouselItem>
            <NmorphCarouselItem name="second">Second</NmorphCarouselItem>
            <NmorphCarouselItem name="third">Third</NmorphCarouselItem>
          </NmorphCarousel>
        `,
      })
    );

    await nextTick();
    await nextTick();

    const wrapperTrack = wrapper.find('.nmorph-carousel__wrapper');
    const rightButton = wrapper.find('.nmorph-carousel__next');

    expect(wrapperTrack.attributes('style')).toContain('translateX(-100%)');

    await rightButton.trigger('click');
    expect(wrapperTrack.attributes('style')).toContain('translateX(-200%)');

    await rightButton.trigger('click');
    expect(wrapperTrack.attributes('style')).toContain('translateX(-300%)');

    await rightButton.trigger('click');
    expect(wrapperTrack.attributes('style')).toContain('translateX(-400%)');
    expect(wrapper.findAll('.nmorph-carousel__item')).toHaveLength(5);

    await wrapperTrack.trigger('transitionend');
    await nextTick();

    expect(wrapperTrack.attributes('style')).toContain('translateX(-100%)');

    wrapper.unmount();
  });
});
