import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { defineComponent, nextTick, ref } from 'vue';
import { NmorphDialog } from '@/components';

describe('NmorphDialog', () => {
  it('keeps dialog content scrollable inside a constrained dialog', async () => {
    const wrapper = mount(NmorphDialog, {
      props: {
        modelValue: true,
        width: '960px',
        maxHeight: '240px',
      },
      slots: {
        default: '<div style="height: 600px;">Tall content</div>',
      },
      global: {
        stubs: {
          Teleport: true,
        },
      },
    });

    await nextTick();

    const dialog = wrapper.find('.nmorph-dialog').element as HTMLElement;

    expect(dialog.style.getPropertyValue('--nmorph-private-dialog-width')).toBe('960px');
    expect(dialog.style.getPropertyValue('--nmorph-private-dialog-max-height')).toBe('240px');
    expect(wrapper.find('.nmorph-dialog__header').exists()).toBe(true);
    expect(wrapper.find('.nmorph-dialog__content').exists()).toBe(true);

    wrapper.unmount();
  });

  it('traps dialog focus and closes from Escape', async () => {
    const wrapper = mount(
      defineComponent({
        components: { NmorphDialog },
        setup() {
          const open = ref(true);
          return { open };
        },
        template: `
          <NmorphDialog v-model="open" title="Dialog">
            <button class="first-action">First</button>
            <button class="last-action">Last</button>
          </NmorphDialog>
        `,
      }),
      {
        attachTo: document.body,
        global: {
          stubs: {
            Teleport: false,
          },
        },
      }
    );

    await nextTick();
    await nextTick();

    const closeButton = document.body.querySelector('.nmorph-dialog__close-icon') as HTMLButtonElement;
    const lastAction = document.body.querySelector('.last-action') as HTMLButtonElement;

    expect(document.activeElement).toBe(closeButton);

    lastAction.focus();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    await nextTick();

    expect(document.activeElement).toBe(closeButton);

    closeButton.focus();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true }));
    await nextTick();

    expect(document.activeElement).toBe(lastAction);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await nextTick();

    expect(wrapper.vm.open).toBe(false);
    wrapper.unmount();
  });
});
