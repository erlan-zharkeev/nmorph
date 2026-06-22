import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';
import { NmorphMediaGallery } from '@/components';
import { imageSrc, setVideoBufferedState } from '@test/utils/components';

describe('NmorphMediaGallery', () => {
  it('renders mixed media gallery and navigates between image and video', async () => {
    const target = document.createElement('div');
    document.body.appendChild(target);
    const items = [
      {
        kind: 'image' as const,
        src: imageSrc,
        name: 'photo.jpg',
        alt: 'Photo',
        size: 245760,
        downloadHref: 'blob:photo-download',
      },
      {
        kind: 'video' as const,
        src: 'blob:clip',
        name: 'clip.mp4',
        poster: 'blob:poster',
        size: 7340032,
        downloadHref: 'blob:clip-download',
        muted: true,
      },
    ];

    const wrapper = mount(NmorphMediaGallery, {
      props: {
        modelValue: true,
        items,
        initialIndex: 0,
      },
      attachTo: target,
      global: {
        stubs: {
          Teleport: false,
        },
      },
    });

    await nextTick();

    const gallery = document.body.querySelector('.nmorph-media-gallery') as HTMLElement;
    const image = gallery.querySelector('.nmorph-image img') as HTMLImageElement;

    expect(gallery).toBeTruthy();
    expect(gallery.querySelector('.nmorph-media-gallery__left .nmorph-button')).toBeTruthy();
    expect(gallery.querySelector('.nmorph-media-gallery__right .nmorph-button')).toBeTruthy();
    expect(gallery.querySelector('.nmorph-media-gallery__actions .nmorph-button')).toBeTruthy();
    expect(image.getAttribute('src')).toBe(imageSrc);
    expect(image.getAttribute('alt')).toBe('Photo');
    expect(gallery.querySelector('.nmorph-media-gallery__file-name')?.textContent).toBe('photo.jpg');
    expect(gallery.querySelector('.nmorph-media-gallery__file-size')?.textContent).toBe('240 KB');
    expect(gallery.querySelector('.nmorph-media-gallery__file-action')?.getAttribute('href')).toBe(
      'blob:photo-download'
    );

    (gallery.querySelector('.nmorph-media-gallery__file-action') as HTMLElement).click();

    expect(wrapper.emitted('download')?.[0]).toEqual([items[0], 0]);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    await nextTick();

    const video = document.body.querySelector('.nmorph-media-gallery__video') as HTMLVideoElement;
    const fileActions = Array.from(document.body.querySelectorAll('.nmorph-media-gallery__file-action'));

    expect(video.getAttribute('src')).toBe('blob:clip');
    expect(video.getAttribute('poster')).toBe('blob:poster');
    expect(video.hasAttribute('controls')).toBe(true);
    expect(video.hasAttribute('muted')).toBe(true);
    expect(video.getAttribute('preload')).toBe('metadata');
    expect(document.body.querySelector('.nmorph-media-gallery__file-name')?.textContent).toBe('clip.mp4');
    expect(document.body.querySelector('.nmorph-media-gallery__file-size')?.textContent).toBe('7 MB');
    expect(fileActions).toHaveLength(1);
    expect(fileActions[0].getAttribute('href')).toBe('blob:clip-download');
    expect(document.body.querySelector('button.nmorph-media-gallery__play')).toBeFalsy();

    setVideoBufferedState(video, { duration: 120, end: 120 });
    video.dispatchEvent(new Event('progress'));
    await nextTick();

    expect(document.body.querySelector('button.nmorph-media-gallery__play')).toBeFalsy();
    expect(wrapper.emitted('update:active-index')?.[0]).toEqual([1]);
    expect(wrapper.emitted('change')?.[0]).toEqual([items[1], 1]);

    video.dispatchEvent(new Event('play'));
    await nextTick();

    expect(gallery.classList.contains('nmorph-media-gallery--video-playing')).toBe(true);
    expect(document.body.querySelector('button.nmorph-media-gallery__play')).toBeFalsy();

    video.dispatchEvent(new Event('pause'));
    await nextTick();

    expect(gallery.classList.contains('nmorph-media-gallery--video-playing')).toBe(false);
    expect(document.body.querySelector('button.nmorph-media-gallery__play')).toBeFalsy();

    wrapper.unmount();
    target.remove();
  });

  it('renders media gallery trigger items with file-card style overlays', async () => {
    const items = [
      {
        kind: 'image' as const,
        src: imageSrc,
        name: 'photo.jpg',
        alt: 'Photo',
        size: 245760,
        downloadHref: 'blob:photo-download',
      },
      {
        kind: 'video' as const,
        src: 'blob:clip',
        name: 'clip.mp4',
        poster: 'blob:poster',
        size: 7340032,
        downloadHref: 'blob:clip-download',
      },
    ];

    const wrapper = mount(NmorphMediaGallery, {
      props: {
        design: 'plain',
        items,
        showTrigger: true,
      },
    });

    await nextTick();

    const triggerItems = wrapper.findAll('.nmorph-media-gallery__trigger-item');
    const trigger = wrapper.find('.nmorph-media-gallery__trigger');
    const imageTrigger = triggerItems[0];
    const videoTrigger = triggerItems[1];
    const imageDownload = imageTrigger.find('.nmorph-media-gallery__trigger-action');
    const videoActions = videoTrigger.findAll('.nmorph-media-gallery__trigger-action');

    expect(triggerItems).toHaveLength(2);
    expect(trigger.classes()).toContain('nmorph-media-gallery__trigger--plain');
    expect(imageTrigger.find('.nmorph-media-gallery__trigger-name').text()).toBe('photo.jpg');
    expect(imageTrigger.find('.nmorph-media-gallery__trigger-size').text()).toBe('240 KB');
    expect(imageDownload.attributes('href')).toBe('blob:photo-download');
    expect(imageDownload.attributes('download')).toBe('photo.jpg');
    expect(videoTrigger.find('.nmorph-media-gallery__trigger-name').text()).toBe('clip.mp4');
    expect(videoTrigger.find('.nmorph-media-gallery__trigger-size').text()).toBe('7 MB');
    expect(videoTrigger.find('.nmorph-media-gallery__trigger-play').exists()).toBe(true);
    expect(videoActions).toHaveLength(3);
    expect(videoActions[0].attributes('aria-label')).toBe('Preview clip.mp4');
    expect(videoActions[1].attributes('aria-label')).toBe('Fullscreen clip.mp4');
    expect(videoActions[2].attributes('href')).toBe('blob:clip-download');

    imageDownload.element.addEventListener('click', (event) => event.preventDefault());
    await imageDownload.trigger('click');

    expect(wrapper.emitted('download')?.[0]).toEqual([items[0], 0]);

    await videoTrigger.find('.nmorph-media-gallery__trigger-open').trigger('click');

    expect(wrapper.emitted('update:model-value')?.[0]).toEqual([true]);
    expect(wrapper.emitted('update:active-index')?.[0]).toEqual([1]);
    expect(wrapper.emitted('change')?.at(-1)).toEqual([items[1], 1]);

    wrapper.unmount();
  });

  it('applies content-aware media gallery trigger layout and container options', async () => {
    const items = [
      {
        kind: 'image' as const,
        src: imageSrc,
        name: 'wide.jpg',
        alt: 'Wide',
        aspectRatio: 2,
      },
      {
        kind: 'video' as const,
        src: 'blob:square-clip',
        name: 'square.mp4',
        poster: imageSrc,
        aspectRatio: 1,
      },
    ];

    const wrapper = mount(NmorphMediaGallery, {
      props: {
        items,
        height: 180,
        showTrigger: true,
        triggerLayout: 'natural',
        triggerClass: 'media-gallery-custom-trigger',
        triggerStyle: { maxWidth: '420px' },
        triggerImageFit: 'contain',
        triggerVideoFit: 'contain',
      },
    });

    await nextTick();

    const trigger = wrapper.find('.nmorph-media-gallery__trigger');
    const triggerItems = wrapper.findAll('.nmorph-media-gallery__trigger-item');
    const wideItemStyle = (triggerItems[0].element as HTMLElement).style;
    const squareItemStyle = (triggerItems[1].element as HTMLElement).style;

    expect(trigger.classes()).toContain('nmorph-media-gallery__trigger--natural');
    expect(trigger.classes()).toContain('nmorph-media-gallery__trigger--paired');
    expect(trigger.classes()).toContain('media-gallery-custom-trigger');
    expect(trigger.element.style.maxWidth).toBe('420px');
    expect(trigger.element.style.getPropertyValue('--nmorph-private-media-gallery-trigger-image-fit')).toBe('contain');
    expect(trigger.element.style.getPropertyValue('--nmorph-private-media-gallery-trigger-video-fit')).toBe('contain');
    expect(wideItemStyle.getPropertyValue('aspect-ratio')).toBe('2 / 1');
    expect(wideItemStyle.flexGrow).toBe('2');
    expect(wideItemStyle.flexBasis).toBe('360px');
    expect(squareItemStyle.getPropertyValue('aspect-ratio')).toBe('1 / 1');
    expect(squareItemStyle.flexGrow).toBe('1');
    expect(squareItemStyle.flexBasis).toBe('180px');
    expect(
      (wrapper.find('.nmorph-image').element as HTMLElement).style.getPropertyValue('--nmorph-private-image-fit')
    ).toBe('contain');

    await wrapper.setProps({ items: [items[0]] });
    await nextTick();

    expect(wrapper.find('.nmorph-media-gallery__trigger').classes()).toContain('nmorph-media-gallery__trigger--single');
    expect((wrapper.find('.nmorph-media-gallery__trigger-item').element as HTMLElement).style.flexGrow).toBe('2');

    await wrapper.setProps({
      items: [
        ...items,
        {
          kind: 'image' as const,
          src: imageSrc,
          name: 'portrait.jpg',
          alt: 'Portrait',
          aspectRatio: 0.75,
        },
      ],
    });
    await nextTick();

    expect(wrapper.find('.nmorph-media-gallery__trigger').classes()).toContain(
      'nmorph-media-gallery__trigger--wrapped'
    );
    expect((wrapper.findAll('.nmorph-media-gallery__trigger-item')[2].element as HTMLElement).style.flexGrow).toBe(
      '0.75'
    );

    wrapper.unmount();
  });

  it('can show only download actions on media gallery trigger items', async () => {
    const items = [
      {
        kind: 'image' as const,
        src: imageSrc,
        name: 'photo.jpg',
        alt: 'Photo',
        downloadHref: 'blob:photo-download',
      },
      {
        kind: 'video' as const,
        src: 'blob:clip',
        name: 'clip.mp4',
        poster: 'blob:poster',
        downloadHref: 'blob:clip-download',
      },
      {
        kind: 'video' as const,
        src: 'blob:preview-only',
        name: 'preview-only.mp4',
      },
    ];

    const wrapper = mount(NmorphMediaGallery, {
      props: {
        items,
        showTrigger: true,
        showTriggerActions: true,
        showTriggerPreviewAction: false,
        showTriggerFullscreenAction: false,
        showTriggerDownloadAction: true,
      },
    });

    await nextTick();

    const triggerItems = wrapper.findAll('.nmorph-media-gallery__trigger-item');
    const imageActions = triggerItems[0].findAll('.nmorph-media-gallery__trigger-action');
    const videoActions = triggerItems[1].findAll('.nmorph-media-gallery__trigger-action');

    expect(triggerItems[0].find('.nmorph-media-gallery__trigger-actions').exists()).toBe(true);
    expect(imageActions).toHaveLength(1);
    expect(imageActions[0].attributes('aria-label')).toBe('Download photo.jpg');
    expect(imageActions[0].attributes('href')).toBe('blob:photo-download');
    expect(triggerItems[1].find('.nmorph-media-gallery__trigger-actions').exists()).toBe(true);
    expect(videoActions).toHaveLength(1);
    expect(videoActions[0].attributes('aria-label')).toBe('Download clip.mp4');
    expect(videoActions[0].attributes('href')).toBe('blob:clip-download');
    expect(triggerItems[2].find('.nmorph-media-gallery__trigger-actions').exists()).toBe(false);
    expect(wrapper.find('[aria-label="Preview clip.mp4"]').exists()).toBe(false);
    expect(wrapper.find('[aria-label="Fullscreen clip.mp4"]').exists()).toBe(false);

    wrapper.unmount();
  });

  it('applies media gallery trigger height and can hide trigger and stage overlays', async () => {
    const target = document.createElement('div');
    document.body.appendChild(target);
    const items = [
      {
        kind: 'video' as const,
        src: 'blob:clip',
        name: 'clip.mp4',
        poster: 'blob:poster',
        size: 7340032,
        downloadHref: 'blob:clip-download',
        controls: false,
      },
    ];

    const wrapper = mount(NmorphMediaGallery, {
      props: {
        modelValue: true,
        items,
        height: 180,
        showTrigger: true,
        showTriggerName: false,
        showTriggerSize: false,
        showTriggerActions: false,
        showTriggerPlayButton: false,
        showFileName: false,
        showFileSize: false,
        showFileActions: false,
        showPlaybackButton: false,
      },
      attachTo: target,
      global: {
        stubs: {
          Teleport: false,
        },
      },
    });

    await nextTick();

    const trigger = wrapper.find('.nmorph-media-gallery__trigger');
    const video = document.body.querySelector('.nmorph-media-gallery__video') as HTMLVideoElement;

    expect(trigger.element.style.getPropertyValue('--nmorph-private-media-gallery-trigger-height')).toBe('180px');
    expect(trigger.classes()).toContain('nmorph-media-gallery__trigger--fixed-height');
    expect(wrapper.find('.nmorph-media-gallery__trigger-name').exists()).toBe(false);
    expect(wrapper.find('.nmorph-media-gallery__trigger-size').exists()).toBe(false);
    expect(wrapper.find('.nmorph-media-gallery__trigger-actions').exists()).toBe(false);
    expect(wrapper.find('.nmorph-media-gallery__trigger-play').exists()).toBe(false);
    expect(document.body.querySelector('.nmorph-media-gallery__file-name')).toBeFalsy();
    expect(document.body.querySelector('.nmorph-media-gallery__file-size')).toBeFalsy();
    expect(document.body.querySelector('.nmorph-media-gallery__file-actions')).toBeFalsy();

    video.dispatchEvent(new Event('loadeddata'));
    await nextTick();

    expect(document.body.querySelector('button.nmorph-media-gallery__play')).toBeFalsy();

    wrapper.unmount();
    target.remove();
  });

  it('closes media gallery from backdrop and Escape key', async () => {
    const wrapper = mount(NmorphMediaGallery, {
      props: {
        modelValue: true,
        items: [{ kind: 'image' as const, src: imageSrc, name: 'photo.jpg' }],
      },
    });

    await nextTick();

    await wrapper.find('.nmorph-overlay').trigger('click');

    expect(wrapper.emitted('update:model-value')?.at(-1)).toEqual([false]);

    await wrapper.setProps({ modelValue: true });
    await nextTick();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await nextTick();

    expect(wrapper.emitted('update:model-value')?.at(-1)).toEqual([false]);
    wrapper.unmount();
  });

  it('pauses media gallery video when changing media and closing gallery', async () => {
    const target = document.createElement('div');
    document.body.appendChild(target);
    const items = [
      { kind: 'image' as const, src: imageSrc, name: 'photo.jpg' },
      { kind: 'video' as const, src: 'blob:clip', name: 'clip.mp4' },
    ];

    const wrapper = mount(NmorphMediaGallery, {
      props: {
        modelValue: true,
        items,
        initialIndex: 1,
      },
      attachTo: target,
      global: {
        stubs: {
          Teleport: false,
        },
      },
    });

    await nextTick();

    const firstVideo = document.body.querySelector('.nmorph-media-gallery__video') as HTMLVideoElement;
    const pauseOnChange = vi.fn();

    Object.defineProperty(firstVideo, 'pause', {
      configurable: true,
      value: pauseOnChange,
    });

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    await nextTick();

    expect(pauseOnChange).toHaveBeenCalledTimes(1);
    expect(document.body.querySelector('.nmorph-media-gallery .nmorph-image img')).toBeTruthy();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    await nextTick();

    const secondVideo = document.body.querySelector('.nmorph-media-gallery__video') as HTMLVideoElement;
    const pauseOnClose = vi.fn();

    Object.defineProperty(secondVideo, 'pause', {
      configurable: true,
      value: pauseOnClose,
    });

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await nextTick();

    expect(pauseOnClose).toHaveBeenCalledTimes(1);
    expect(wrapper.emitted('update:model-value')).toEqual([[false]]);
    expect(wrapper.emitted('close')).toHaveLength(1);

    wrapper.unmount();
    target.remove();
  });
});
