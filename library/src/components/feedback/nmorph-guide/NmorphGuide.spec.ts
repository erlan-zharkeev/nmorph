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

  it('uses plain design for default guide action buttons', async () => {
    const wrapper = mount(
      defineComponent({
        components: { NmorphGuide, NmorphGuideStep },
        template: `
          <NmorphGuide model-value disabled-teleport :steps="[{ name: 'first', title: 'Guide' }]">
            <NmorphGuideStep name="first">
              <button>Target</button>
            </NmorphGuideStep>
          </NmorphGuide>
        `,
      })
    );

    await nextTick();

    const actionButtons = wrapper.findAll('.nmorph-guide-step__actions .nmorph-button');

    expect(actionButtons).toHaveLength(3);
    expect(actionButtons.every((button) => button.classes().includes('nmorph-button--plain'))).toBe(true);
    expect(actionButtons.every((button) => button.classes().includes('nmorph--basic-component'))).toBe(true);

    wrapper.unmount();
  });

  it('adds bordered styling to the guide popup and hides the triangle when bordered is enabled', async () => {
    const wrapper = mount(
      defineComponent({
        components: { NmorphGuide, NmorphGuideStep },
        template: `
          <NmorphGuide model-value bordered disabled-teleport :steps="[{ name: 'first', title: 'Guide' }]">
            <NmorphGuideStep name="first">
              <button>Target</button>
            </NmorphGuideStep>
          </NmorphGuide>
        `,
      })
    );

    await nextTick();

    expect(wrapper.find('.nmorph-tooltip__info-content').classes()).toContain('nmorph-guide-step__tooltip--bordered');
    expect(wrapper.find('.nmorph-guide-step__card').classes()).not.toContain('nmorph-guide-step__card--bordered');
    expect(wrapper.find('.nmorph-tooltip__triangle').exists()).toBe(false);

    wrapper.unmount();
  });

  it('highlights the active guide target with default and custom outline settings', async () => {
    const defaultWrapper = mount(
      defineComponent({
        components: { NmorphGuide, NmorphGuideStep },
        template: `
          <NmorphGuide model-value disabled-teleport :steps="[{ name: 'first', title: 'Guide' }]">
            <NmorphGuideStep name="first">
              <button>Target</button>
            </NmorphGuideStep>
          </NmorphGuide>
        `,
      })
    );

    await nextTick();

    const defaultStep = defaultWrapper.find('.nmorph-guide-step');

    expect(defaultStep.classes()).toContain('nmorph-guide-step--active');
    expect(defaultStep.element.style.getPropertyValue('--nmorph-private-guide-target-outline-color')).toBe(
      'var(--nmorph-success-color)'
    );
    expect(defaultStep.element.style.getPropertyValue('--nmorph-private-guide-target-outline-offset')).toBe(
      'var(--indentation-02)'
    );

    defaultWrapper.unmount();

    const customWrapper = mount(
      defineComponent({
        components: { NmorphGuide, NmorphGuideStep },
        template: `
          <NmorphGuide
            model-value
            disabled-teleport
            target-outline-color="#23aa55"
            :target-outline-offset="10"
            :steps="[{ name: 'first', title: 'Guide' }]"
          >
            <NmorphGuideStep name="first">
              <button>Target</button>
            </NmorphGuideStep>
          </NmorphGuide>
        `,
      })
    );

    await nextTick();

    expect(
      customWrapper
        .find('.nmorph-guide-step')
        .element.style.getPropertyValue('--nmorph-private-guide-target-outline-color')
    ).toBe('#23aa55');
    expect(
      customWrapper
        .find('.nmorph-guide-step')
        .element.style.getPropertyValue('--nmorph-private-guide-target-outline-offset')
    ).toBe('10px');

    customWrapper.unmount();
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
