import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { NmorphAudioMeter } from '@/components';

describe('NmorphAudioMeter', () => {
  it('renders audio meter variants with meter semantics and threshold state', () => {
    const wrapper = mount(NmorphAudioMeter, {
      props: {
        value: 0.75,
        variant: 'line',
        label: 'Mic level',
      },
    });

    const meter = wrapper.find('.nmorph-audio-meter');

    expect(meter.attributes('role')).toBe('meter');
    expect(meter.attributes('aria-label')).toBe('Mic level');
    expect(meter.attributes('aria-valuenow')).toBe('75');
    expect(meter.classes()).toEqual(expect.arrayContaining(['nmorph-audio-meter--line', 'nmorph-audio-meter--warn']));
    expect((meter.element as HTMLElement).style.getPropertyValue('--nmorph-private-audio-meter-percent')).toBe('75%');

    wrapper.unmount();
  });
});
