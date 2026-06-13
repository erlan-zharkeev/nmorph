import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { nextTick } from 'vue';
import { loadNmorphEmojiLocale, nmorphEmojiQuickList } from '@/components/data/nmorph-emoji-picker/emoji';
import { NmorphEmojiPicker } from '@/components';
import { emojiData } from '@test/utils/components';

describe('NmorphEmojiPicker', () => {
  it('selects quick emoji and expands compact emoji picker', async () => {
    const wrapper = mount(NmorphEmojiPicker, {
      props: {
        dataSource: emojiData,
        quickList: ['😀', '🚀'],
        initialExpanded: false,
        i18n: {
          expandLabel: 'Expand emoji',
          quickLabel: 'Quick emoji',
        },
      },
    });

    expect(wrapper.find('.nmorph-emoji-picker__quick-list').exists()).toBe(true);

    await wrapper.findAll('.nmorph-emoji-picker__quick-button')[1].trigger('click');

    expect(wrapper.emitted('select')?.at(-1)).toEqual(['🚀']);

    const expandButton = wrapper.find('.nmorph-emoji-picker__expand-button');

    expect(expandButton.attributes('aria-label')).toBe('Expand emoji');

    await expandButton.trigger('click');

    expect(wrapper.emitted('expand')).toHaveLength(1);
    expect(wrapper.find('.nmorph-emoji-picker__panel').exists()).toBe(true);
    expect(wrapper.find('.nmorph-emoji-picker__quick-list').exists()).toBe(false);

    wrapper.unmount();
  });

  it('filters emoji by annotation and tags', async () => {
    const wrapper = mount(NmorphEmojiPicker, {
      props: {
        dataSource: {
          Smileys: [emojiData[0]],
          Objects: [emojiData[1]],
          Symbols: [emojiData[2]],
        },
        initialExpanded: true,
      },
    });

    await wrapper.find('.nmorph-emoji-picker__search-input').setValue('launch');
    await nextTick();

    const buttons = wrapper.findAll('.nmorph-emoji-picker__emoji');

    expect(buttons).toHaveLength(1);
    expect(buttons[0].text()).toBe('🚀');

    await buttons[0].trigger('click');

    expect(wrapper.emitted('select')?.at(-1)).toEqual(['🚀']);

    wrapper.unmount();
  });

  it('filters emoji by localized group labels', async () => {
    const wrapper = mount(NmorphEmojiPicker, {
      props: {
        language: 'ru',
        dataSource: [{ emoji: '😀', annotation: 'радость', group: 'Smileys', groupLabel: 'Смайлы' }],
        i18n: {
          categories: {
            Smileys: 'Смайлы',
          },
        },
        initialExpanded: true,
      },
    });

    await wrapper.find('.nmorph-emoji-picker__search-input').setValue('смай');
    await nextTick();

    const buttons = wrapper.findAll('.nmorph-emoji-picker__emoji');

    expect(buttons).toHaveLength(1);
    expect(buttons[0].text()).toBe('😀');

    wrapper.unmount();
  });

  it('moves emoji grid focus with keyboard navigation', async () => {
    const target = document.createElement('div');
    document.body.appendChild(target);

    const wrapper = mount(NmorphEmojiPicker, {
      props: {
        dataSource: emojiData.map((item) => ({ ...item, group: 'Smileys' })),
        initialExpanded: true,
      },
      attachTo: target,
    });

    const buttons = wrapper.findAll('.nmorph-emoji-picker__emoji');

    await buttons[0].trigger('focus');
    await buttons[0].trigger('keydown', { key: 'ArrowRight' });
    await nextTick();

    expect(document.activeElement).toBe(buttons[1].element);

    wrapper.unmount();
    target.remove();
  });

  it('loads packaged emoji locale data lazily', async () => {
    const locale = await loadNmorphEmojiLocale('en');

    expect(locale.language).toBe('en');
    expect(locale.data.length).toBeGreaterThan(1000);
    expect(locale.data[0].emoji).toBe('😀');
    expect(locale.data[0].annotation).toBe('grinning face');
    expect(locale.data[0].tags).toEqual(expect.arrayContaining(['grinning face', 'smile', 'happy']));
    expect(locale.data.find((item) => item.emoji === '❤️')?.annotation).toBe('red heart');
    expect(locale.data.find((item) => item.emoji === '🇰🇿')?.annotation).toBe('flag Kazakhstan');
    expect(locale.quickList).toEqual(nmorphEmojiQuickList);
  });
});
