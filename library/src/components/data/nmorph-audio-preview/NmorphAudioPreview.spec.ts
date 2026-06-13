import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { nextTick } from 'vue';
import { NmorphAudioPreview } from '@/components';

describe('NmorphAudioPreview', () => {
  it('renders embedded audio preview surfaces with playback control on the icon', async () => {
    const wrapper = mount(NmorphAudioPreview, {
      props: {
        src: 'blob:audio',
        name: '32.mp3',
        durationMs: 200000,
        surface: 'soft',
        downloadHref: 'blob:audio',
      },
    });

    await nextTick();

    const preview = wrapper.find('.nmorph-audio-preview');
    const iconButton = wrapper.find('button.nmorph-audio-preview__icon');

    expect(preview.classes()).toEqual(expect.arrayContaining(['nmorph-audio-preview--soft']));
    expect(iconButton.exists()).toBe(true);
    expect(iconButton.attributes('aria-label')).toBe('Play 32.mp3');
    expect(wrapper.find('.nmorph-audio-preview__play-indicator').exists()).toBe(true);
    expect(wrapper.find('.nmorph-audio-preview__play').exists()).toBe(false);
    expect(
      (wrapper.find('.nmorph-audio-preview__icon > .nmorph-icon').element as HTMLElement).style.getPropertyValue(
        '--nmorph-private-icon-color'
      )
    ).toBe('');
    expect(
      (
        wrapper.find('.nmorph-audio-preview__play-indicator .nmorph-icon').element as HTMLElement
      ).style.getPropertyValue('--nmorph-private-icon-color')
    ).toBe('var(--nmorph-contrast-text-color)');
    expect(
      (
        wrapper.find('.nmorph-audio-preview__play-indicator .nmorph-icon').element as HTMLElement
      ).style.getPropertyValue('--nmorph-private-icon-color')
    ).toBe('var(--nmorph-contrast-text-color)');

    wrapper.unmount();
  });

  it('keeps audio preview time away from the edge when actions are hidden', async () => {
    const wrapper = mount(NmorphAudioPreview, {
      props: {
        src: 'blob:audio',
        name: '32.mp3',
        durationMs: 200000,
        showDefaultActions: false,
      },
    });

    await nextTick();

    expect(wrapper.find('.nmorph-audio-preview').classes()).toContain('nmorph-audio-preview--no-actions');
    expect(wrapper.find('.nmorph-audio-preview__actions').exists()).toBe(false);

    wrapper.unmount();
  });
});
