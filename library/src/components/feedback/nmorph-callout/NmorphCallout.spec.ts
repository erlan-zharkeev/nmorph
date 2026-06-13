import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { defineComponent, nextTick } from 'vue';
import { NmorphCallout } from '@/components';

describe('NmorphCallout', () => {
  it('renders slotted callout content without using legacy content html', async () => {
    const wrapper = mount(
      defineComponent({
        components: { NmorphCallout },
        data: () => ({
          host: 'example.com',
          title: '<img src=x onerror=alert(1)>',
          description: '<strong>External description</strong>',
        }),
        template: `
          <NmorphCallout title="Ignored title" content="<strong class='legacy-content'>Legacy</strong>">
            <template #title>{{ host }}</template>
            <strong class="preview-title">{{ title }}</strong>
            <small class="preview-description">{{ description }}</small>
          </NmorphCallout>
        `,
      })
    );

    await nextTick();

    expect(wrapper.find('.legacy-content').exists()).toBe(false);
    expect(wrapper.find('.nmorph-callout__title').text()).toBe('example.com');
    expect(wrapper.find('.preview-title').text()).toBe('<img src=x onerror=alert(1)>');
    expect(wrapper.find('.preview-title img').exists()).toBe(false);
    expect(wrapper.find('.preview-description').text()).toBe('<strong>External description</strong>');
    expect(wrapper.find('.preview-description strong').exists()).toBe(false);

    wrapper.unmount();
  });

  it('can render callout root as an external anchor', async () => {
    const wrapper = mount(NmorphCallout, {
      props: {
        as: 'a',
        href: 'https://example.com/preview',
        target: 'blank',
        rel: 'noopener noreferrer nofollow ugc',
        referrerpolicy: 'no-referrer',
        type: 'info',
      },
      slots: {
        default: '<div class="preview-card">Preview</div>',
      },
    });

    await nextTick();

    const callout = wrapper.find('.nmorph-callout');

    expect(callout.element.tagName).toBe('A');
    expect(callout.attributes('href')).toBe('https://example.com/preview');
    expect(callout.attributes('target')).toBe('_blank');
    expect(callout.attributes('rel')).toBe('noopener noreferrer nofollow ugc');
    expect(callout.attributes('referrerpolicy')).toBe('no-referrer');
    expect(wrapper.find('.preview-card').exists()).toBe(true);

    wrapper.unmount();
  });
});
