import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { nextTick } from 'vue';
import { NmorphPagination } from '@/components';

describe('NmorphPagination', () => {
  it('can reserve a fixed pagination container while loading', async () => {
    const wrapper = mount(NmorphPagination, {
      props: {
        totalElementsQuantity: 0,
        loading: true,
        fixedContainer: true,
        maxVisiblePages: 7,
        width: '360px',
        minWidth: 320,
      },
    });

    await nextTick();

    const pagination = wrapper.find('.nmorph-pagination');
    const paginationElement = pagination.element as HTMLElement;

    expect(pagination.classes()).toContain('nmorph-pagination--fixed-container');
    expect(paginationElement.style.getPropertyValue('--nmorph-private-pagination-fixed-pages')).toBe('7');
    expect(paginationElement.style.getPropertyValue('--nmorph-private-pagination-width')).toBe('360px');
    expect(paginationElement.style.getPropertyValue('--nmorph-private-pagination-min-width')).toBe('320px');

    wrapper.unmount();
  });

  it('keeps pagination page controls stable while loading with temporary empty totals', async () => {
    const wrapper = mount(NmorphPagination, {
      props: { totalElementsQuantity: 40, elementsQuantityOnPage: 10 },
    });

    await nextTick();

    expect(wrapper.findAll('.nmorph-pagination__page-btn-wrapper')).toHaveLength(4);

    await wrapper.setProps({ loading: true, totalElementsQuantity: 0 });
    await nextTick();

    expect(wrapper.find('.nmorph-pagination').attributes('aria-busy')).toBe('true');
    expect(wrapper.findAll('.nmorph-pagination__page-btn-wrapper')).toHaveLength(4);

    wrapper.unmount();
  });

  it('uses basic thickness for pagination page controls by default', async () => {
    const wrapper = mount(NmorphPagination, {
      props: { totalElementsQuantity: 24, elementsQuantityOnPage: 8 },
    });

    await nextTick();

    const pagination = wrapper.find('.nmorph-pagination').element as HTMLElement;

    expect(pagination.style.getPropertyValue('--nmorph-private-pagination-height')).toBe('var(--basic-component)');
    expect(wrapper.find('.nmorph-pagination__page-btn.nmorph-radio').classes()).toContain('nmorph--basic-component');
    wrapper.unmount();
  });
});
