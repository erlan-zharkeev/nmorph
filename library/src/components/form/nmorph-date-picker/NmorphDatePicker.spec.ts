import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { nextTick } from 'vue';
import { NmorphDatePicker } from '@/components';

describe('NmorphDatePicker', () => {
  it('formats date picker display values with custom tokens', async () => {
    const wrapper = mount(NmorphDatePicker, {
      props: {
        modelValue: new Date(2024, 4, 9),
        initialDate: new Date(2024, 4, 9),
        dateFormat: 'DD.MM.YYYY',
      },
    });

    await nextTick();

    expect(wrapper.find('.nmorph-date-picker__selected-value').text()).toBe('09.05.2024');
    wrapper.unmount();
  });
});
