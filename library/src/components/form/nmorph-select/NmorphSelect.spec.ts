import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { nextTick } from 'vue';
import { NmorphSelect } from '@/components';
import { options } from '@test/utils/components';

describe('NmorphSelect', () => {
  it('selects select options with keyboard navigation', async () => {
    const wrapper = mount(NmorphSelect, {
      props: { modelValue: '', options },
    });

    const select = wrapper.find('select');
    await select.trigger('keydown', { key: 'ArrowDown' });
    await select.trigger('keydown', { key: 'Enter' });
    await nextTick();

    expect(wrapper.emitted('update:model-value')?.at(-1)?.[0]).toBe('second');
    wrapper.unmount();
  });

  it('normalizes select emitted values for nullable single and multiple modes', async () => {
    const target = document.createElement('div');
    document.body.appendChild(target);

    const single = mount(NmorphSelect, {
      props: {
        modelValue: 'first',
        nullable: true,
        open: true,
        options,
      },
      attachTo: target,
      global: {
        stubs: {
          Teleport: false,
        },
      },
    });

    await nextTick();
    await nextTick();

    const firstOption = Array.from(document.body.querySelectorAll<HTMLElement>('.nmorph-select-option')).find(
      (option) => option.textContent?.includes('First')
    );

    firstOption?.click();
    await nextTick();

    expect(single.emitted('update:model-value')?.at(-1)).toEqual([null]);

    single.unmount();
    await nextTick();

    const multiple = mount(NmorphSelect, {
      props: {
        modelValue: [],
        multiple: true,
        open: true,
        options,
      },
      attachTo: target,
      global: {
        stubs: {
          Teleport: false,
        },
      },
    });

    await nextTick();
    await nextTick();

    const secondOption = Array.from(document.body.querySelectorAll<HTMLElement>('.nmorph-select-option')).find(
      (option) => option.textContent?.includes('Second')
    );

    secondOption?.click();
    await nextTick();

    expect(multiple.emitted('update:model-value')?.at(-1)).toEqual([['second']]);

    multiple.unmount();
    target.remove();
  });
});
