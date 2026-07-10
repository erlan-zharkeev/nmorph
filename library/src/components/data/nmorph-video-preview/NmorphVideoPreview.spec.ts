import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';
import { NmorphVideoPreview } from '@/components';

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
    const playButton = wrapper.find('button.nmorph-video-preview__play');

    await wrapper.find('video').trigger('loadeddata');

    expect(playButton.exists()).toBe(true);
    expect(playButton.attributes('aria-label')).toBe('Play clip.mp4');
    expect(
      (playButton.find('.nmorph-icon').element as HTMLElement).style.getPropertyValue('--nmorph-private-icon-color')
    ).toBe('var(--nmorph-white-color)');
    expect(
      (playButton.find('.nmorph-icon').element as HTMLElement).style.getPropertyValue('--nmorph-private-icon-color')
    ).toBe('var(--nmorph-white-color)');
    expect(fullscreenButton.exists()).toBe(true);
    expect(previewButton.exists()).toBe(true);
    expect(
      (fullscreenButton.find('.nmorph-icon').element as HTMLElement).style.getPropertyValue(
        '--nmorph-private-icon-color'
      )
    ).toBe('var(--nmorph-white-color)');

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

  it('releases primary and portal videos on unmount without emitting playback events', async () => {
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
      },
    });

    await wrapper.find('.nmorph-video-preview__action-button--preview').trigger('click');
    await nextTick();

    const primaryVideo = wrapper.find('.nmorph-video-preview__media').element as HTMLVideoElement;
    const portalVideo = document.body.querySelector('.nmorph-video-preview__portal-media') as HTMLVideoElement;
    const primaryPause = vi.fn(() => primaryVideo.dispatchEvent(new Event('pause')));
    const primaryLoad = vi.fn();
    const primaryRemoveAttribute = vi.spyOn(primaryVideo, 'removeAttribute');
    const portalPause = vi.fn();
    const portalLoad = vi.fn();
    const portalRemoveAttribute = vi.spyOn(portalVideo, 'removeAttribute');

    Object.defineProperty(primaryVideo, 'pause', { configurable: true, value: primaryPause });
    Object.defineProperty(primaryVideo, 'load', { configurable: true, value: primaryLoad });
    Object.defineProperty(primaryVideo, 'srcObject', { configurable: true, writable: true, value: {} });
    Object.defineProperty(portalVideo, 'pause', { configurable: true, value: portalPause });
    Object.defineProperty(portalVideo, 'load', { configurable: true, value: portalLoad });
    Object.defineProperty(portalVideo, 'srcObject', { configurable: true, writable: true, value: {} });

    wrapper.unmount();

    expect(primaryPause).toHaveBeenCalledTimes(1);
    expect(primaryRemoveAttribute).toHaveBeenCalledWith('src');
    expect(primaryVideo.srcObject).toBeNull();
    expect(primaryLoad).toHaveBeenCalledTimes(1);
    expect(portalPause).toHaveBeenCalledTimes(1);
    expect(portalRemoveAttribute).toHaveBeenCalledWith('src');
    expect(portalVideo.srcObject).toBeNull();
    expect(portalLoad).toHaveBeenCalledTimes(1);
    expect(wrapper.emitted('pause')).toBeUndefined();

    target.remove();
  });

  it('keeps ordinary video play and pause controls working', async () => {
    const wrapper = mount(NmorphVideoPreview, {
      props: {
        src: 'blob:video',
      },
    });
    const video = wrapper.find('.nmorph-video-preview__media').element as HTMLVideoElement;
    const play = vi.fn(async () => video.dispatchEvent(new Event('play')));
    const pause = vi.fn(() => video.dispatchEvent(new Event('pause')));

    Object.defineProperty(video, 'play', { configurable: true, value: play });
    Object.defineProperty(video, 'pause', { configurable: true, value: pause });

    await wrapper.find('button.nmorph-video-preview__play').trigger('click');

    expect(play).toHaveBeenCalledTimes(1);
    expect(wrapper.emitted('play')).toHaveLength(1);

    await wrapper.find('button.nmorph-video-preview__play').trigger('click');

    expect(pause).toHaveBeenCalledTimes(1);
    expect(wrapper.emitted('pause')).toHaveLength(1);

    wrapper.unmount();
  });
});
