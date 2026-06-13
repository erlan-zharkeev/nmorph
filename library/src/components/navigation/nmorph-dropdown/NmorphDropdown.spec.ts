import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { defineComponent, nextTick, ref } from 'vue';
import { NmorphAutocomplete, NmorphSelect, NmorphSelectOption, NmorphTimePicker, NmorphDropdown } from '@/components';
import { options, rect } from '@test/utils/components';

describe('NmorphDropdown', () => {
  it('teleports dropdown overlay and closes from outside click', async () => {
    const target = document.createElement('div');
    document.body.appendChild(target);

    const wrapper = mount(
      defineComponent({
        components: { NmorphDropdown },
        setup() {
          const anchor = ref<HTMLElement | null>(null);
          const open = ref(true);

          return { anchor, open };
        },
        template: `
          <div class="isolated">
            <button ref="anchor">Anchor</button>
            <NmorphDropdown
              v-if="anchor"
              :open="open"
              :relative-element="anchor"
              placement="bottom-end"
              @on-outside-click="open = false"
            >
              <div class="dropdown-content">Dropdown</div>
            </NmorphDropdown>
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

    const dropdown = document.body.querySelector('.nmorph-dropdown') as HTMLElement;
    const overlay = document.body.querySelector('.nmorph-overlay') as HTMLElement;

    expect(dropdown).toBeTruthy();
    expect(overlay).toBeTruthy();
    expect(wrapper.element.contains(dropdown)).toBe(false);

    vi.spyOn(wrapper.find('button').element, 'getBoundingClientRect').mockReturnValue(rect(100, 40, 80, 30));
    vi.spyOn(dropdown, 'getBoundingClientRect').mockReturnValue(rect(0, 0, 120, 60));
    window.dispatchEvent(new Event('resize'));
    await nextTick();
    await nextTick();

    expect(dropdown.style.left).toBe('60px');
    expect(dropdown.style.top).toBe('70px');

    overlay.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await nextTick();

    expect(wrapper.vm.open).toBe(false);

    wrapper.unmount();
    target.remove();
  });

  it('closes dropdown from Escape', async () => {
    const wrapper = mount(
      defineComponent({
        components: { NmorphDropdown },
        setup() {
          const anchor = ref<HTMLElement | null>(null);
          const open = ref(true);

          return { anchor, open };
        },
        template: `
          <div>
            <button ref="anchor">Anchor</button>
            <NmorphDropdown
              v-if="anchor"
              :open="open"
              :relative-element="anchor"
              @on-escape-keydown="open = false"
            >
              <button>Dropdown action</button>
            </NmorphDropdown>
          </div>
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

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await nextTick();

    expect(wrapper.vm.open).toBe(false);
    wrapper.unmount();
  });

  it('aligns dropdown option heights with their form control thickness', async () => {
    const autocomplete = mount(NmorphAutocomplete, {
      props: {
        thickness: 'thick',
        list: options,
      },
    });

    await autocomplete.find('input').trigger('focus');
    await nextTick();

    expect(autocomplete.find('.nmorph-autocomplete__list-item').classes()).toContain('nmorph--thick-component');
    autocomplete.unmount();

    const select = mount(
      defineComponent({
        components: { NmorphSelect, NmorphSelectOption },
        template: `
          <NmorphSelect :open="true" thickness="thin" :model-value="''">
            <NmorphSelectOption value="first" label="First" />
          </NmorphSelect>
        `,
      })
    );

    await nextTick();

    expect(select.find('.nmorph-select-option').classes()).toContain('nmorph--thin-component');
    select.unmount();

    const timePicker = mount(NmorphTimePicker, {
      props: {
        thickness: 'thick',
      },
    });

    await timePicker.find('.nmorph-time-picker__input').trigger('click');
    await nextTick();

    expect(timePicker.find('.nmorph-time-picker__option').classes()).toContain('nmorph--thick-component');
    timePicker.unmount();
  });
});
