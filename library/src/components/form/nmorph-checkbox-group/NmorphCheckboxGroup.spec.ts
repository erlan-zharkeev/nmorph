import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { defineComponent, nextTick, ref } from 'vue';
import { NmorphCheckboxGroup } from '@/components';
import { checkboxOptions } from '@test/utils/components';

describe('NmorphCheckboxGroup', () => {
  it('syncs checkbox groups bound to the same model', async () => {
    const wrapper = mount(
      defineComponent({
        components: { NmorphCheckboxGroup },
        setup() {
          const value = ref(['second']);
          return { checkboxOptions, value };
        },
        template: `
          <NmorphCheckboxGroup v-model="value" :options="checkboxOptions" />
          <NmorphCheckboxGroup v-model="value" :options="checkboxOptions" />
        `,
      })
    );

    await wrapper.findAll('input[type="checkbox"]')[0].trigger('change');
    await nextTick();

    expect((wrapper.findAll('input[type="checkbox"]')[2].element as HTMLInputElement).checked).toBe(true);
    wrapper.unmount();
  });
});
