import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { nextTick } from 'vue';
import { NmorphScroll } from '@/components';

describe('NmorphScroll', () => {
  it('updates NmorphScroll bars when slotted content changes after mount', async () => {
    const wrapper = mount(NmorphScroll, {
      props: {
        height: '72px',
        scrollXProp: 'auto',
        scrollYProp: 'hidden',
      },
      slots: {
        default: '<div class="scroll-content" style="width: 80px; height: 20px;">Content</div>',
      },
    });

    await nextTick();
    await nextTick();

    const viewport = wrapper.find('.nmorph-scroll__viewport').element as HTMLElement;
    let scrollLeft = 0;
    let scrollTop = 0;
    let scrollWidth = 100;

    Object.defineProperties(viewport, {
      clientWidth: { configurable: true, get: () => 100 },
      clientHeight: { configurable: true, get: () => 72 },
      scrollWidth: { configurable: true, get: () => scrollWidth },
      scrollHeight: { configurable: true, get: () => 72 },
      scrollLeft: {
        configurable: true,
        get: () => scrollLeft,
        set: (value) => {
          scrollLeft = value;
        },
      },
      scrollTop: {
        configurable: true,
        get: () => scrollTop,
        set: (value) => {
          scrollTop = value;
        },
      },
    });

    expect(wrapper.find('.nmorph-scroll__bar--horizontal').exists()).toBe(false);

    scrollWidth = 260;
    viewport.firstElementChild?.setAttribute('data-scroll-width', 'wide');
    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });
    await nextTick();

    expect(wrapper.find('.nmorph-scroll__bar--horizontal').exists()).toBe(true);

    wrapper.unmount();
  });

  it('maps vertical wheel movement to horizontal scroll when vertical scrolling is unavailable', async () => {
    const wrapper = mount(NmorphScroll, {
      props: {
        height: '40px',
      },
      slots: {
        default: '<div style="width: 300px">Wide content</div>',
      },
    });
    const viewportWrapper = wrapper.find('.nmorph-scroll__viewport');
    const viewport = viewportWrapper.element as HTMLElement;

    Object.defineProperties(viewport, {
      clientWidth: { value: 100, configurable: true },
      clientHeight: { value: 40, configurable: true },
      scrollWidth: { value: 300, configurable: true },
      scrollHeight: { value: 40, configurable: true },
    });
    viewport.scrollLeft = 0;
    viewport.scrollTop = 0;

    await viewportWrapper.trigger('scroll');

    const wheelEvent = new Event('wheel', { cancelable: true }) as WheelEvent;

    Object.defineProperties(wheelEvent, {
      deltaX: { value: 0 },
      deltaY: { value: 64 },
      deltaMode: { value: 0 },
    });
    viewport.dispatchEvent(wheelEvent);

    expect(viewport.scrollLeft).toBe(64);
    expect(wheelEvent.defaultPrevented).toBe(true);

    wrapper.unmount();
  });
});
