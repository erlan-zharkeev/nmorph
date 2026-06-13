import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { NmorphDrawer } from '@/components';

describe('NmorphDrawer', () => {
  it('closes drawer from close button and honors overlay close configuration', async () => {
    const wrapper = mount(NmorphDrawer, {
      props: {
        modelValue: true,
        title: 'Settings',
        placement: 'left',
        size: 280,
        disabledTeleport: true,
        contentClass: 'custom-drawer-content',
      },
      slots: {
        default: 'Drawer content',
        footer: 'Footer',
      },
    });

    const drawer = wrapper.find('.nmorph-drawer');
    const drawerElement = drawer.element as HTMLElement;

    expect(drawer.classes()).toEqual(expect.arrayContaining(['nmorph-drawer--left', 'nmorph-drawer--open']));
    expect(drawerElement.style.getPropertyValue('--nmorph-private-drawer-size')).toBe('280px');
    expect(drawer.attributes('aria-label')).toBe('Settings');
    expect(wrapper.find('.custom-drawer-content').text()).toBe('Drawer content');
    expect(wrapper.find('.nmorph-drawer__footer').text()).toBe('Footer');

    await wrapper.find('.nmorph-drawer__close').trigger('click');

    expect(wrapper.emitted('on-close')).toHaveLength(1);
    expect(wrapper.emitted('update:model-value')?.at(-1)).toEqual([false]);

    const overlayLocked = mount(NmorphDrawer, {
      props: {
        modelValue: true,
        closeOnOverlay: false,
        disabledTeleport: true,
      },
      slots: {
        default: 'Drawer content',
      },
    });

    await overlayLocked.find('.nmorph-overlay').trigger('click');
    expect(overlayLocked.emitted('update:model-value')).toBeUndefined();

    await overlayLocked.setProps({ closeOnOverlay: true });
    await overlayLocked.find('.nmorph-overlay').trigger('click');
    expect(overlayLocked.emitted('update:model-value')?.at(-1)).toEqual([false]);

    wrapper.unmount();
    overlayLocked.unmount();
  });
});
