import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { nextTick, ref } from 'vue';
import { NmorphTagList, NmorphTagItem } from '@/components';

describe('NmorphTagList', () => {
  it('applies tag list design to tags while preserving explicit tag overrides', async () => {
    const wrapper = mount(NmorphTagList, {
      props: {
        design: 'plain',
        color: 'var(--nmorph-success-color)',
        modelValue: [
          { value: 'status', text: 'Status' },
          { value: 'locked', text: 'Locked', design: 'nmorph' },
          { value: 'preview', text: 'Preview', color: 'var(--nmorph-warn-color)' },
        ],
      },
    });

    const tags = wrapper.findAll('.nmorph-tag-item');

    expect(tags[0].classes()).toContain('nmorph-tag-item--plain');
    expect(tags[1].classes()).toContain('nmorph-tag-item--nmorph');
    expect(tags[2].classes()).toContain('nmorph-tag-item--plain');
    expect(wrapper.find('.nmorph-list').classes()).toContain('nmorph-list--plain');
    expect(tags[0].element.style.getPropertyValue('--nmorph-private-tag-item-background-color')).toBe(
      'var(--nmorph-success-color)'
    );
    expect(tags[2].element.style.getPropertyValue('--nmorph-private-tag-item-background-color')).toBe(
      'var(--nmorph-warn-color)'
    );

    await tags[0].trigger('click');
    await tags[0].find('.nmorph-tag-item__close-icon').trigger('click');

    expect(wrapper.emitted('click')?.[0]).toEqual(['status']);
    expect(wrapper.emitted('close')?.[0]).toEqual(['status']);
    expect(wrapper.emitted('update:selected-value')?.[0]).toEqual(['status']);
    expect(wrapper.emitted('click')).toHaveLength(1);

    wrapper.unmount();
  });

  it('supports v-model:selected-value for clicked tags', async () => {
    const wrapper = mount({
      components: { NmorphTagList },
      setup() {
        const tags = ref([
          { value: 'status', text: 'Status' },
          { value: 'preview', text: 'Preview' },
        ]);
        const selectedValue = ref<string | null>(null);

        return { selectedValue, tags };
      },
      template: `
        <div>
          <NmorphTagList v-model="tags" v-model:selected-value="selectedValue" />
          <span class="selected-value">{{ selectedValue }}</span>
        </div>
      `,
    });

    await wrapper.findAll('.nmorph-tag-item')[1].trigger('click');
    await nextTick();

    expect(wrapper.find('.selected-value').text()).toBe('preview');

    wrapper.unmount();
  });

  it('renders custom tag item slot content instead of text', async () => {
    const wrapper = mount(NmorphTagItem, {
      props: {
        value: 'custom',
        text: 'Fallback',
        design: 'plain',
      },
      slots: {
        default: '<span class="custom-tag-content">Custom</span>',
      },
    });

    expect(wrapper.find('.custom-tag-content').exists()).toBe(true);
    expect(wrapper.text()).toContain('Custom');
    expect(wrapper.text()).not.toContain('Fallback');

    await wrapper.find('.nmorph-tag-item').trigger('click');
    await wrapper.find('.nmorph-tag-item__close-icon').trigger('click');

    expect(wrapper.emitted('click')?.[0]).toEqual(['custom']);
    expect(wrapper.emitted('close')?.[0]).toEqual(['custom']);

    wrapper.unmount();
  });

  it('passes scoped item slots through tag list without breaking tag events', async () => {
    const wrapper = mount({
      components: { NmorphTagList },
      setup() {
        const tags = ref([
          { value: 'eyes', glyphKey: 'eyes', count: 2, visibleUsers: ['Ada', 'Lin'] },
          { value: 'thumb', glyphKey: 'thumb', count: 1, visibleUsers: ['Kai'], removable: false },
        ]);
        const selectedValue = ref<string | null>(null);

        return { selectedValue, tags };
      },
      template: `
        <div>
          <NmorphTagList v-model="tags" v-model:selected-value="selectedValue" design="plain">
            <template #item="{ item }">
              <span class="reaction-glyph">{{ item.glyphKey }}</span>
              <span v-if="item.count > 1" class="reaction-count">{{ item.count }}</span>
              <span class="reaction-users">{{ item.visibleUsers.length }}</span>
            </template>
          </NmorphTagList>
          <span class="selected-value">{{ selectedValue }}</span>
          <span class="tag-count">{{ tags.length }}</span>
        </div>
      `,
    });

    const firstTag = wrapper.findAll('.nmorph-tag-item')[0];

    expect(firstTag.text()).toContain('eyes');
    expect(firstTag.text()).toContain('2');
    expect(firstTag.text()).not.toContain('undefined');
    expect(firstTag.attributes()).not.toHaveProperty('count');
    expect(firstTag.attributes()).not.toHaveProperty('visibleusers');

    await firstTag.trigger('click');
    await nextTick();

    expect(wrapper.find('.selected-value').text()).toBe('eyes');

    await firstTag.find('.nmorph-tag-item__close-icon').trigger('click');
    await nextTick();

    expect(wrapper.find('.tag-count').text()).toBe('1');
    expect(wrapper.findAll('.nmorph-tag-item')).toHaveLength(1);

    wrapper.unmount();
  });

  it('uses contrast text color for nmorph tag close icons', async () => {
    const wrapper = mount(NmorphTagItem, {
      props: {
        value: 'new',
        text: 'New',
      },
    });

    await nextTick();

    const closeIcon = wrapper.find('.nmorph-tag-item__close-icon').element as HTMLElement;

    expect(closeIcon.style.getPropertyValue('--nmorph-private-icon-color')).toBe('var(--nmorph-contrast-text-color)');
    expect(closeIcon.style.getPropertyValue('--nmorph-private-icon-color')).toBe('var(--nmorph-contrast-text-color)');

    wrapper.unmount();
  });

  it('uses readable content colors for plain tag backgrounds', async () => {
    document.documentElement.style.setProperty('--nmorph-gray-color', '#c9d2de');
    document.documentElement.style.setProperty('--nmorph-main-color', '#1c1f21');

    const wrapper = mount({
      components: { NmorphTagItem },
      template: `
        <div>
          <NmorphTagItem value="light" text="Light" design="plain" />
          <NmorphTagItem value="dark" text="Dark" design="plain" color="var(--nmorph-main-color)" />
        </div>
      `,
    });

    await nextTick();
    await nextTick();

    const [lightTag, darkTag] = wrapper.findAll('.nmorph-tag-item');

    expect(lightTag.element.style.getPropertyValue('--nmorph-private-tag-item-background-color')).toBe(
      'var(--nmorph-gray-color)'
    );
    expect(lightTag.element.style.getPropertyValue('--nmorph-private-tag-item-content-color')).toBe(
      'var(--nmorph-black-color)'
    );
    expect(darkTag.element.style.getPropertyValue('--nmorph-private-tag-item-background-color')).toBe(
      'var(--nmorph-main-color)'
    );
    expect(darkTag.element.style.getPropertyValue('--nmorph-private-tag-item-content-color')).toBe(
      'var(--nmorph-white-color)'
    );
    expect(
      lightTag.find('.nmorph-tag-item__close-icon').element.style.getPropertyValue('--nmorph-private-icon-color')
    ).toBe('var(--nmorph-black-color)');
    expect(
      darkTag.find('.nmorph-tag-item__close-icon').element.style.getPropertyValue('--nmorph-private-icon-color')
    ).toBe('var(--nmorph-white-color)');
    expect(lightTag.attributes('style')).not.toContain('--nmorph-tag-item-color');
    expect(lightTag.attributes('style')).not.toContain('--nmorph-tag-item-background');

    wrapper.unmount();
    document.documentElement.style.removeProperty('--nmorph-gray-color');
    document.documentElement.style.removeProperty('--nmorph-main-color');
  });
});
