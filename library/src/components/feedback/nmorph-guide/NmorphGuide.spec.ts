import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { defineComponent, nextTick, ref } from 'vue';
import { NmorphGuide, NmorphGuideStep } from '@/components';
import { imageSrc } from '@test/utils/components';

describe('NmorphGuide', () => {
  it('coordinates guide steps across separated target wrappers', async () => {
    const wrapper = mount(
      defineComponent({
        components: { NmorphGuide, NmorphGuideStep },
        setup() {
          const open = ref(true);
          const activeStep = ref('first');
          const steps = [
            {
              name: 'first',
              title: 'First target',
              text: 'Start here',
              imageSrc,
              imageAlt: 'Guide image',
              position: 'right' as const,
            },
            {
              name: 'second',
              title: 'Second target',
              text: 'Then continue here',
              position: 'left' as const,
            },
          ];

          return { open, activeStep, steps };
        },
        template: `
          <NmorphGuide v-model="open" :active-step="activeStep" :steps="steps" disabled-teleport @update:active-step="activeStep = $event">
            <section class="guide-area-left">
              <NmorphGuideStep name="first">
                <button class="first-target">First</button>
              </NmorphGuideStep>
            </section>
            <section class="guide-area-right">
              <NmorphGuideStep name="second">
                <button class="second-target">Second</button>
              </NmorphGuideStep>
            </section>
          </NmorphGuide>
        `,
      })
    );

    await nextTick();

    expect(wrapper.find('.nmorph-guide-step__title').text()).toBe('First target');
    expect(wrapper.find('.nmorph-guide-step__text').text()).toBe('Start here');
    expect(wrapper.find('.nmorph-guide-step__image').attributes('src')).toBe(imageSrc);

    await wrapper.find('.nmorph-guide-step__next').trigger('click');
    await nextTick();

    expect(wrapper.vm.activeStep).toBe('second');
    expect(wrapper.find('.guide-area-right .nmorph-guide-step__title').text()).toBe('Second target');

    await wrapper.find('.nmorph-guide-step__back').trigger('click');
    await nextTick();

    expect(wrapper.vm.activeStep).toBe('first');
    expect(wrapper.find('.guide-area-left .nmorph-guide-step__title').text()).toBe('First target');

    wrapper.unmount();
  });

  it('teleports guide cards above layout layers with the guide z-index', async () => {
    const wrapper = mount(
      defineComponent({
        components: { NmorphGuide, NmorphGuideStep },
        template: `
          <NmorphGuide model-value :z-index="2468" :steps="[{ name: 'first', title: 'Teleported guide card' }]">
            <NmorphGuideStep name="first">
              <button>Target</button>
            </NmorphGuideStep>
          </NmorphGuide>
        `,
      }),
      { attachTo: document.body }
    );

    await nextTick();
    await nextTick();

    const teleportedCard = document.body.querySelector('.nmorph-tooltip__info-content--teleported') as HTMLElement;

    expect(teleportedCard).toBeTruthy();
    expect(teleportedCard.textContent).toContain('Teleported guide card');
    expect(teleportedCard.style.getPropertyValue('--nmorph-private-tooltip-z-index')).toBe('2468');

    wrapper.unmount();
  });
});
