import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { defineComponent, nextTick } from 'vue';
import { NmorphTable, NmorphTableColumn } from '@/components';

describe('NmorphTable', () => {
  it('moves virtual table active row with keyboard navigation', async () => {
    const rows = Array.from({ length: 20 }, (_, index) => ({ name: `Row ${index}` }));
    const wrapper = mount(
      defineComponent({
        components: { NmorphTable, NmorphTableColumn },
        setup() {
          return { rows };
        },
        template:
          '<NmorphTable virtual virtual-dynamic-height :data="rows" :virtual-row-height="20" virtual-height="40px"><NmorphTableColumn prop="name" label="Name" /></NmorphTable>',
      })
    );

    await nextTick();
    await nextTick();

    const body = wrapper.find('.nmorph-table__body');
    await body.trigger('keydown', { key: 'ArrowDown' });
    await nextTick();

    expect(wrapper.findAll('.nmorph-table__table-data-row')[0].classes()).toContain(
      'nmorph-table__table-data-row--active'
    );

    await body.trigger('keydown', { key: 'ArrowDown' });
    await nextTick();

    expect(wrapper.findAll('.nmorph-table__table-data-row')[1].classes()).toContain(
      'nmorph-table__table-data-row--active'
    );
    wrapper.unmount();
  });
});
