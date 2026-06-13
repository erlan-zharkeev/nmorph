import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';
import { NmorphVideoPreview } from '@/components';
import { setVideoBufferedState } from '@test/utils/components';

describe('NmorphVideoPreview', () => {
  it('renders embedded video preview surfaces with playback control over the media', async () => {
    const target = document.createElement('div');
    document.body.appendChild(target);

    const wrapper = mount(NmorphVideoPreview, {
      attachTo: target,
      global: {
        stubs: {
          Teleport: false,
        },
      },
      props: {
        src: 'blob:video',
        name: 'clip.mp4',
        surface: 'plain',
        embedded: true,
        showMeta: false,
        controls: false,
      },
    });

    await nextTick();

    const preview = wrapper.find('.nmorph-video-preview');
    const fullscreenButton = wrapper.find('.nmorph-video-preview__action-button--fullscreen');
    const previewButton = wrapper.find('.nmorph-video-preview__action-button--preview');

    expect(preview.classes()).toEqual(
      expect.arrayContaining([
        'nmorph-video-preview--plain',
        'nmorph-video-preview--embedded',
        'nmorph-video-preview--no-meta',
      ])
    );
    expect(wrapper.find('.nmorph-video-preview__meta').exists()).toBe(false);
    expect(wrapper.find('button.nmorph-video-preview__play').exists()).toBe(false);

    await wrapper.find('video').trigger('loadeddata');

    expect(wrapper.find('button.nmorph-video-preview__play').exists()).toBe(false);

    setVideoBufferedState(wrapper.find('video').element as HTMLVideoElement, { duration: 120, end: 120 });
    await wrapper.find('video').trigger('progress');

    const playButton = wrapper.find('button.nmorph-video-preview__play');

    expect(playButton.exists()).toBe(true);
    expect(playButton.attributes('aria-label')).toBe('Play clip.mp4');
    expect(
      (playButton.find('.nmorph-icon').element as HTMLElement).style.getPropertyValue('--nmorph-private-icon-color')
    ).toBe('var(--nmorph-contrast-text-color)');
    expect(
      (playButton.find('.nmorph-icon').element as HTMLElement).style.getPropertyValue('--nmorph-private-icon-color')
    ).toBe('var(--nmorph-contrast-text-color)');
    expect(fullscreenButton.exists()).toBe(true);
    expect(previewButton.exists()).toBe(true);
    expect(
      (fullscreenButton.find('.nmorph-icon').element as HTMLElement).style.getPropertyValue(
        '--nmorph-private-icon-color'
      )
    ).toBe('var(--nmorph-contrast-text-color)');

    await wrapper.find('video').trigger('play');

    expect(preview.classes()).toEqual(expect.arrayContaining(['nmorph-video-preview--playing']));
    expect(playButton.attributes('aria-label')).toBe('Pause clip.mp4');

    const requestFullscreen = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(wrapper.find('video').element, 'requestFullscreen', {
      configurable: true,
      value: requestFullscreen,
    });

    await fullscreenButton.trigger('click');

    expect(requestFullscreen).toHaveBeenCalledTimes(1);
    expect(wrapper.emitted('fullscreen')).toHaveLength(1);

    await previewButton.trigger('click');
    await nextTick();

    const portal = document.body.querySelector('.nmorph-video-preview__portal');
    const portalVideo = portal?.querySelector('video');

    expect(portal).toBeTruthy();
    expect(portalVideo?.getAttribute('src')).toBe('blob:video');
    expect(portalVideo?.hasAttribute('controls')).toBe(true);
    expect(wrapper.emitted('preview')).toHaveLength(1);

    wrapper.unmount();
    target.remove();
  });

  it('can emit video preview without opening its internal overlay', async () => {
    const target = document.createElement('div');
    document.body.appendChild(target);

    const wrapper = mount(NmorphVideoPreview, {
      attachTo: target,
      global: {
        stubs: {
          Teleport: false,
        },
      },
      props: {
        src: 'blob:video',
        name: 'clip.mp4',
        previewMode: 'emit',
      },
    });

    await nextTick();
    await wrapper.find('.nmorph-video-preview__action-button--preview').trigger('click');
    await nextTick();

    expect(wrapper.emitted('preview')).toHaveLength(1);
    expect(document.body.querySelector('.nmorph-video-preview__portal')).toBeFalsy();

    wrapper.unmount();
    target.remove();
  });
});
