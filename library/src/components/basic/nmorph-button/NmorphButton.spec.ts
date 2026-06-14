import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { defineComponent } from 'vue';
import { NmorphButton, NmorphIcon, NmorphIconSearch } from '@/components';

describe('NmorphButton', () => {
  it('keeps explicit icon color inside transparent button', () => {
    const wrapper = mount(
      defineComponent({
        components: { NmorphButton, NmorphIcon, NmorphIconSearch },
        template: `
          <NmorphButton design="plain">
            <NmorphIcon color="var(--nmorph-contrast-text-color)">
              <NmorphIconSearch />
            </NmorphIcon>
          </NmorphButton>
        `,
      })
    );

    const icon = wrapper.find('.nmorph-icon').element as HTMLElement;

    expect(icon.style.getPropertyValue('--nmorph-private-icon-color')).toBe('var(--nmorph-contrast-text-color)');
    expect(icon.style.getPropertyValue('--nmorph-private-icon-color')).toBe('var(--nmorph-contrast-text-color)');

    wrapper.unmount();
  });

  it('keeps transparent button color prop and derives hover color from it', () => {
    const wrapper = mount(NmorphButton, {
      props: {
        design: 'plain',
        color: 'var(--nmorph-error-text-color)',
        text: 'Delete',
      },
    });

    const button = wrapper.find('.nmorph-button').element as HTMLElement;

    expect(button.style.getPropertyValue('--nmorph-private-button-color')).toBe('var(--nmorph-error-text-color)');
    expect(button.style.getPropertyValue('--nmorph-private-button-plain-color')).toBe('var(--nmorph-error-text-color)');
    expect(button.style.getPropertyValue('--nmorph-private-button-hover-color')).toBe(
      'color-mix(in srgb, var(--nmorph-error-text-color) 75%, var(--nmorph-white-color))'
    );

    wrapper.unmount();
  });

  it('supports toggle button state with aria-pressed and danger styling', async () => {
    const wrapper = mount(NmorphButton, {
      props: {
        toggle: true,
        modelValue: false,
        danger: true,
        shape: 'circle',
      },
      slots: {
        'icon-only': '<span>Mic</span>',
      },
    });

    const button = wrapper.find('.nmorph-button__content');

    expect(button.attributes('aria-pressed')).toBe('false');
    expect(wrapper.find('.nmorph-button').classes()).toEqual(
      expect.arrayContaining(['nmorph-button--danger', 'nmorph-button--circle'])
    );

    await button.trigger('click');

    expect(wrapper.emitted('update:model-value')?.at(-1)).toEqual([true]);

    await wrapper.setProps({ modelValue: true });

    expect(button.attributes('aria-pressed')).toBe('true');
    expect(wrapper.find('.nmorph-button').classes()).toContain('nmorph-button--active');

    wrapper.unmount();
  });

  it('keeps plain button border by default and supports borderless mode', () => {
    const defaultWrapper = mount(NmorphButton, {
      props: {
        design: 'plain',
        text: 'Copy',
      },
    });
    const borderlessWrapper = mount(NmorphButton, {
      props: {
        design: 'plain',
        borderless: true,
        text: 'Copy',
      },
    });

    expect(defaultWrapper.find('.nmorph-button').classes()).toContain('nmorph-button--plain');
    expect(defaultWrapper.find('.nmorph-button').classes()).not.toContain('nmorph-button--borderless');
    expect(borderlessWrapper.find('.nmorph-button').classes()).toContain('nmorph-button--borderless');

    defaultWrapper.unmount();
    borderlessWrapper.unmount();
  });

  it('wraps text-only default slot content with the aligned button label', () => {
    const wrapper = mount(NmorphButton, {
      props: {
        thickness: 'thin',
      },
      slots: {
        default: 'Thin',
      },
    });

    const label = wrapper.find('.nmorph-button__label');

    expect(label.exists()).toBe(true);
    expect(label.text()).toBe('Thin');

    wrapper.unmount();
  });

  it('keeps rich default slot content unwrapped', () => {
    const wrapper = mount(NmorphButton, {
      slots: {
        default: '<span class="custom-button-content">Custom</span>',
      },
    });

    expect(wrapper.find('.custom-button-content').exists()).toBe(true);
    expect(wrapper.find('.nmorph-button__label').exists()).toBe(false);

    wrapper.unmount();
  });
});
