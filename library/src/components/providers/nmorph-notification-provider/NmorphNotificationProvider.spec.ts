import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';
import { NmorphNotificationProvider } from '@/components';

describe('NmorphNotificationProvider', () => {
  it('keeps notification transition groups mounted for first-item enter animations', async () => {
    const wrapper = mount(NmorphNotificationProvider, {
      props: {
        notifications: [],
        disabledTeleport: true,
      },
    });

    expect(wrapper.findAll('.nmorph-notification-provider__list')).toHaveLength(6);

    await wrapper.setProps({
      notifications: [{ id: 'first', type: 'info', title: 'First' }],
    });
    await nextTick();

    expect(wrapper.find('.nmorph-notification-provider__notification').exists()).toBe(true);

    wrapper.unmount();
  });

  it('renders notification duration indicator and forwards alert border props', async () => {
    const wrapper = mount(NmorphNotificationProvider, {
      props: {
        disabledTeleport: true,
        notifications: [
          {
            id: 'timed',
            type: 'info',
            title: 'Timed',
            content: 'Content',
            duration: 3000,
            bordered: false,
          },
        ],
      },
    });

    await nextTick();

    const notification = wrapper.find('.nmorph-notification-provider__notification');
    const alert = wrapper.find('.nmorph-alert');

    expect(notification.classes()).toContain('nmorph-notification-provider__notification--with-duration');
    expect(
      (notification.element as HTMLElement).style.getPropertyValue('--nmorph-private-notification-provider-duration')
    ).toBe('3000ms');
    expect(wrapper.find('.nmorph-notification-provider__duration').exists()).toBe(true);
    expect(wrapper.find('.nmorph-notification-provider__duration-value').text()).toBe('3s');
    expect(alert.classes()).not.toContain('nmorph-alert--bordered');

    wrapper.unmount();
  });

  it('updates notification duration countdown label as time passes', async () => {
    vi.useFakeTimers();

    const wrapper = mount(NmorphNotificationProvider, {
      props: {
        disabledTeleport: true,
        notifications: [
          {
            id: 'timed',
            type: 'error',
            title: 'Timed',
            content: 'Content',
            duration: 60000,
          },
        ],
      },
    });

    try {
      await nextTick();

      expect(wrapper.find('.nmorph-notification-provider__duration-value').text()).toBe('60s');

      await vi.advanceTimersByTimeAsync(1000);
      await nextTick();

      expect(wrapper.find('.nmorph-notification-provider__duration-value').text()).toBe('59s');

      await vi.advanceTimersByTimeAsync(58000);
      await nextTick();

      expect(wrapper.find('.nmorph-notification-provider__duration-value').text()).toBe('1s');
    } finally {
      wrapper.unmount();
      vi.useRealTimers();
    }
  });

  it('can hide only notification duration value while keeping the progress bar', async () => {
    const wrapper = mount(NmorphNotificationProvider, {
      props: {
        disabledTeleport: true,
        notifications: [
          {
            id: 'timed',
            type: 'info',
            title: 'Timed',
            content: 'Content',
            duration: 3000,
            showDurationValue: false,
          },
        ],
      },
    });

    await nextTick();

    const duration = wrapper.find('.nmorph-notification-provider__duration');
    const alert = wrapper.find('.nmorph-alert');

    expect(duration.exists()).toBe(true);
    expect(duration.attributes('title')).toBeUndefined();
    expect(alert.attributes('showdurationvalue')).toBeUndefined();
    expect(alert.attributes('duration')).toBeUndefined();
    expect(wrapper.find('.nmorph-notification-provider__duration-track').exists()).toBe(true);
    expect(wrapper.find('.nmorph-notification-provider__duration-bar').exists()).toBe(true);
    expect(wrapper.find('.nmorph-notification-provider__duration-value').exists()).toBe(false);

    wrapper.unmount();
  });

  it('uses the shared z-index manager when notifications appear', async () => {
    const wrapper = mount(NmorphNotificationProvider, {
      props: {
        disabledTeleport: true,
        notifications: [],
      },
    });

    const provider = wrapper.find('.nmorph-notification-provider').element as HTMLElement;
    const initialZIndex = Number(provider.style.zIndex);

    await wrapper.setProps({
      notifications: [{ id: 'layered', type: 'info', title: 'Layered' }],
    });
    await nextTick();
    await nextTick();

    const updatedProvider = wrapper.find('.nmorph-notification-provider').element as HTMLElement;

    expect(Number(updatedProvider.style.zIndex)).toBeGreaterThan(initialZIndex);

    wrapper.unmount();
  });

  it('teleports notification provider to body by default', async () => {
    const target = document.createElement('div');
    document.body.appendChild(target);

    const wrapper = mount(NmorphNotificationProvider, {
      props: {
        notifications: [{ id: 'teleported', type: 'info', title: 'Teleported' }],
      },
      attachTo: target,
    });

    await nextTick();
    await nextTick();

    const provider = document.body.querySelector('#teleported')?.closest('.nmorph-notification-provider');

    expect(provider).not.toBeNull();
    expect(target.contains(provider)).toBe(false);

    wrapper.unmount();
    target.remove();
  });
});
