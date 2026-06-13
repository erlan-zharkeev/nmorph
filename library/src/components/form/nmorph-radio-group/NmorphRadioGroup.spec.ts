import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { defineComponent, nextTick, ref } from 'vue';
import { NmorphRadioGroup } from '@/components';
import { options } from '@test/utils/components';

describe('NmorphRadioGroup', () => {
  it('syncs radio groups bound to the same model', async () => {
    const wrapper = mount(
      defineComponent({
        components: { NmorphRadioGroup },
        setup() {
          const value = ref('second');
          return { options, value };
        },
        template: `
          <NmorphRadioGroup v-model="value" :options="options" />
          <NmorphRadioGroup v-model="value" :options="options" />
        `,
      })
    );

    await wrapper.findAll('.nmorph-radio')[0].trigger('click');
    await nextTick();

    expect((wrapper.findAll('input[type="radio"]')[2].element as HTMLInputElement).checked).toBe(true);
    wrapper.unmount();
  });
});
