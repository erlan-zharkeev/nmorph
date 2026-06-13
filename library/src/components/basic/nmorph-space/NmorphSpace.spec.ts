import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { NmorphSpace } from '@/components';

describe('NmorphSpace', () => {
  it('forwards space layout variables and custom root tag', () => {
    const wrapper = mount(NmorphSpace, {
      props: {
        tag: 'nav',
        direction: 'column',
        size: 'large',
        align: 'end',
        justify: 'space-between',
        wrap: true,
        inline: true,
        fill: true,
      },
      slots: {
        default: '<button>One</button><button>Two</button>',
      },
    });

    const space = wrapper.find('.nmorph-space');
    const element = space.element as HTMLElement;

    expect(element.tagName).toBe('NAV');
    expect(space.classes()).toEqual(
      expect.arrayContaining([
        'nmorph-space--column',
        'nmorph-space--wrap',
        'nmorph-space--inline',
        'nmorph-space--fill',
      ])
    );
    expect(element.style.getPropertyValue('--nmorph-private-space-gap')).toBe('16px');
    expect(element.style.getPropertyValue('--nmorph-private-space-align')).toBe('flex-end');
    expect(element.style.getPropertyValue('--nmorph-private-space-justify')).toBe('space-between');

    wrapper.unmount();
  });
});
