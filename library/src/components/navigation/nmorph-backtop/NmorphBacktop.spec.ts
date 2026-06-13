import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';
import { NmorphBacktop } from '@/components';

describe('NmorphBacktop', () => {
  it('uses the nearest scrollable ancestor for nested backtop usage', async () => {
    const scrollContainer = document.createElement('div');
    const content = document.createElement('div');
    scrollContainer.style.overflowY = 'auto';
    Object.defineProperty(scrollContainer, 'clientHeight', { configurable: true, value: 100 });
    Object.defineProperty(scrollContainer, 'scrollHeight', { configurable: true, value: 400 });
    Object.defineProperty(scrollContainer, 'scrollTo', { configurable: true, value: vi.fn() });
    scrollContainer.append(content);
    document.body.append(scrollContainer);

    const wrapper = mount(NmorphBacktop, {
      props: {
        visibilityHeight: 10,
        teleportDisabled: true,
      },
      attachTo: content,
    });

    await nextTick();

    expect(wrapper.find('.nmorph-backtop').classes()).not.toContain('nmorph-backtop--show');

    scrollContainer.scrollTop = 40;
    scrollContainer.dispatchEvent(new Event('scroll'));
    await nextTick();

    expect(wrapper.find('.nmorph-backtop').classes()).toContain('nmorph-backtop--show');

    await wrapper.find('.nmorph-backtop > div').trigger('click');

    expect(scrollContainer.scrollTo).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

    wrapper.unmount();
    scrollContainer.remove();
  });

  it('keeps backtop position variables on the teleported element', async () => {
    const target = document.createElement('div');
    const portal = document.createElement('div');
    portal.id = 'backtop-portal-test';
    document.body.append(target, portal);

    const wrapper = mount(NmorphBacktop, {
      props: {
        right: 24,
        bottom: 32,
        zIndex: 99,
        teleportTo: '#backtop-portal-test',
      },
      attachTo: target,
      global: {
        stubs: {
          Teleport: false,
        },
      },
    });

    await nextTick();
    await nextTick();

    const backtop = portal.querySelector('.nmorph-backtop') as HTMLElement;

    expect(backtop).toBeTruthy();
    expect(backtop.style.getPropertyValue('--nmorph-private-backtop-right')).toBe('24px');
    expect(backtop.style.getPropertyValue('--nmorph-private-backtop-bottom')).toBe('32px');
    expect(backtop.style.getPropertyValue('--nmorph-private-backtop-z-index')).toBe('99');

    wrapper.unmount();
    target.remove();
    portal.remove();
  });
});
