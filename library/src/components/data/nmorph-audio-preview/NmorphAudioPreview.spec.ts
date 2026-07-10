import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
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
    ).toBe('var(--nmorph-white-color)');
    expect(
      (
        wrapper.find('.nmorph-audio-preview__play-indicator .nmorph-icon').element as HTMLElement
      ).style.getPropertyValue('--nmorph-private-icon-color')
    ).toBe('var(--nmorph-white-color)');

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

  it('releases the audio media pipeline on unmount without emitting playback events', () => {
    const wrapper = mount(NmorphAudioPreview, {
      props: {
        src: 'blob:audio',
      },
    });
    const audio = wrapper.find('audio').element as HTMLAudioElement;
    const source = document.createElement('source');
    const pause = vi.fn(() => audio.dispatchEvent(new Event('pause')));
    const load = vi.fn();
    const removeAttribute = vi.spyOn(audio, 'removeAttribute');

    source.setAttribute('src', 'blob:audio-fallback');
    audio.append(source);
    Object.defineProperty(audio, 'pause', { configurable: true, value: pause });
    Object.defineProperty(audio, 'load', { configurable: true, value: load });
    Object.defineProperty(audio, 'srcObject', { configurable: true, writable: true, value: {} });

    wrapper.unmount();

    expect(pause).toHaveBeenCalledTimes(1);
    expect(removeAttribute).toHaveBeenCalledWith('src');
    expect(source.hasAttribute('src')).toBe(false);
    expect(audio.srcObject).toBeNull();
    expect(load).toHaveBeenCalledTimes(1);
    expect(wrapper.emitted('pause')).toBeUndefined();
  });

  it('keeps ordinary audio play and pause controls working', async () => {
    const wrapper = mount(NmorphAudioPreview, {
      props: {
        src: 'blob:audio',
      },
    });
    const audio = wrapper.find('audio').element as HTMLAudioElement;
    const play = vi.fn(async () => audio.dispatchEvent(new Event('play')));
    const pause = vi.fn(() => audio.dispatchEvent(new Event('pause')));

    Object.defineProperty(audio, 'play', { configurable: true, value: play });
    Object.defineProperty(audio, 'pause', { configurable: true, value: pause });

    await wrapper.find('button.nmorph-audio-preview__icon').trigger('click');

    expect(play).toHaveBeenCalledTimes(1);
    expect(wrapper.emitted('play')).toHaveLength(1);

    await wrapper.find('button.nmorph-audio-preview__icon').trigger('click');

    expect(pause).toHaveBeenCalledTimes(1);
    expect(wrapper.emitted('pause')).toHaveLength(1);

    wrapper.unmount();
  });
});
