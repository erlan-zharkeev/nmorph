import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { h } from 'vue';
import { NmorphQRCode } from '@/components';

describe('NmorphQRCode', () => {
  it('renders QR code svg and exposes scoped error content', () => {
    const wrapper = mount(NmorphQRCode, {
      props: {
        value: 'nmorph',
        size: 128,
        margin: 2,
        color: '#111111',
        background: '#ffffff',
        title: 'Nmorph QR',
      },
    });
    const qrCode = wrapper.find('.nmorph-qr-code').element as HTMLElement;

    expect(qrCode.style.getPropertyValue('--nmorph-private-qr-code-size')).toBe('128px');
    expect(wrapper.find('path').attributes('fill')).toBe('#111111');
    expect(wrapper.find('.nmorph-qr-code__svg').exists()).toBe(true);
    expect(wrapper.find('title').text()).toBe('Nmorph QR');
    expect(wrapper.find('path').attributes('d')).toContain('M');

    const error = mount(NmorphQRCode, {
      props: {
        value: 'x'.repeat(1000),
        maxVersion: 1,
      },
      slots: {
        error: ({ message }) => h('span', { class: 'qr-error' }, message),
      },
    });

    expect(error.find('.nmorph-qr-code').classes()).toContain('nmorph-qr-code--error');
    expect(error.find('.qr-error').text()).toContain('too large');

    wrapper.unmount();
    error.unmount();
  });
});
