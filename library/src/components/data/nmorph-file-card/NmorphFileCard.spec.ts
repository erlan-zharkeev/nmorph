import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { h, nextTick } from 'vue';
import { NmorphFileCard } from '@/components';
import { setVideoBufferedState } from '@test/utils/components';

describe('NmorphFileCard', () => {
  it('can emit visual file preview without opening the internal gallery', async () => {
    const target = document.createElement('div');
    document.body.appendChild(target);

    const wrapper = mount(NmorphFileCard, {
      attachTo: target,
      global: {
        stubs: {
          Teleport: false,
        },
      },
      props: {
        name: 'clip.mp4',
        mimeType: 'video/mp4',
        previewSrc: 'blob:clip',
        mediaPreview: 'video',
        previewMode: 'emit',
      },
    });

    await nextTick();
    await wrapper.find('.nmorph-video-preview__action-button--preview').trigger('click');
    await nextTick();

    expect(wrapper.emitted('open')).toHaveLength(1);
    expect(document.body.querySelector('.nmorph-media-gallery__video')).toBeFalsy();

    wrapper.unmount();
    target.remove();
  });

  it('renders file card surface variants without requiring inner class overrides', async () => {
    const wrapper = mount(NmorphFileCard, {
      props: {
        name: 'very-long-file-name-that-should-still-use-the-standard-ellipsis-layout.pdf',
        mimeType: 'application/pdf',
        size: 4096,
        surface: 'soft',
        showExtensionBadge: false,
        iconSurface: false,
        compact: true,
      },
    });

    await nextTick();

    const card = wrapper.find('.nmorph-file-card');

    expect(card.classes()).toEqual(
      expect.arrayContaining(['nmorph-file-card--soft', 'nmorph-file-card--compact', 'nmorph-file-card--icon-plain'])
    );
    expect(card.classes()).not.toContain('nmorph-file-card--card');
    expect(wrapper.find('.nmorph-file-card__badge').exists()).toBe(false);
    expect(wrapper.find('.nmorph-file-card__icon').exists()).toBe(true);
    expect(
      (wrapper.find('.nmorph-file-card__icon > .nmorph-icon').element as HTMLElement).style.getPropertyValue(
        '--nmorph-private-icon-color'
      )
    ).toBe('');
    expect(wrapper.find('.nmorph-file-card__name').text()).toBe(
      'very-long-file-name-that-should-still-use-the-standard-ellipsis-layout.pdf'
    );

    wrapper.unmount();
  });

  it('keeps file card card surface and extension badge enabled by default', async () => {
    const wrapper = mount(NmorphFileCard, {
      props: {
        name: 'report.pdf',
        mimeType: 'application/pdf',
      },
    });

    await nextTick();

    expect(wrapper.find('.nmorph-file-card').classes()).toContain('nmorph-file-card--card');
    expect(wrapper.find('.nmorph-file-card').classes()).not.toContain('nmorph-file-card--icon-plain');
    expect(wrapper.find('.nmorph-file-card__badge').text()).toBe('pdf');

    wrapper.unmount();
  });

  it('shows a file card action loader while loading and removes it when no actions remain', async () => {
    const wrapper = mount(NmorphFileCard, {
      props: {
        name: 'voice-note.ogg',
        mimeType: 'audio/ogg',
        previewSrc: 'blob:voice',
        downloadHref: 'blob:voice',
        loading: true,
      },
    });

    await nextTick();

    expect(wrapper.find('.nmorph-file-card__actions').exists()).toBe(true);
    expect(wrapper.find('.nmorph-file-card__action-loader').exists()).toBe(true);
    expect(wrapper.find('.nmorph-file-card__action-loader').attributes('role')).toBe('status');
    expect(wrapper.find('.nmorph-file-card__action-loader').html()).toContain('animateTransform');
    expect(wrapper.find('.nmorph-file-card__icon').html()).not.toContain('animateTransform');
    expect(wrapper.findAll('.nmorph-file-card__actions .nmorph-file-card__action-link')).toHaveLength(0);

    await wrapper.setProps({ loading: false, previewSrc: '', downloadHref: '' });

    expect(wrapper.find('.nmorph-file-card__actions').exists()).toBe(false);
    expect(wrapper.find('.nmorph-file-card__action-loader').exists()).toBe(false);

    wrapper.unmount();
  });

  it('renders audio media preview inside the file card shell', async () => {
    const wrapper = mount(NmorphFileCard, {
      props: {
        name: 'voice-message.mp3',
        mimeType: 'audio/mpeg',
        size: 8192,
        previewSrc: 'blob:voice',
        downloadHref: 'blob:voice',
        mediaPreview: 'audio',
        surface: 'soft',
        showExtensionBadge: false,
        iconSurface: false,
        compact: true,
      },
    });

    await nextTick();

    const card = wrapper.find('.nmorph-file-card');
    const audioPreview = wrapper.find('.nmorph-file-card__audio-preview.nmorph-audio-preview');
    const audio = audioPreview.find('audio');
    const actionLinks = wrapper.findAll('.nmorph-file-card__actions .nmorph-file-card__action-link');

    expect(card.classes()).toEqual(
      expect.arrayContaining([
        'nmorph-file-card--soft',
        'nmorph-file-card--compact',
        'nmorph-file-card--media',
        'nmorph-file-card--media-audio',
      ])
    );
    expect(card.classes()).toContain('nmorph-file-card--icon-plain');
    expect(wrapper.find('.nmorph-file-card__name').text()).toBe('voice-message.mp3');
    expect(wrapper.find('.nmorph-file-card__meta').text()).toBe('mp3 · 8 KB');
    expect(wrapper.find('.nmorph-file-card__badge').exists()).toBe(false);
    expect(audioPreview.classes()).toEqual(
      expect.arrayContaining([
        'nmorph-audio-preview--plain',
        'nmorph-audio-preview--embedded',
        'nmorph-audio-preview--compact',
        'nmorph-audio-preview--no-icon',
        'nmorph-audio-preview--no-header',
        'nmorph-audio-preview--no-actions',
      ])
    );
    expect(audio.exists()).toBe(true);
    expect(audio.attributes('src')).toBe('blob:voice');
    expect(wrapper.find('button.nmorph-audio-preview__play-button').attributes('aria-label')).toBe(
      'Play voice-message.mp3'
    );
    expect(
      (
        wrapper.find('button.nmorph-audio-preview__play-button .nmorph-icon').element as HTMLElement
      ).style.getPropertyValue('--nmorph-private-icon-color')
    ).toBe('var(--nmorph-white-color)');
    expect(
      (
        wrapper.find('button.nmorph-audio-preview__play-button .nmorph-icon').element as HTMLElement
      ).style.getPropertyValue('--nmorph-private-icon-color')
    ).toBe('var(--nmorph-white-color)');
    expect(wrapper.find('.nmorph-audio-preview__range').exists()).toBe(true);
    expect(wrapper.find('.nmorph-audio-preview__actions').exists()).toBe(false);
    expect(wrapper.find('.nmorph-audio-preview__icon').exists()).toBe(false);
    expect(actionLinks).toHaveLength(1);
    expect(actionLinks[0].attributes('href')).toBe('blob:voice');
    expect(actionLinks[0].attributes('download')).toBe('voice-message.mp3');
    expect(wrapper.find('.nmorph-file-card__icon-action').exists()).toBe(false);

    wrapper.unmount();
  });

  it('can hide audio playback controls inside file card media preview', async () => {
    const wrapper = mount(NmorphFileCard, {
      props: {
        name: 'voice-message.mp3',
        mimeType: 'audio/mpeg',
        size: 8192,
        previewSrc: 'blob:voice',
        mediaPreview: 'audio',
        showPlaybackButton: false,
      },
    });

    await nextTick();

    expect(wrapper.find('.nmorph-audio-preview__play-button').exists()).toBe(false);
    expect(wrapper.find('.nmorph-audio-preview__play-indicator').exists()).toBe(false);

    wrapper.unmount();
  });

  it('renders video media preview inside the file card shell with shared title and metadata', async () => {
    const target = document.createElement('div');
    document.body.appendChild(target);

    const wrapper = mount(NmorphFileCard, {
      attachTo: target,
      global: {
        stubs: {
          Teleport: false,
        },
      },
      props: {
        name: 'clip.mp4',
        mimeType: 'video/mp4',
        size: 1048576,
        previewSrc: 'blob:clip',
        downloadHref: 'blob:clip',
        mediaPreview: 'video',
        surface: 'soft',
        showExtensionBadge: false,
        compact: true,
      },
    });

    await nextTick();

    const card = wrapper.find('.nmorph-file-card');
    const videoPreview = wrapper.find('.nmorph-file-card__video-preview.nmorph-video-preview');
    const video = videoPreview.find('video');
    const actionLinks = wrapper.findAll('.nmorph-file-card__actions .nmorph-file-card__action-link');

    expect(card.classes()).toEqual(
      expect.arrayContaining([
        'nmorph-file-card--soft',
        'nmorph-file-card--compact',
        'nmorph-file-card--media',
        'nmorph-file-card--media-video',
        'nmorph-file-card--media-visual',
      ])
    );
    expect(wrapper.find('.nmorph-file-card__name').text()).toBe('clip.mp4');
    expect(wrapper.find('.nmorph-file-card__meta').exists()).toBe(false);
    expect(wrapper.find('.nmorph-file-card__visual-size').text()).toBe('1 MB');
    expect(wrapper.find('.nmorph-file-card__icon').exists()).toBe(false);
    expect(wrapper.find('.nmorph-file-card__badge').exists()).toBe(false);
    expect(videoPreview.classes()).toEqual(
      expect.arrayContaining([
        'nmorph-video-preview--plain',
        'nmorph-video-preview--embedded',
        'nmorph-video-preview--compact',
        'nmorph-video-preview--no-meta',
      ])
    );
    expect(videoPreview.classes()).not.toContain('nmorph-video-preview--no-actions');
    expect(video.exists()).toBe(true);
    expect(video.attributes('src')).toBe('blob:clip');
    expect(video.attributes('controls')).toBeUndefined();
    expect(video.attributes('preload')).toBe('auto');
    expect(wrapper.find('.nmorph-video-preview__meta').exists()).toBe(false);
    expect(wrapper.find('button.nmorph-video-preview__play').exists()).toBe(false);

    await video.trigger('loadeddata');

    expect(wrapper.find('button.nmorph-video-preview__play').exists()).toBe(false);

    setVideoBufferedState(video.element as HTMLVideoElement, { duration: 120, end: 120 });
    await video.trigger('progress');

    const playButton = wrapper.find('button.nmorph-video-preview__play');

    expect(playButton.exists()).toBe(true);
    expect(playButton.attributes('aria-label')).toBe('Play clip.mp4');
    expect(
      (playButton.find('.nmorph-icon').element as HTMLElement).style.getPropertyValue('--nmorph-private-icon-color')
    ).toBe('var(--nmorph-white-color)');
    expect(
      (playButton.find('.nmorph-icon').element as HTMLElement).style.getPropertyValue('--nmorph-private-icon-color')
    ).toBe('var(--nmorph-white-color)');
    expect(wrapper.find('.nmorph-video-preview__actions').exists()).toBe(true);
    expect(wrapper.findAll('.nmorph-video-preview__action-button')).toHaveLength(2);
    expect(wrapper.find('.nmorph-video-preview__action-button--preview').attributes('aria-label')).toBe(
      'Preview clip.mp4'
    );
    expect(wrapper.find('.nmorph-video-preview__action-button--fullscreen').attributes('aria-label')).toBe(
      'Fullscreen clip.mp4'
    );
    expect(wrapper.find('.nmorph-video-preview__action-link').exists()).toBe(false);
    expect(actionLinks).toHaveLength(1);
    expect(actionLinks[0].attributes('href')).toBe('blob:clip');
    expect(actionLinks[0].attributes('download')).toBe('clip.mp4');
    expect(wrapper.find('.nmorph-file-card__icon-action').exists()).toBe(false);

    await wrapper.find('.nmorph-video-preview__action-button--preview').trigger('click');
    await nextTick();

    const galleryVideo = document.body.querySelector('.nmorph-media-gallery__video');

    expect(wrapper.emitted('open')).toHaveLength(1);
    expect(galleryVideo?.getAttribute('src')).toBe('blob:clip');
    expect(galleryVideo?.hasAttribute('controls')).toBe(true);
    expect(document.body.querySelector('button.nmorph-media-gallery__play')).toBeFalsy();

    wrapper.unmount();
    target.remove();
  });

  it('applies file card height and can hide visual info and media buttons', async () => {
    const wrapper = mount(NmorphFileCard, {
      props: {
        name: 'clip.mp4',
        mimeType: 'video/mp4',
        size: 1048576,
        previewSrc: 'blob:clip',
        downloadHref: 'blob:clip',
        mediaPreview: 'video',
        height: 150,
        showName: false,
        showSize: false,
        showDefaultActions: false,
        showPlaybackButton: false,
      },
    });

    await nextTick();

    const card = wrapper.find('.nmorph-file-card');
    const videoPreview = wrapper.find('.nmorph-file-card__video-preview.nmorph-video-preview');
    const video = wrapper.find('video');

    expect(card.element.style.getPropertyValue('--nmorph-private-file-card-height')).toBe('150px');
    expect(card.element.style.getPropertyValue('--nmorph-private-file-card-media-height')).toBe('150px');
    expect(videoPreview.element.style.getPropertyValue('--nmorph-private-video-preview-height')).toBe('150px');
    expect(wrapper.find('.nmorph-file-card__info').exists()).toBe(false);
    expect(wrapper.find('.nmorph-file-card__visual-size').exists()).toBe(false);
    expect(wrapper.find('.nmorph-file-card__actions').exists()).toBe(false);
    expect(wrapper.find('.nmorph-video-preview__actions').exists()).toBe(false);

    await video.trigger('loadeddata');

    expect(wrapper.find('button.nmorph-video-preview__play').exists()).toBe(false);

    wrapper.unmount();
  });

  it('renders image media preview inside the file card shell with shared title and metadata', async () => {
    const target = document.createElement('div');
    document.body.appendChild(target);

    const wrapper = mount(NmorphFileCard, {
      attachTo: target,
      global: {
        stubs: {
          Teleport: false,
        },
      },
      props: {
        name: 'photo.jpg',
        mimeType: 'image/jpeg',
        size: 12345,
        previewSrc: 'blob:photo',
        downloadHref: 'blob:photo-download',
        mediaPreview: 'image',
        surface: 'soft',
        showExtensionBadge: false,
        iconSurface: false,
        compact: true,
      },
    });

    await nextTick();

    const card = wrapper.find('.nmorph-file-card');
    const imagePreviewFrame = wrapper.find('.nmorph-file-card__image-preview');
    const image = imagePreviewFrame.find('img');
    const actionLinks = wrapper.findAll('.nmorph-file-card__actions .nmorph-file-card__action-link');

    expect(card.classes()).toEqual(
      expect.arrayContaining([
        'nmorph-file-card--soft',
        'nmorph-file-card--compact',
        'nmorph-file-card--media',
        'nmorph-file-card--media-image',
        'nmorph-file-card--media-visual',
        'nmorph-file-card--icon-plain',
      ])
    );
    expect(wrapper.find('.nmorph-file-card__name').text()).toBe('photo.jpg');
    expect(wrapper.find('.nmorph-file-card__meta').exists()).toBe(false);
    expect(wrapper.find('.nmorph-file-card__visual-size').text()).toBe('12 KB');
    expect(wrapper.find('.nmorph-file-card__icon').exists()).toBe(false);
    expect(wrapper.find('.nmorph-file-card__badge').exists()).toBe(false);
    expect(imagePreviewFrame.attributes('title')).toBe('photo.jpg');
    expect(imagePreviewFrame.attributes('type')).toBe('button');
    expect(imagePreviewFrame.attributes('aria-label')).toBe('Preview photo.jpg');
    expect(image.attributes('src')).toBe('blob:photo');
    expect(image.attributes('alt')).toBe('photo.jpg');
    expect(actionLinks).toHaveLength(1);
    expect(actionLinks[0].attributes('href')).toBe('blob:photo-download');
    expect(actionLinks[0].attributes('download')).toBe('photo.jpg');

    await imagePreviewFrame.trigger('click');
    await nextTick();

    const galleryImage = document.body.querySelector('.nmorph-media-gallery .nmorph-image img');

    expect(wrapper.emitted('open')).toHaveLength(1);
    expect(galleryImage?.getAttribute('src')).toBe('blob:photo');
    expect(galleryImage?.getAttribute('alt')).toBe('photo.jpg');

    wrapper.unmount();
    target.remove();
  });

  it('falls back to regular file card when audio media preview has no preview source', async () => {
    const wrapper = mount(NmorphFileCard, {
      props: {
        name: 'voice-message.mp3',
        mimeType: 'audio/mpeg',
        mediaPreview: 'audio',
      },
    });

    await nextTick();

    const card = wrapper.find('.nmorph-file-card');

    expect(card.classes()).not.toContain('nmorph-file-card--media-audio');
    expect(wrapper.find('.nmorph-file-card__audio-preview').exists()).toBe(false);
    expect(wrapper.find('.nmorph-file-card__actions').exists()).toBe(false);
    expect(wrapper.find('.nmorph-file-card__badge').text()).toBe('mp3');

    wrapper.unmount();
  });

  it('falls back to regular file card when video media preview has no preview source', async () => {
    const wrapper = mount(NmorphFileCard, {
      props: {
        name: 'clip.mp4',
        mimeType: 'video/mp4',
        mediaPreview: 'video',
      },
    });

    await nextTick();

    const card = wrapper.find('.nmorph-file-card');

    expect(card.classes()).not.toContain('nmorph-file-card--media-video');
    expect(wrapper.find('.nmorph-file-card__video-preview').exists()).toBe(false);
    expect(wrapper.find('.nmorph-file-card__actions').exists()).toBe(false);
    expect(wrapper.find('.nmorph-file-card__badge').text()).toBe('mp4');

    wrapper.unmount();
  });

  it('falls back to regular file card when image media preview has no preview source', async () => {
    const wrapper = mount(NmorphFileCard, {
      props: {
        name: 'photo.jpg',
        mimeType: 'image/jpeg',
        mediaPreview: 'image',
      },
    });

    await nextTick();

    const card = wrapper.find('.nmorph-file-card');

    expect(card.classes()).not.toContain('nmorph-file-card--media-image');
    expect(wrapper.find('.nmorph-file-card__image-preview').exists()).toBe(false);
    expect(wrapper.find('.nmorph-file-card__actions').exists()).toBe(false);
    expect(wrapper.find('.nmorph-file-card__badge').text()).toBe('jpg');

    wrapper.unmount();
  });

  it('lets the actions slot override default actions in image media preview mode', async () => {
    const wrapper = mount(NmorphFileCard, {
      props: {
        name: 'photo.jpg',
        mimeType: 'image/jpeg',
        previewSrc: 'blob:photo',
        downloadHref: 'blob:photo-download',
        mediaPreview: 'image',
      },
      slots: {
        actions: '<button class="custom-file-action" type="button">Remove</button>',
      },
    });

    await nextTick();

    expect(wrapper.find('.nmorph-file-card').classes()).toContain('nmorph-file-card--custom-actions');
    expect(wrapper.find('.nmorph-file-card__image-preview').exists()).toBe(true);
    expect(wrapper.find('.custom-file-action').text()).toBe('Remove');
    expect(wrapper.findAll('.nmorph-file-card__actions .nmorph-file-card__action-link')).toHaveLength(0);

    wrapper.unmount();
  });

  it('lets the actions slot replace video media preview overlay actions', async () => {
    const wrapper = mount(NmorphFileCard, {
      props: {
        name: 'clip.mp4',
        mimeType: 'video/mp4',
        previewSrc: 'blob:clip',
        downloadHref: 'blob:clip-download',
        mediaPreview: 'video',
      },
      slots: {
        actions: ({ fileName }: { fileName: string }) =>
          h('button', { class: 'custom-file-action', type: 'button' }, `Remove ${fileName}`),
      },
    });

    await nextTick();

    expect(wrapper.find('.nmorph-file-card').classes()).toContain('nmorph-file-card--custom-actions');
    expect(wrapper.find('.custom-file-action').text()).toBe('Remove clip.mp4');
    expect(wrapper.find('.nmorph-video-preview__actions').exists()).toBe(false);
    expect(wrapper.findAll('.nmorph-file-card__actions .nmorph-file-card__action-link')).toHaveLength(0);

    wrapper.unmount();
  });

  it('renders pdf file preview action on the file icon', async () => {
    const wrapper = mount(NmorphFileCard, {
      props: {
        name: 'report.pdf',
        mimeType: 'application/pdf',
        previewSrc: 'blob:report',
        downloadHref: 'blob:download-report',
      },
    });

    await nextTick();

    const iconAction = wrapper.find('.nmorph-file-card__icon-action');
    const defaultActions = wrapper.findAll('.nmorph-file-card__actions .nmorph-file-card__action-link');

    expect(iconAction.exists()).toBe(true);
    expect(iconAction.attributes('href')).toBe('blob:report');
    expect(iconAction.attributes('target')).toBe('_blank');
    expect(iconAction.attributes('rel')).toBe('noopener noreferrer');
    expect(
      (wrapper.find('.nmorph-file-card__icon > .nmorph-icon').element as HTMLElement).style.getPropertyValue(
        '--nmorph-private-icon-color'
      )
    ).toBe('');
    expect(
      (iconAction.find('.nmorph-icon').element as HTMLElement).style.getPropertyValue('--nmorph-private-icon-color')
    ).toBe('var(--nmorph-white-color)');
    expect(
      (iconAction.find('.nmorph-icon').element as HTMLElement).style.getPropertyValue('--nmorph-private-icon-color')
    ).toBe('var(--nmorph-white-color)');
    expect(defaultActions).toHaveLength(1);
    expect(defaultActions[0].attributes('href')).toBe('blob:download-report');
    expect(defaultActions[0].attributes('download')).toBe('report.pdf');

    iconAction.element.addEventListener('click', (event) => event.preventDefault());
    await iconAction.trigger('click');

    expect(wrapper.emitted('open')).toHaveLength(1);

    wrapper.unmount();
  });

  it('keeps pdf preview on the icon when custom actions replace default actions', async () => {
    const wrapper = mount(NmorphFileCard, {
      props: {
        name: 'report.pdf',
        mimeType: 'application/pdf',
        previewSrc: 'blob:report',
        downloadHref: 'blob:download-report',
        compact: true,
      },
      slots: {
        actions: ({ fileName }: { fileName: string }) =>
          h('button', { class: 'custom-file-action', type: 'button' }, `Close ${fileName}`),
      },
    });

    await nextTick();

    const card = wrapper.find('.nmorph-file-card');
    const iconAction = wrapper.find('.nmorph-file-card__icon-action');

    expect(card.classes()).toContain('nmorph-file-card--compact');
    expect(card.classes()).toContain('nmorph-file-card--custom-actions');
    expect(iconAction.exists()).toBe(true);
    expect(iconAction.attributes('href')).toBe('blob:report');
    expect(wrapper.find('.custom-file-action').text()).toBe('Close report.pdf');
    expect(wrapper.findAll('.nmorph-file-card__actions .nmorph-file-card__action-link')).toHaveLength(0);

    iconAction.element.addEventListener('click', (event) => event.preventDefault());
    await iconAction.trigger('click');

    expect(wrapper.emitted('open')).toHaveLength(1);

    wrapper.unmount();
  });

  it('uses download href as a pdf preview fallback when preview source is missing', async () => {
    const wrapper = mount(NmorphFileCard, {
      props: {
        name: 'report.pdf',
        mimeType: 'application/pdf',
        downloadHref: 'blob:download-report',
      },
    });

    await nextTick();

    const iconAction = wrapper.find('.nmorph-file-card__icon-action');
    const defaultActions = wrapper.findAll('.nmorph-file-card__actions .nmorph-file-card__action-link');

    expect(iconAction.exists()).toBe(true);
    expect(iconAction.attributes('href')).toBe('blob:download-report');
    expect(iconAction.attributes('target')).toBe('_blank');
    expect(iconAction.attributes('rel')).toBe('noopener noreferrer');
    expect(defaultActions).toHaveLength(1);
    expect(defaultActions[0].attributes('download')).toBe('report.pdf');

    iconAction.element.addEventListener('click', (event) => event.preventDefault());
    await iconAction.trigger('click');

    expect(wrapper.emitted('open')).toHaveLength(1);

    wrapper.unmount();
  });
});
