import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { nextTick } from 'vue';
import { NmorphVirtualList } from '@/components';
import { virtualItems } from '@test/utils/components';

describe('NmorphVirtualList', () => {
  it('virtualizes long lists and exposes scroll helpers', async () => {
    const wrapper = mount(NmorphVirtualList, {
      props: {
        items: virtualItems,
        itemKey: 'id',
        itemHeight: 20,
        overscan: 1,
        height: '60px',
      },
      slots: {
        default:
          '<template #default="{ item, index }"><div class="virtual-row">{{ index }}: {{ item.title }}</div></template>',
      },
    });

    const container = wrapper.find('.nmorph-virtual-list').element as HTMLElement;
    Object.defineProperty(container, 'clientHeight', {
      configurable: true,
      value: 60,
    });

    (wrapper.vm as unknown as { refresh: () => void }).refresh();
    await nextTick();

    expect(wrapper.find('.nmorph-virtual-list__spacer').attributes('style')).toContain('height: 800px');
    expect(wrapper.findAll('.virtual-row')).toHaveLength(4);
    expect(wrapper.findAll('.virtual-row')[0].text()).toContain('Virtual item 1');

    (wrapper.vm as unknown as { scrollToIndex: (index: number) => void }).scrollToIndex(10);
    await nextTick();

    expect(wrapper.findAll('.virtual-row')[0].text()).toContain('Virtual item 10');

    container.scrollTop = 120;
    await wrapper.trigger('scroll');

    expect(wrapper.emitted('on-scroll')).toHaveLength(1);

    wrapper.unmount();
  });
});
