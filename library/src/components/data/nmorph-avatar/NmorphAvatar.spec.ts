import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { nextTick } from 'vue';
import { NmorphAvatar } from '@/components';
import { imageSrc } from '@test/utils/components';

describe('NmorphAvatar', () => {
  it('keeps plain avatar border by default and supports borderless mode', () => {
    const defaultWrapper = mount(NmorphAvatar, {
      props: {
        design: 'plain',
        name: 'Plain Avatar',
      },
    });
    const borderlessWrapper = mount(NmorphAvatar, {
      props: {
        design: 'plain',
        borderless: true,
        name: 'Plain Avatar',
      },
    });

    expect(defaultWrapper.find('.nmorph-avatar').classes()).toContain('nmorph-avatar--plain');
    expect(defaultWrapper.find('.nmorph-avatar').classes()).not.toContain('nmorph-avatar--borderless');
    expect(borderlessWrapper.find('.nmorph-avatar').classes()).toContain('nmorph-avatar--borderless');

    defaultWrapper.unmount();
    borderlessWrapper.unmount();
  });

  it('uses default text color for avatar loading icon', async () => {
    const wrapper = mount(NmorphAvatar, {
      props: { src: imageSrc },
    });

    await nextTick();

    const icon = wrapper.find('.nmorph-image__loading .nmorph-icon').element as HTMLElement;

    expect(icon.style.getPropertyValue('--nmorph-private-icon-color')).toBe('');
    expect(icon.style.getPropertyValue('--nmorph-private-icon-color')).toBe('');

    wrapper.unmount();
  });

  it('renders avatar initials without inline color override', () => {
    const wrapper = mount(NmorphAvatar, {
      props: { name: 'Jane Doe' },
    });

    const initials = wrapper.find('.nmorph-avatar__initials');

    expect(initials.exists()).toBe(true);
    expect(initials.text()).toBe('JD');
    expect((initials.element as HTMLElement).style.color).toBe('');

    wrapper.unmount();
  });

  it('does not render image preview trigger inside avatar preview', async () => {
    const wrapper = mount(NmorphAvatar, {
      props: { src: imageSrc, preview: true },
    });

    await nextTick();

    expect(wrapper.find('.nmorph-image-preview__trigger').exists()).toBe(false);
    wrapper.unmount();
  });
});
