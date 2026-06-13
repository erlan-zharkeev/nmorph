import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { defineComponent, nextTick, ref } from 'vue';
import { NmorphCollapse, NmorphCollapseItem } from '@/components';

describe('NmorphCollapse', () => {
  it('keeps collapse title available after closing and opens it again', async () => {
    const wrapper = mount(
      defineComponent({
        components: { NmorphCollapse, NmorphCollapseItem },
        setup() {
          const model = ref(['first']);

          return { model };
        },
        template: `
          <NmorphCollapse v-model="model">
            <NmorphCollapseItem name="first" title="First">Content</NmorphCollapseItem>
          </NmorphCollapse>
        `,
      })
    );

    await nextTick();
    await nextTick();

    const title = wrapper.find('.nmorph-collapse-item__title');
    expect(title.exists()).toBe(true);

    await title.trigger('click');
    expect(wrapper.vm.model).toEqual([]);
    expect(wrapper.find('.nmorph-collapse-item__title').exists()).toBe(true);

    await wrapper.find('.nmorph-collapse-item__title').trigger('click');
    expect(wrapper.vm.model).toEqual(['first']);

    wrapper.unmount();
  });
});
