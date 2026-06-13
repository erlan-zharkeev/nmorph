import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { NmorphLayout } from '@/components';

describe('NmorphLayout', () => {
  it('places layout slots around the body and forwards sizing variables', () => {
    const wrapper = mount(NmorphLayout, {
      props: {
        tag: 'article',
        gap: 12,
        asideWidth: '88px',
        asidePosition: 'right',
        fullHeight: true,
      },
      slots: {
        header: 'Header',
        aside: 'Aside',
        default: 'Main',
        footer: 'Footer',
      },
    });

    const layout = wrapper.find('.nmorph-layout');
    const element = layout.element as HTMLElement;
    const bodyChildren = wrapper.find('.nmorph-layout__body').element.children;

    expect(element.tagName).toBe('ARTICLE');
    expect(layout.classes()).toContain('nmorph-layout--aside-right');
    expect(layout.classes()).toContain('nmorph-layout--full-height');
    expect(element.style.getPropertyValue('--nmorph-private-layout-gap')).toBe('12px');
    expect(element.style.getPropertyValue('--nmorph-private-layout-aside-width')).toBe('88px');
    expect(bodyChildren[0].classList.contains('nmorph-layout__main')).toBe(true);
    expect(bodyChildren[1].classList.contains('nmorph-layout__aside')).toBe(true);
    expect(wrapper.find('.nmorph-layout__header').text()).toBe('Header');
    expect(wrapper.find('.nmorph-layout__footer').text()).toBe('Footer');

    wrapper.unmount();
  });
});
