import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { nextTick } from 'vue';
import { NmorphTooltip } from '@/components';

describe('NmorphTooltip', () => {
  it('keeps tooltip content above adjacent controls through z-index', async () => {
    const wrapper = mount(NmorphTooltip, {
      props: {
        forceShow: true,
        text: 'Tooltip',
        zIndex: 1234,
      },
      slots: {
        default: '<button>Target</button>',
      },
    });

    await nextTick();

    const tooltip = wrapper.find('.nmorph-tooltip').element as HTMLElement;
    const content = wrapper.find('.nmorph-tooltip__info-content').element as HTMLElement;

    expect(tooltip.style.getPropertyValue('--nmorph-private-tooltip-z-index')).toBe('1234');
    expect(content).toBeTruthy();

    wrapper.unmount();
  });

  it('supports tooltip content slot, click trigger, manual trigger and disabled state', async () => {
    const wrapper = mount(NmorphTooltip, {
      props: {
        trigger: 'click',
      },
      slots: {
        default: '<button class="tooltip-target">Target</button>',
        content: '<strong class="tooltip-content">Nickname</strong>',
      },
    });

    expect(wrapper.find('.tooltip-content').exists()).toBe(false);

    await wrapper.find('.tooltip-target').trigger('click', { button: 0 });
    await nextTick();

    expect(wrapper.find('.tooltip-content').text()).toBe('Nickname');

    await wrapper.setProps({ disabled: true });
    await nextTick();

    expect(wrapper.find('.tooltip-content').exists()).toBe(false);

    wrapper.unmount();

    const manual = mount(NmorphTooltip, {
      props: {
        trigger: 'manual',
      },
      slots: {
        default: '<button class="tooltip-target">Target</button>',
        content: '<span class="manual-content">Manual content</span>',
      },
    });

    await manual.find('.tooltip-target').trigger('click', { button: 0 });
    await nextTick();

    expect(manual.find('.manual-content').exists()).toBe(false);

    (manual.vm as unknown as { open: () => void }).open();
    await nextTick();

    expect(manual.find('.manual-content').text()).toBe('Manual content');

    manual.unmount();
  });

  it('can disable touch click activation for tooltips', async () => {
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

    const wrapper = mount(NmorphTooltip, {
      props: {
        trigger: 'click',
        touch: 'disable',
      },
      slots: {
        default: '<button class="tooltip-target">Target</button>',
        content: '<span class="touch-content">Touch content</span>',
      },
    });

    const target = wrapper.find('.tooltip-target').element as HTMLElement;

    target.dispatchEvent(createPointerEvent('pointerdown', { pointerType: 'touch' }));
    target.click();
    await nextTick();

    expect(wrapper.find('.touch-content').exists()).toBe(false);

    wrapper.unmount();
  });

  it('keeps tooltip trigger and popup as direct positioning children', async () => {
    const wrapper = mount(NmorphTooltip, {
      props: {
        forceShow: true,
        text: 'Tooltip',
      },
      slots: {
        default: '<span class="tooltip-target">Target</span>',
      },
    });

    await nextTick();

    const content = wrapper.find('.nmorph-tooltip__content');
    const trigger = wrapper.find('.nmorph-tooltip__trigger');
    const popup = wrapper.find('.nmorph-tooltip__info-content');

    expect(trigger.exists()).toBe(true);
    expect(trigger.find('.tooltip-target').exists()).toBe(true);
    expect(trigger.element.parentElement).toBe(content.element);
    expect(popup.element.parentElement).toBe(content.element);

    wrapper.unmount();
  });

  it('supports popup surface classes and hidden triangle', async () => {
    const wrapper = mount(NmorphTooltip, {
      props: {
        forceShow: true,
        text: 'Tooltip',
        contentClass: 'custom-tooltip-surface',
        hideTriangle: true,
      },
      slots: {
        default: '<span class="tooltip-target">Target</span>',
      },
    });

    await nextTick();

    expect(wrapper.find('.nmorph-tooltip__info-content').classes()).toContain('custom-tooltip-surface');
    expect(wrapper.find('.nmorph-tooltip__triangle').exists()).toBe(false);

    wrapper.unmount();
  });
});
