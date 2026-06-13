import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { markRaw, nextTick } from 'vue';
import { NmorphMediaTile } from '@/components';

describe('NmorphMediaTile', () => {
  it('renders media tile fallback, state overlays and assigns srcObject to video', async () => {
    const descriptor = Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, 'srcObject');
    let assignedSrcObject: unknown = null;

    Object.defineProperty(HTMLMediaElement.prototype, 'srcObject', {
      configurable: true,
      get() {
        return assignedSrcObject;
      },
      set(value) {
        assignedSrcObject = value;
      },
    });

    try {
      const stream = { id: 'stream' } as MediaStream;
      const wrapper = mount(NmorphMediaTile, {
        props: {
          srcObject: stream,
          design: 'plain',
          aspect: 'fill',
          name: 'Ada Lovelace',
          fit: 'contain',
          mirrored: true,
          micMuted: true,
          screenSharing: true,
          selected: true,
          speaking: true,
        },
      });

      await nextTick();
      await nextTick();

      const tile = wrapper.find('.nmorph-media-tile');

      expect(tile.classes()).toEqual(
        expect.arrayContaining([
          'nmorph-media-tile--contain',
          'nmorph-media-tile--plain',
          'nmorph-media-tile--fill',
          'nmorph-media-tile--mirrored',
          'nmorph-media-tile--selected',
          'nmorph-media-tile--speaking',
          'nmorph-media-tile--screen-sharing',
        ])
      );
      expect(wrapper.find('video').exists()).toBe(true);
      expect(assignedSrcObject).toStrictEqual(stream);
      expect(wrapper.find('.nmorph-media-tile__status').exists()).toBe(true);
      const statusItems = wrapper.findAll('.nmorph-media-tile__status-item');
      expect(statusItems).toHaveLength(2);
      expect(statusItems.every((statusItem) => statusItem.classes().includes('nmorph-button--plain'))).toBe(true);

      await wrapper.setProps({ showStatus: false, videoOff: true });
      await nextTick();

      expect(wrapper.find('.nmorph-media-tile__fallback').text()).toContain('Ada Lovelace');
      expect(wrapper.find('.nmorph-media-tile__status').exists()).toBe(false);
      expect(wrapper.findAll('.nmorph-media-tile__status-item')).toHaveLength(0);

      await wrapper.setProps({ showStatus: true });
      await nextTick();

      expect(wrapper.find('.nmorph-media-tile__status').exists()).toBe(true);

      wrapper.unmount();
    } finally {
      if (descriptor) Object.defineProperty(HTMLMediaElement.prototype, 'srcObject', descriptor);
      else delete (HTMLMediaElement.prototype as HTMLMediaElement & { srcObject?: unknown }).srcObject;
    }
  });

  it('keeps media tile srcObject attached without relying on MediaStream track counters', async () => {
    const srcObjectDescriptor = Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, 'srcObject');
    const playDescriptor = Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, 'play');
    const assignedSrcObjects = new WeakMap<HTMLMediaElement, unknown>();
    const play = vi.fn().mockResolvedValue(undefined);

    Object.defineProperty(HTMLMediaElement.prototype, 'srcObject', {
      configurable: true,
      get() {
        return assignedSrcObjects.get(this);
      },
      set(value) {
        assignedSrcObjects.set(this, value);
      },
    });
    Object.defineProperty(HTMLMediaElement.prototype, 'play', {
      configurable: true,
      value: play,
    });

    try {
      const stream = markRaw({
        id: 'remote-stream',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      } as unknown as MediaStream);
      const wrapper = mount(NmorphMediaTile, {
        props: {
          srcObject: stream,
          muted: false,
          videoOff: true,
          name: 'Remote user',
        },
      });

      await nextTick();

      const video = wrapper.find('video').element as HTMLVideoElement;
      const audio = wrapper.find('audio').element as HTMLAudioElement;

      expect(wrapper.find('audio').exists()).toBe(true);
      expect(assignedSrcObjects.get(video)).toBe(stream);
      expect(assignedSrcObjects.get(audio)).toBe(stream);
      expect(video.muted).toBe(true);

      await wrapper.setProps({ videoOff: false });
      await nextTick();
      await nextTick();

      expect(assignedSrcObjects.get(video)).toBe(stream);
      expect(play).toHaveBeenCalled();

      await wrapper.setProps({ error: true });
      await nextTick();
      await nextTick();

      expect(wrapper.find('audio').exists()).toBe(false);
      expect(assignedSrcObjects.get(video)).toBe(stream);

      wrapper.unmount();
    } finally {
      if (srcObjectDescriptor) Object.defineProperty(HTMLMediaElement.prototype, 'srcObject', srcObjectDescriptor);
      else delete (HTMLMediaElement.prototype as HTMLMediaElement & { srcObject?: unknown }).srcObject;

      if (playDescriptor) Object.defineProperty(HTMLMediaElement.prototype, 'play', playDescriptor);
      else delete (HTMLMediaElement.prototype as HTMLMediaElement & { play?: unknown }).play;
    }
  });
});
