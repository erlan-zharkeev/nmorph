import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { NmorphTextarea } from '@/components';

describe('NmorphTextarea', () => {
  it('updates textarea value, forwards attrs, and resizes to content', async () => {
    const wrapper = mount(NmorphTextarea, {
      props: {
        modelValue: 'Initial',
        autoSize: true,
        textareaAttrs: {
          'aria-label': 'Message',
        },
      },
    });

    const textarea = wrapper.find('textarea');
    const element = textarea.element as HTMLTextAreaElement;

    expect(textarea.attributes('aria-label')).toBe('Message');

    await textarea.setValue('Updated');
    await textarea.trigger('focus');
    await textarea.trigger('keydown', { key: 'A' });
    await textarea.trigger('keyup.enter');
    await textarea.trigger('blur');

    expect(wrapper.emitted('update:model-value')?.at(-1)).toEqual(['Updated']);
    expect(wrapper.emitted('focus')).toHaveLength(1);
    expect(wrapper.emitted('blur')).toHaveLength(1);
    expect(wrapper.emitted('keydown')).toHaveLength(1);
    expect(wrapper.emitted('on-enter')).toHaveLength(1);

    Object.defineProperty(element, 'scrollHeight', {
      configurable: true,
      value: 96,
    });
    await (wrapper.vm as unknown as { resizeToContent: () => Promise<void> }).resizeToContent();

    expect(element.style.height).toBe('96px');
    expect(element.style.overflowY).toBe('hidden');

    wrapper.unmount();
  });
});
