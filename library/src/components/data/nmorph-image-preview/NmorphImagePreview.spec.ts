import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { defineComponent, nextTick } from 'vue';
import { NmorphImagePreview } from '@/components';
import { imageSrc } from '@test/utils/components';

describe('NmorphImagePreview', () => {
  it('can hide image preview navigation buttons and action bar independently', async () => {
    const target = document.createElement('div');
    document.body.appendChild(target);

    const wrapper = mount(NmorphImagePreview, {
      props: {
        modelValue: true,
        src: [imageSrc, imageSrc],
        alt: 'Preview',
        showNavigationButtons: false,
        showActionBar: false,
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

    expect(document.body.querySelector('.nmorph-image-preview__left')).toBeFalsy();
    expect(document.body.querySelector('.nmorph-image-preview__right')).toBeFalsy();
    expect(document.body.querySelector('.nmorph-image-preview__actions')).toBeFalsy();

    await wrapper.setProps({ showNavigationButtons: true });
    await nextTick();

    expect(document.body.querySelector('.nmorph-image-preview__left')).toBeTruthy();
    expect(document.body.querySelector('.nmorph-image-preview__right')).toBeTruthy();
    expect(document.body.querySelector('.nmorph-image-preview__actions')).toBeFalsy();

    await wrapper.setProps({ showNavigationButtons: false, showActionBar: true });
    await nextTick();

    expect(document.body.querySelector('.nmorph-image-preview__left')).toBeFalsy();
    expect(document.body.querySelector('.nmorph-image-preview__right')).toBeFalsy();
    expect(document.body.querySelector('.nmorph-image-preview__actions')).toBeTruthy();

    wrapper.unmount();
    target.remove();
  });

  it('opens image preview from the trigger', async () => {
    const wrapper = mount(NmorphImagePreview, {
      props: { src: imageSrc, alt: 'Preview' },
    });

    await nextTick();
    await wrapper.find('.nmorph-image-preview__trigger').trigger('click');
    await nextTick();

    expect(wrapper.emitted('update:model-value')?.at(-1)).toEqual([true]);
    wrapper.unmount();
  });

  it('passes fit prop to the image preview trigger image', async () => {
    const wrapper = mount(NmorphImagePreview, {
      props: { src: imageSrc, alt: 'Preview', fit: 'contain' },
    });

    await nextTick();

    const image = wrapper.find('.nmorph-image').element as HTMLElement;

    expect(image.style.getPropertyValue('--nmorph-private-image-fit')).toBe('contain');

    wrapper.unmount();
  });

  it('renders image preview gallery trigger and opens the clicked image', async () => {
    const target = document.createElement('div');
    document.body.appendChild(target);
    const gallerySources = ['preview-one.png', 'preview-two.png', 'preview-three.png'];

    const wrapper = mount(NmorphImagePreview, {
      props: {
        src: gallerySources,
        alt: 'Gallery preview',
        triggerView: 'gallery',
        triggerLimit: 2,
        width: 40,
        height: 32,
      },
      attachTo: target,
      global: {
        stubs: {
          Teleport: false,
        },
      },
    });

    await nextTick();

    const thumbnails = wrapper.findAll('.nmorph-image-preview__trigger-item');

    expect(wrapper.find('.nmorph-image-preview').classes()).toContain('nmorph-image-preview--gallery-trigger');
    expect(thumbnails).toHaveLength(2);
    expect(wrapper.find('.nmorph-image-preview__trigger-more').text()).toBe('+1');

    await thumbnails[1].trigger('click');
    await nextTick();

    const previewImage = document.body.querySelector('.nmorph-image-preview__content img');

    expect(wrapper.emitted('update:model-value')?.at(-1)).toEqual([true]);
    expect(previewImage?.getAttribute('src')).toBe(gallerySources[1]);

    wrapper.unmount();
    target.remove();
  });

  it('keeps image preview transform state per image source', async () => {
    const target = document.createElement('div');
    document.body.appendChild(target);
    const gallerySources = ['preview-one.png', 'preview-two.png'];

    const wrapper = mount(NmorphImagePreview, {
      props: {
        modelValue: true,
        src: gallerySources,
        alt: 'Gallery preview',
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

    const getPreviewFrame = () =>
      document.body.querySelector<HTMLElement>('.nmorph-image-preview__content .nmorph-image');
    const getPreviewImage = () => document.body.querySelector<HTMLImageElement>('.nmorph-image-preview__content img');
    const getActionButtons = () =>
      Array.from(document.body.querySelectorAll<HTMLButtonElement>('.nmorph-image-preview__actions button'));

    expect(getPreviewImage()?.getAttribute('src')).toBe(gallerySources[0]);

    getActionButtons()[0].click();
    await nextTick();
    getActionButtons()[2].click();
    await nextTick();

    expect(getPreviewFrame()?.style.transform).toBe('rotate(90deg) scale(1.2)');

    document.body.querySelector<HTMLButtonElement>('.nmorph-image-preview__right button')?.click();
    await nextTick();

    expect(getPreviewImage()?.getAttribute('src')).toBe(gallerySources[1]);
    expect(getPreviewFrame()?.style.transform).toBe('rotate(0deg) scale(1)');

    getActionButtons()[2].click();
    await nextTick();

    expect(getPreviewFrame()?.style.transform).toBe('rotate(0deg) scale(1.2)');

    document.body.querySelector<HTMLButtonElement>('.nmorph-image-preview__left button')?.click();
    await nextTick();

    expect(getPreviewImage()?.getAttribute('src')).toBe(gallerySources[0]);
    expect(getPreviewFrame()?.style.transform).toBe('rotate(90deg) scale(1.2)');

    wrapper.unmount();
    target.remove();
  });

  it('mounts image preview portal only while preview is open', async () => {
    const target = document.createElement('div');
    document.body.appendChild(target);

    const wrapper = mount(
      defineComponent({
        components: { NmorphImagePreview },
        setup: () => ({ imageSrc }),
        template: `
          <div>
            <NmorphImagePreview :src="imageSrc" alt="Preview 1" />
            <NmorphImagePreview :src="imageSrc" alt="Preview 2" />
            <NmorphImagePreview :src="imageSrc" alt="Preview 3" />
          </div>
        `,
      }),
      {
        attachTo: target,
        global: {
          stubs: {
            Teleport: false,
          },
        },
      }
    );

    await nextTick();
    await nextTick();

    const getPortals = () => Array.from(document.body.querySelectorAll<HTMLElement>('.nmorph-image-preview__portal'));

    expect(getPortals()).toHaveLength(0);

    await wrapper.findAll('.nmorph-image-preview__trigger')[1].trigger('click');
    await nextTick();

    expect(getPortals()).toHaveLength(1);

    const overlay = getPortals()[0].querySelector<HTMLElement>('.nmorph-overlay');
    overlay?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await nextTick();

    expect(getPortals()).toHaveLength(0);

    wrapper.unmount();
    target.remove();
  });

  it('keeps image preview overlay controls inside preview portal', async () => {
    const target = document.createElement('div');
    document.body.appendChild(target);

    const wrapper = mount(NmorphImagePreview, {
      props: { modelValue: true, src: [imageSrc, imageSrc], alt: 'Preview' },
      attachTo: target,
      global: {
        stubs: {
          Teleport: false,
        },
      },
    });

    await nextTick();
    await nextTick();

    const portal = document.body.querySelector('.nmorph-image-preview__portal') as HTMLElement;
    const overlay = document.body.querySelector('.nmorph-overlay') as HTMLElement;
    const actions = document.body.querySelector('.nmorph-image-preview__actions') as HTMLElement;

    expect(portal).toBeTruthy();
    expect(overlay).toBeTruthy();
    expect(actions).toBeTruthy();
    expect(portal.contains(overlay)).toBe(true);
    expect(portal.contains(actions)).toBe(true);

    wrapper.unmount();
    target.remove();
  });

  it('navigates image preview with keyboard arrows', async () => {
    const target = document.createElement('div');
    document.body.appendChild(target);
    const gallerySources = ['preview-one.png', 'preview-two.png', 'preview-three.png'];

    const wrapper = mount(NmorphImagePreview, {
      props: {
        modelValue: true,
        src: gallerySources,
        initialIndex: 1,
        alt: 'Preview',
        showNavigationButtons: false,
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

    const getPreviewImage = () => document.body.querySelector('.nmorph-image-preview__content img');

    expect(getPreviewImage()?.getAttribute('src')).toBe(gallerySources[1]);
    expect(document.body.querySelector('.nmorph-image-preview__left')).toBeFalsy();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    await nextTick();

    expect(getPreviewImage()?.getAttribute('src')).toBe(gallerySources[2]);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    await nextTick();

    expect(getPreviewImage()?.getAttribute('src')).toBe(gallerySources[0]);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    await nextTick();

    expect(getPreviewImage()?.getAttribute('src')).toBe(gallerySources[2]);

    wrapper.unmount();
    target.remove();
  });

  it('does not force focus to image preview controls when opened', async () => {
    const target = document.createElement('div');
    const focusedBeforeOpen = document.createElement('button');
    document.body.appendChild(focusedBeforeOpen);
    document.body.appendChild(target);
    focusedBeforeOpen.focus();

    const wrapper = mount(NmorphImagePreview, {
      props: { modelValue: true, src: imageSrc, alt: 'Preview' },
      attachTo: target,
      global: {
        stubs: {
          Teleport: false,
        },
      },
    });

    await nextTick();
    await nextTick();

    const firstActionButton = document.body.querySelector('.nmorph-image-preview__actions button');

    expect(firstActionButton).toBeTruthy();
    expect(document.activeElement).toBe(focusedBeforeOpen);
    expect(document.activeElement).not.toBe(firstActionButton);

    wrapper.unmount();
    target.remove();
    focusedBeforeOpen.remove();
  });

  it('closes image preview from backdrop and Escape key', async () => {
    const wrapper = mount(NmorphImagePreview, {
      props: { modelValue: true, src: imageSrc, alt: 'Preview' },
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
});
