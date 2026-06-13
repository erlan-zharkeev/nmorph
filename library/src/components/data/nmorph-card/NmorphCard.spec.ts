import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { NmorphCard } from '@/components';

describe('NmorphCard', () => {
  it('passes card spacing and radius props to card styles', () => {
    const wrapper = mount(NmorphCard, {
      props: {
        cardPadding: 24,
        padding: 18,
        radius: 12,
        contentPadding: 8,
      },
      slots: {
        default: 'Content',
      },
    });

    const card = wrapper.find('.nmorph-card').element as HTMLElement;

    expect(card.style.getPropertyValue('--nmorph-private-card-padding')).toBe('18px');
    expect(card.style.getPropertyValue('--nmorph-private-card-radius')).toBe('12px');
    expect(card.style.getPropertyValue('--nmorph-private-card-content-padding')).toBe('8px');
    expect(card.style.padding).toBe('18px');

    wrapper.unmount();
  });

  it('adds combined border width variable only for combined cards', () => {
    const regular = mount(NmorphCard, {
      props: {
        combinedShadowBorderWidth: 2,
      },
      slots: {
        default: 'Content',
      },
    });
    const combined = mount(NmorphCard, {
      props: {
        shadowType: 'combined',
        combinedShadowBorderWidth: 2,
      },
      slots: {
        default: 'Content',
      },
    });

    expect(
      (regular.find('.nmorph-card').element as HTMLElement).style.getPropertyValue(
        '--nmorph-private-card-combined-border-width'
      )
    ).toBe('');
    expect(
      (combined.find('.nmorph-card').element as HTMLElement).style.getPropertyValue(
        '--nmorph-private-card-combined-border-width'
      )
    ).toBe('2px');

    regular.unmount();
    combined.unmount();
  });

  it('fills the available width by default and can fit content', () => {
    const filled = mount(NmorphCard, {
      slots: {
        default: 'Content',
      },
    });
    const fitted = mount(NmorphCard, {
      props: {
        fill: false,
      },
      slots: {
        default: 'Content',
      },
    });

    expect(filled.find('.nmorph-card').classes()).toContain('nmorph-card--fill');
    expect(fitted.find('.nmorph-card').classes()).toContain('nmorph-card--fit-content');

    filled.unmount();
    fitted.unmount();
  });

  it('renders the card root with a custom tag', () => {
    const wrapper = mount(NmorphCard, {
      props: {
        tag: 'article',
      },
      slots: {
        default: 'Content',
      },
    });

    expect(wrapper.find('.nmorph-card').element.tagName).toBe('ARTICLE');

    wrapper.unmount();
  });

  it('renders card header wrapper only when header slot exists', () => {
    const withoutHeader = mount(NmorphCard, {
      slots: {
        default: 'Content',
      },
    });
    const withHeader = mount(NmorphCard, {
      slots: {
        header: 'Header',
        default: 'Content',
      },
    });

    expect(withoutHeader.find('.nmorph-card__header').exists()).toBe(false);
    expect(withHeader.find('.nmorph-card__header').exists()).toBe(true);

    withoutHeader.unmount();
    withHeader.unmount();
  });

  it('applies custom class to the card content wrapper', () => {
    const wrapper = mount(NmorphCard, {
      props: {
        contentClass: 'custom-card-content',
      },
      slots: {
        default: 'Content',
      },
    });

    expect(wrapper.find('.nmorph-card__content').classes()).toContain('custom-card-content');

    wrapper.unmount();
  });
});
