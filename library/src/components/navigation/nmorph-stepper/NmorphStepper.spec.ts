import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { defineComponent, nextTick, ref } from 'vue';
import { NmorphStepper } from '@/components';

describe('NmorphStepper', () => {
  it('does not crash when clicking a single-item stepper', async () => {
    const createPointerEvent = (type: string, init: Partial<PointerEvent>) => {
      const event = new Event(type, { bubbles: true, cancelable: true });

      Object.entries(init).forEach(([key, value]) => {
        Object.defineProperty(event, key, {
          configurable: true,
          value,
        });
      });

      return event as PointerEvent;
    };

    const wrapper = mount(
      defineComponent({
        components: { NmorphStepper },
        setup() {
          const clicks = ref(0);
          const changes = ref<unknown[]>([]);
          const onChange = (payload: unknown) => {
            changes.value.push(payload);
          };

          return { clicks, changes, onChange };
        },
        template: `
          <NmorphStepper :model-value="0" :count="1" aria-label="Single slide" @change="onChange">
            <button class="single-slide-button" @click="clicks += 1">Only</button>
          </NmorphStepper>
        `,
      })
    );

    const root = wrapper.find('.nmorph-stepper');
    const slideButton = wrapper.find('.single-slide-button').element as HTMLElement;

    expect(root.attributes('tabindex')).toBeUndefined();

    slideButton.dispatchEvent(
      createPointerEvent('pointerdown', {
        clientX: 120,
        clientY: 30,
        pointerId: 1,
        pointerType: 'touch',
      })
    );
    expect(() => {
      slideButton.dispatchEvent(
        createPointerEvent('pointerup', {
          clientX: 120,
          clientY: 30,
          pointerId: 1,
          pointerType: 'touch',
        })
      );
    }).not.toThrow();
    await wrapper.find('.single-slide-button').trigger('click');
    await nextTick();

    expect(wrapper.vm.clicks).toBe(1);
    expect(wrapper.vm.changes).toEqual([]);

    wrapper.unmount();
  });

  it('controls stepper with one-step wheel, keyboard, swipe, and count clamping', async () => {
    const createWheelEvent = (init: Partial<WheelEvent>) => {
      const event = new Event('wheel', { bubbles: true, cancelable: true });

      Object.entries({
        deltaX: 0,
        deltaY: 0,
        ...init,
      }).forEach(([key, value]) => {
        Object.defineProperty(event, key, {
          configurable: true,
          value,
        });
      });

      return event as WheelEvent;
    };
    const createPointerEvent = (type: string, init: Partial<PointerEvent>) => {
      const event = new Event(type, { bubbles: true, cancelable: true });

      Object.entries(init).forEach(([key, value]) => {
        Object.defineProperty(event, key, {
          configurable: true,
          value,
        });
      });

      return event as PointerEvent;
    };

    const wrapper = mount(
      defineComponent({
        components: { NmorphStepper },
        setup() {
          const index = ref(0);
          const count = ref(3);
          const clicks = ref(0);
          const changes = ref<unknown[]>([]);
          const onChange = (payload: unknown) => {
            changes.value.push(payload);
          };

          return { index, count, clicks, changes, onChange };
        },
        template: `
          <NmorphStepper v-model="index" :count="count" aria-label="Slides" @change="onChange">
            <button class="slide-button" @click="clicks += 1">First</button>
            <section>Second</section>
            <section>Third</section>
            <template #indicator="{ index, count, goTo, next, previous }">
              <button class="indicator-next" @click="next">{{ index }} / {{ count }}</button>
              <button class="indicator-previous" @click="previous">Previous</button>
              <button class="indicator-go" @click="goTo(2)">Go</button>
            </template>
          </NmorphStepper>
        `,
      })
    );

    const root = wrapper.find('.nmorph-stepper');
    const track = wrapper.find('.nmorph-stepper__track');

    expect(root.attributes('tabindex')).toBe('0');
    expect(track.attributes('style')).toContain('translateX(-0%)');

    const setPointerCapture = vi.fn();

    Object.defineProperty(root.element, 'setPointerCapture', { configurable: true, value: setPointerCapture });

    wrapper.find('.indicator-next').element.dispatchEvent(
      createPointerEvent('pointerdown', {
        clientX: 120,
        clientY: 30,
        pointerId: 1,
        pointerType: 'mouse',
        button: 0,
      })
    );

    expect(setPointerCapture).not.toHaveBeenCalled();

    await wrapper.find('.indicator-next').trigger('click');
    await nextTick();

    expect(wrapper.vm.index).toBe(1);

    await wrapper.find('.indicator-previous').trigger('click');
    await nextTick();

    expect(wrapper.vm.index).toBe(0);

    root.element.dispatchEvent(createWheelEvent({ deltaY: 90 }));
    await nextTick();

    expect(wrapper.vm.index).toBe(1);
    expect(wrapper.vm.changes.at(-1)).toEqual({ index: 1, previousIndex: 0, direction: 'next' });

    root.element.dispatchEvent(createWheelEvent({ deltaY: 90 }));
    await nextTick();

    expect(wrapper.vm.index).toBe(1);

    await root.trigger('keydown', { key: 'ArrowRight' });

    expect(wrapper.vm.index).toBe(2);
    expect(track.attributes('style')).toContain('translateX(-200%)');

    await root.trigger('keydown', { key: 'ArrowRight' });

    expect(wrapper.vm.index).toBe(2);

    await wrapper.find('.indicator-previous').trigger('click');

    expect(wrapper.vm.index).toBe(1);

    await wrapper.find('.indicator-go').trigger('click');

    expect(wrapper.vm.index).toBe(2);

    wrapper.vm.count = 2;
    await nextTick();

    expect(wrapper.vm.index).toBe(1);
    expect(wrapper.vm.changes.at(-1)).toEqual({ index: 1, previousIndex: 2, direction: 'previous' });

    wrapper.vm.count = 3;
    wrapper.vm.index = 0;
    await nextTick();

    const slideButton = wrapper.find('.slide-button').element as HTMLElement;

    slideButton.dispatchEvent(
      createPointerEvent('pointerdown', {
        clientX: 120,
        clientY: 30,
        pointerId: 1,
        pointerType: 'touch',
      })
    );
    slideButton.dispatchEvent(
      createPointerEvent('pointermove', {
        clientX: 70,
        clientY: 32,
        pointerId: 1,
        pointerType: 'touch',
      })
    );
    slideButton.dispatchEvent(
      createPointerEvent('pointerup', {
        clientX: 70,
        clientY: 32,
        pointerId: 1,
        pointerType: 'touch',
      })
    );
    await wrapper.find('.slide-button').trigger('click');
    await nextTick();

    expect(wrapper.vm.index).toBe(1);
    expect(wrapper.vm.clicks).toBe(0);

    wrapper.unmount();
  });
});
