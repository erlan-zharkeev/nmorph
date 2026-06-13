import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { nextTick } from 'vue';
import { NmorphLink } from '@/components';

describe('NmorphLink', () => {
  it('renders link icon by icon name before text', async () => {
    const wrapper = mount(NmorphLink, {
      props: {
        iconName: 'edit',
        text: 'Edit',
      },
    });

    await nextTick();

    const link = wrapper.find('a').element as HTMLElement;
    const icon = wrapper.find('.nmorph-link__icon');

    expect(icon.exists()).toBe(true);
    expect(icon.find('svg').exists()).toBe(true);
    expect(link.firstElementChild).toBe(icon.element);

    wrapper.unmount();
  });

  it('passes external link attributes to the inner anchor', async () => {
    const wrapper = mount(NmorphLink, {
      props: {
        href: 'https://example.com',
        target: 'blank',
        rel: 'noopener noreferrer nofollow ugc',
        referrerpolicy: 'no-referrer',
        download: 'message-link.html',
        ariaLabel: 'Open external message link',
        title: 'External link',
      },
    });

    await nextTick();

    const link = wrapper.find('a');

    expect(link.attributes('href')).toBe('https://example.com');
    expect(link.attributes('target')).toBe('_blank');
    expect(link.attributes('rel')).toBe('noopener noreferrer nofollow ugc');
    expect(link.attributes('referrerpolicy')).toBe('no-referrer');
    expect(link.attributes('download')).toBe('message-link.html');
    expect(link.attributes('aria-label')).toBe('Open external message link');
    expect(link.attributes('title')).toBe('External link');
    expect(wrapper.attributes('rel')).toBeUndefined();
    expect(wrapper.attributes('referrerpolicy')).toBeUndefined();

    wrapper.unmount();
  });
});
