import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { getCommonStyles } from '@/hooks/use-common-styles';
import { NmorphEmpty } from '@/components';

describe('NmorphEmpty', () => {
  it('renders empty action and forwards size variables', () => {
    const wrapper = mount(NmorphEmpty, {
      props: {
        title: 'No results',
        iconSize: 32,
        minHeight: '120px',
        padding: 12,
      },
      slots: {
        action: '<button>Create</button>',
      },
    });

    const empty = wrapper.find('.nmorph-empty').element as HTMLElement;

    expect(empty.style.getPropertyValue('--nmorph-private-empty-icon-size')).toBe('32px');
    expect(empty.style.getPropertyValue('--nmorph-private-empty-min-height')).toBe('120px');
    expect(empty.style.getPropertyValue('--nmorph-private-empty-padding')).toBe('12px');
    expect(wrapper.find('.nmorph-empty__action button').text()).toBe('Create');

    wrapper.unmount();
  });

  it('keeps empty default padding token defined', () => {
    const wrapper = mount(NmorphEmpty);
    const empty = wrapper.find('.nmorph-empty').element as HTMLElement;

    expect(empty.style.getPropertyValue('--nmorph-private-empty-padding')).toBe('var(--indentation-05)');
    expect(getCommonStyles()).toContain('--indentation-05: 24px;');

    wrapper.unmount();
  });
});
