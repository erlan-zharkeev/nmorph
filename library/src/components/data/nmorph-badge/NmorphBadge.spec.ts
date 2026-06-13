import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { defineComponent, nextTick } from 'vue';
import { NmorphIcon, NmorphIconPin, NmorphBadge } from '@/components';

describe('NmorphBadge', () => {
  it('uses badge type as the primary display mode', async () => {
    const ribbon = mount(NmorphBadge, {
      props: {
        value: 'New',
        type: 'ribbon',
      },
      slots: {
        default: '<div>Card</div>',
      },
    });
    const tag = mount(NmorphBadge, {
      props: {
        value: 'Stable',
        type: 'tag',
        size: 'tiny',
      },
      slots: {
        default: '<button>Ignored</button>',
      },
    });
    const dot = mount(NmorphBadge, {
      props: {
        type: 'dot',
      },
      slots: {
        default: '<button>Dot</button>',
      },
    });

    await nextTick();

    expect(ribbon.find('.nmorph-badge__ribbon-frame').exists()).toBe(true);
    expect(ribbon.find('.nmorph-badge__dot').exists()).toBe(false);
    expect(ribbon.find('.nmorph-badge').classes()).not.toContain('nmorph-badge--tag');

    expect(tag.find('.nmorph-badge').classes()).toContain('nmorph-badge--tag');
    expect(tag.find('.nmorph-badge').classes()).toContain('nmorph-badge--tiny');
    expect(tag.text()).toContain('Stable');
    expect(tag.text()).not.toContain('Ignored');

    expect(dot.find('.nmorph-badge__dot').exists()).toBe(true);
    expect(
      (dot.find('.nmorph-badge').element as HTMLElement).style.getPropertyValue('--nmorph-private-badge-dot-size')
    ).toBe('');

    ribbon.unmount();
    tag.unmount();
    dot.unmount();
  });

  it('can hide the badge when value is falsy', async () => {
    const visibleZero = mount(NmorphBadge, {
      props: {
        value: 0,
      },
      slots: {
        default: '<button>Inbox</button>',
      },
    });
    const hiddenZero = mount(NmorphBadge, {
      props: {
        value: 0,
        hideOnFalsyValue: true,
      },
      slots: {
        default: '<button>Inbox</button>',
      },
    });

    expect(visibleZero.find('.nmorph-badge__container').exists()).toBe(true);
    expect(visibleZero.text()).toContain('0');
    expect(hiddenZero.find('.nmorph-badge__container').exists()).toBe(false);
    expect(hiddenZero.text()).toBe('Inbox');

    visibleZero.unmount();
    hiddenZero.unmount();
  });

  it('renders ribbon badge in the selected corner', async () => {
    const wrapper = mount(NmorphBadge, {
      props: {
        value: 'New',
        type: 'ribbon',
        ribbonCorner: 'bottom-left',
        offsetX: -6,
        offsetY: 8,
      },
      slots: {
        default: '<div>Card</div>',
      },
    });

    await nextTick();

    const badge = wrapper.find('.nmorph-badge').element as HTMLElement;

    expect(badge.style.getPropertyValue('--nmorph-private-badge-ribbon-offset-x')).toBe('-6px');
    expect(badge.style.getPropertyValue('--nmorph-private-badge-ribbon-offset-y')).toBe('8px');
    expect(wrapper.find('.nmorph-badge__ribbon-frame').exists()).toBe(true);
    expect(wrapper.find('.nmorph-badge__ribbon-corner').classes()).toContain(
      'nmorph-badge__ribbon-corner--bottom-left'
    );
    expect(wrapper.find('.nmorph-badge__container').classes()).toContain('nmorph-badge__container--ribbon-bottom-left');

    wrapper.unmount();
  });

  it('can render ribbon badge flat in the selected corner', async () => {
    const wrapper = mount(NmorphBadge, {
      props: {
        value: 'Flat',
        type: 'ribbon',
        ribbonCorner: 'top-right',
        ribbonTilt: false,
        offsetX: 12,
        offsetY: 4,
      },
      slots: {
        default: '<div>Card</div>',
      },
    });

    await nextTick();

    const badge = wrapper.find('.nmorph-badge').element as HTMLElement;
    const ribbonCorner = wrapper.find('.nmorph-badge__ribbon-corner');

    expect(badge.style.getPropertyValue('--nmorph-private-badge-ribbon-offset-x')).toBe('12px');
    expect(badge.style.getPropertyValue('--nmorph-private-badge-ribbon-offset-y')).toBe('4px');
    expect(ribbonCorner.classes()).toContain('nmorph-badge__ribbon-corner--top-right');
    expect(ribbonCorner.classes()).toContain('nmorph-badge__ribbon-corner--flat');

    wrapper.unmount();
  });

  it('renders custom value slot inside tag badge without overlay positioning', async () => {
    const wrapper = mount(
      defineComponent({
        components: { NmorphBadge, NmorphIcon, NmorphIconPin },
        template: `
          <NmorphBadge type="tag" size="tiny" color="var(--nmorph-accent-color)" :value="''">
            <template #value>
              <NmorphIcon>
                <NmorphIconPin />
              </NmorphIcon>
            </template>
          </NmorphBadge>
        `,
      })
    );

    await nextTick();

    expect(wrapper.find('.nmorph-badge').classes()).toContain('nmorph-badge--tag');
    expect(wrapper.find('.nmorph-badge__container').classes()).toContain('nmorph-badge__container--tag');
    expect(wrapper.find('.nmorph-badge__content').classes()).toContain('nmorph-badge__content--custom');
    expect(wrapper.find('.nmorph-icon').exists()).toBe(true);
    expect(wrapper.text()).toBe('');

    wrapper.unmount();
  });

  it('applies extended badge size modifiers', async () => {
    const sizes = ['medium', 'large', 'extra-large'] as const;

    for (const size of sizes) {
      const wrapper = mount(NmorphBadge, {
        props: {
          value: 'Size',
          size,
        },
      });

      expect(wrapper.find('.nmorph-badge').classes()).toContain(`nmorph-badge--${size}`);

      wrapper.unmount();
    }
  });
});
