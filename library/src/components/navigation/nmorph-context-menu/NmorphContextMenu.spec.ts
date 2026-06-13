import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { defineComponent, nextTick, ref } from 'vue';
import { NmorphContextMenu, NmorphIconSearch } from '@/components';
import { rect } from '@test/utils/components';

describe('NmorphContextMenu', () => {
  it('closes pointer context menu on scroll', async () => {
    const target = document.createElement('div');
    document.body.appendChild(target);

    const wrapper = mount(NmorphContextMenu, {
      attachTo: target,
      slots: {
        default: '<button class="context-target">Target</button>',
        menu: '<button class="context-action">Action</button>',
      },
      global: {
        stubs: {
          Teleport: false,
        },
      },
    });

    await wrapper.find('.context-target').trigger('contextmenu', { clientX: 100, clientY: 80 });
    await nextTick();
    await nextTick();

    expect(document.body.querySelector('.nmorph-dropdown')).toBeTruthy();

    window.dispatchEvent(new Event('scroll'));
    await nextTick();

    expect(document.body.querySelector('.nmorph-dropdown')).toBeFalsy();

    wrapper.unmount();
    target.remove();
  });

  it('does not open the default context menu trigger from left click', async () => {
    const target = document.createElement('div');
    document.body.appendChild(target);

    const wrapper = mount(
      defineComponent({
        components: { NmorphContextMenu },
        setup() {
          const open = ref(false);

          return { open };
        },
        template: `
          <NmorphContextMenu v-model="open">
            <button class="context-target">Target</button>
            <template #menu>
              <button class="context-action">Action</button>
            </template>
          </NmorphContextMenu>
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

    await wrapper.find('.context-target').trigger('click', { button: 0 });
    await nextTick();
    await nextTick();

    expect(wrapper.vm.open).toBe(false);
    expect(document.body.querySelector('.nmorph-dropdown')).toBeFalsy();

    wrapper.unmount();
    target.remove();
  });

  it('opens context menu from right click and closes from Escape', async () => {
    const target = document.createElement('div');
    document.body.appendChild(target);

    const wrapper = mount(
      defineComponent({
        components: { NmorphContextMenu },
        setup() {
          const open = ref(false);

          return { open };
        },
        template: `
          <NmorphContextMenu v-model="open">
            <button class="context-target">Target</button>
            <template #menu>
              <button class="context-action">Action</button>
            </template>
          </NmorphContextMenu>
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

    await wrapper.find('.context-target').trigger('contextmenu', { clientX: 140, clientY: 90 });
    await nextTick();
    await nextTick();

    const dropdown = document.body.querySelector('.nmorph-dropdown') as HTMLElement;

    expect(wrapper.vm.open).toBe(true);
    expect(dropdown).toBeTruthy();

    vi.spyOn(dropdown, 'getBoundingClientRect').mockReturnValue(rect(0, 0, 120, 60));
    window.dispatchEvent(new Event('resize'));
    await nextTick();
    await nextTick();

    expect(dropdown.style.left).toBe('140px');
    expect(dropdown.style.top).toBe('90px');

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await nextTick();

    expect(wrapper.vm.open).toBe(false);

    wrapper.unmount();
    target.remove();
  });

  it('repositions an open context menu from repeated right click', async () => {
    const target = document.createElement('div');
    document.body.appendChild(target);

    const wrapper = mount(NmorphContextMenu, {
      attachTo: target,
      slots: {
        default: '<button class="context-target">Target</button>',
        menu: '<button class="context-action">Action</button>',
      },
      global: {
        stubs: {
          Teleport: false,
        },
      },
    });

    await wrapper.find('.context-target').trigger('contextmenu', { clientX: 100, clientY: 80 });
    await nextTick();
    await nextTick();

    const dropdown = document.body.querySelector('.nmorph-dropdown') as HTMLElement;

    expect(dropdown).toBeTruthy();

    vi.spyOn(dropdown, 'getBoundingClientRect').mockReturnValue(rect(0, 0, 120, 60));
    window.dispatchEvent(new Event('resize'));
    await nextTick();
    await nextTick();

    expect(dropdown.style.left).toBe('100px');
    expect(dropdown.style.top).toBe('80px');

    vi.spyOn(wrapper.find('.nmorph-context-menu').element, 'getBoundingClientRect').mockReturnValue(
      rect(80, 70, 180, 90)
    );

    const repeatedContextMenuEvent = new MouseEvent('contextmenu', {
      bubbles: true,
      cancelable: true,
      clientX: 180,
      clientY: 130,
      button: 2,
    });

    document.dispatchEvent(repeatedContextMenuEvent);
    await nextTick();
    await nextTick();
    await nextTick();

    expect(repeatedContextMenuEvent.defaultPrevented).toBe(true);
    expect(dropdown.style.left).toBe('180px');
    expect(dropdown.style.top).toBe('130px');

    wrapper.unmount();
    target.remove();
  });

  it('does not reposition an open context menu from right click outside the trigger', async () => {
    const target = document.createElement('div');
    document.body.appendChild(target);

    const wrapper = mount(NmorphContextMenu, {
      attachTo: target,
      slots: {
        default: '<button class="context-target">Target</button>',
        menu: '<button class="context-action">Action</button>',
      },
      global: {
        stubs: {
          Teleport: false,
        },
      },
    });

    await wrapper.find('.context-target').trigger('contextmenu', { clientX: 100, clientY: 80 });
    await nextTick();
    await nextTick();

    const dropdown = document.body.querySelector('.nmorph-dropdown') as HTMLElement;

    expect(dropdown).toBeTruthy();

    vi.spyOn(dropdown, 'getBoundingClientRect').mockReturnValue(rect(0, 0, 120, 60));
    vi.spyOn(wrapper.find('.nmorph-context-menu').element, 'getBoundingClientRect').mockReturnValue(
      rect(80, 70, 180, 90)
    );
    window.dispatchEvent(new Event('resize'));
    await nextTick();
    await nextTick();

    const outsideContextMenuEvent = new MouseEvent('contextmenu', {
      bubbles: true,
      cancelable: true,
      clientX: 320,
      clientY: 180,
      button: 2,
    });

    document.dispatchEvent(outsideContextMenuEvent);
    await nextTick();
    await nextTick();

    expect(outsideContextMenuEvent.defaultPrevented).toBe(false);
    expect(dropdown.style.left).toBe('100px');
    expect(dropdown.style.top).toBe('80px');

    wrapper.unmount();
    target.remove();
  });

  it('keeps context menu inside viewport edges', async () => {
    const target = document.createElement('div');
    document.body.appendChild(target);

    const wrapper = mount(NmorphContextMenu, {
      attachTo: target,
      slots: {
        default: '<button class="context-target">Target</button>',
        menu: '<button class="context-action">Action</button>',
      },
      global: {
        stubs: {
          Teleport: false,
        },
      },
    });

    const dropdownWidth = 120;
    const dropdownHeight = 60;
    const viewportMargin = 4;
    const clickX = window.innerWidth - 10;
    const clickY = window.innerHeight - 10;

    await wrapper.find('.context-target').trigger('contextmenu', { clientX: clickX, clientY: clickY });
    await nextTick();
    await nextTick();

    const dropdown = document.body.querySelector('.nmorph-dropdown') as HTMLElement;

    expect(dropdown).toBeTruthy();

    vi.spyOn(dropdown, 'getBoundingClientRect').mockReturnValue(rect(0, 0, dropdownWidth, dropdownHeight));
    window.dispatchEvent(new Event('resize'));
    await nextTick();
    await nextTick();

    expect(dropdown.style.left).toBe(`${window.innerWidth - dropdownWidth - viewportMargin}px`);
    expect(dropdown.style.top).toBe(`${clickY - dropdownHeight}px`);

    wrapper.unmount();
    target.remove();
  });

  it('opens context menu without v-model', async () => {
    const target = document.createElement('div');
    document.body.appendChild(target);

    const wrapper = mount(NmorphContextMenu, {
      attachTo: target,
      slots: {
        default: '<button class="context-target">Target</button>',
        menu: '<button class="context-action">Action</button>',
      },
      global: {
        stubs: {
          Teleport: false,
        },
      },
    });

    await wrapper.find('.context-target').trigger('contextmenu', { clientX: 100, clientY: 80 });
    await nextTick();
    await nextTick();

    const dropdown = document.body.querySelector('.nmorph-dropdown') as HTMLElement;

    expect(dropdown).toBeTruthy();
    expect(dropdown.classList.contains('nmorph-context-menu__dropdown')).toBe(true);
    expect(dropdown.style.getPropertyValue('--nmorph-private-dropdown-width')).toBe('max-content');

    wrapper.unmount();
    target.remove();
  });

  it('opens context menu from left click when trigger is click', async () => {
    const target = document.createElement('div');
    document.body.appendChild(target);

    const wrapper = mount(NmorphContextMenu, {
      attachTo: target,
      props: {
        trigger: 'click',
      },
      slots: {
        default: '<button class="context-target">Target</button>',
        menu: '<button class="context-action">Action</button>',
      },
      global: {
        stubs: {
          Teleport: false,
        },
      },
    });

    const root = wrapper.find('.nmorph-context-menu').element as HTMLElement;
    const rootRect = vi.spyOn(root, 'getBoundingClientRect').mockReturnValue(rect(120, 70, 90, 40));

    await wrapper.find('.context-target').trigger('click', { clientX: 120, clientY: 70, button: 0 });
    await nextTick();
    await nextTick();

    const dropdown = document.body.querySelector('.nmorph-dropdown') as HTMLElement;

    expect(dropdown).toBeTruthy();

    vi.spyOn(dropdown, 'getBoundingClientRect').mockReturnValue(rect(0, 0, 120, 60));
    window.dispatchEvent(new Event('resize'));
    await nextTick();
    await nextTick();

    expect(dropdown.style.left).toBe('120px');
    expect(dropdown.style.top).toBe('110px');

    rootRect.mockReturnValue(rect(120, 40, 90, 40));
    window.dispatchEvent(new Event('scroll'));
    await nextTick();
    await nextTick();

    expect(dropdown.style.left).toBe('120px');
    expect(dropdown.style.top).toBe('80px');

    wrapper.unmount();
    target.remove();
  });

  it('opens context menu through exposed manual helpers', async () => {
    const target = document.createElement('div');
    document.body.appendChild(target);

    const wrapper = mount(NmorphContextMenu, {
      attachTo: target,
      props: {
        trigger: 'manual',
      },
      slots: {
        default: '<button class="context-target">Target</button>',
        menu: '<button class="context-action">Action</button>',
      },
      global: {
        stubs: {
          Teleport: false,
        },
      },
    });

    const exposed = wrapper.vm as unknown as {
      openAt: (x: number, y: number, event?: Event) => void;
      openAtElement: (element: HTMLElement, event?: Event) => void;
      close: () => void;
    };

    await wrapper.find('.context-target').trigger('click', { button: 0 });
    await wrapper.find('.context-target').trigger('contextmenu', { clientX: 100, clientY: 80 });
    await nextTick();
    await nextTick();

    expect(document.body.querySelector('.nmorph-dropdown')).toBeFalsy();

    exposed.openAt(160, 110);
    await nextTick();
    await nextTick();

    let dropdown = document.body.querySelector('.nmorph-dropdown') as HTMLElement;
    expect(dropdown).toBeTruthy();

    vi.spyOn(dropdown, 'getBoundingClientRect').mockReturnValue(rect(0, 0, 120, 60));
    window.dispatchEvent(new Event('resize'));
    await nextTick();
    await nextTick();

    expect(dropdown.style.left).toBe('160px');
    expect(dropdown.style.top).toBe('110px');

    exposed.close();
    await nextTick();

    expect(document.body.querySelector('.nmorph-dropdown')).toBeFalsy();

    const root = wrapper.find('.nmorph-context-menu').element as HTMLElement;
    vi.spyOn(root, 'getBoundingClientRect').mockReturnValue(rect(40, 50, 100, 32));

    exposed.openAtElement(root, new Event('manual-open'));
    await nextTick();
    await nextTick();

    dropdown = document.body.querySelector('.nmorph-dropdown') as HTMLElement;
    expect(dropdown).toBeTruthy();

    vi.spyOn(dropdown, 'getBoundingClientRect').mockReturnValue(rect(0, 0, 120, 60));
    window.dispatchEvent(new Event('resize'));
    await nextTick();
    await nextTick();

    expect(dropdown.style.left).toBe('40px');
    expect(dropdown.style.top).toBe('82px');
    expect(wrapper.emitted('open')?.at(-1)).toEqual([expect.any(Event)]);

    wrapper.unmount();
    target.remove();
  });

  it('opens context menu from touch long press', async () => {
    vi.useFakeTimers();

    const target = document.createElement('div');
    document.body.appendChild(target);
    const createPointerEvent = (type: string, init: Partial<PointerEvent>) => {
      const event = new Event(type, { bubbles: true, cancelable: true });

      Object.entries(init).forEach(([key, value]) => {
        Object.defineProperty(event, key, {
          configurable: true,
          value,
        });
      });

      return event as PointerEvent;
    };

    const wrapper = mount(NmorphContextMenu, {
      attachTo: target,
      props: {
        trigger: 'longpress',
      },
      slots: {
        default: '<button class="context-target">Target</button>',
        menu: '<button class="context-action">Action</button>',
      },
      global: {
        stubs: {
          Teleport: false,
        },
      },
    });

    const trigger = wrapper.find('.context-target').element as HTMLElement;

    trigger.dispatchEvent(
      createPointerEvent('pointerdown', {
        clientX: 150,
        clientY: 95,
        pointerId: 1,
        pointerType: 'touch',
      })
    );
    trigger.dispatchEvent(
      createPointerEvent('pointermove', {
        clientX: 170,
        clientY: 95,
        pointerId: 1,
        pointerType: 'touch',
      })
    );
    vi.advanceTimersByTime(600);
    await nextTick();

    expect(document.body.querySelector('.nmorph-dropdown')).toBeFalsy();

    trigger.dispatchEvent(
      createPointerEvent('pointerdown', {
        clientX: 150,
        clientY: 95,
        pointerId: 2,
        pointerType: 'touch',
      })
    );
    vi.advanceTimersByTime(599);
    await nextTick();

    expect(document.body.querySelector('.nmorph-dropdown')).toBeFalsy();

    vi.advanceTimersByTime(1);
    await nextTick();
    await nextTick();

    const dropdown = document.body.querySelector('.nmorph-dropdown') as HTMLElement;
    expect(dropdown).toBeTruthy();

    vi.spyOn(dropdown, 'getBoundingClientRect').mockReturnValue(rect(0, 0, 120, 60));
    window.dispatchEvent(new Event('resize'));
    await nextTick();
    await nextTick();

    expect(dropdown.style.left).toBe('150px');
    expect(dropdown.style.top).toBe('95px');
    expect(wrapper.emitted('open')?.at(-1)?.[0]).toBeTruthy();

    wrapper.unmount();
    target.remove();
    vi.useRealTimers();
  });

  it('renders context menu options and emits select', async () => {
    const target = document.createElement('div');
    document.body.appendChild(target);
    const CustomOption = defineComponent({
      props: {
        label: String,
      },
      template: '<span class="custom-option">{{ label }}</span>',
    });
    const componentOption = {
      value: 'custom',
      component: CustomOption,
      componentProps: { label: 'Custom option' },
      closeOnClick: false,
    };

    const wrapper = mount(NmorphContextMenu, {
      attachTo: target,
      props: {
        trigger: 'click',
        options: [
          'Open',
          {
            label: 'Delete',
            color: 'var(--nmorph-error-text-color)',
            icon: NmorphIconSearch,
            shortcut: 'Del',
            description: 'Remove item',
          },
          componentOption,
        ],
      },
      slots: {
        default: '<button class="context-target">Target</button>',
      },
      global: {
        stubs: {
          Teleport: false,
        },
      },
    });

    vi.spyOn(wrapper.find('.nmorph-context-menu').element, 'getBoundingClientRect').mockReturnValue(
      rect(20, 30, 80, 32)
    );

    await wrapper.find('.context-target').trigger('click', { button: 0 });
    await nextTick();
    await nextTick();

    const items = Array.from(document.body.querySelectorAll<HTMLElement>('.nmorph-context-menu__item'));

    expect(items).toHaveLength(3);
    expect(items[0].textContent).toContain('Open');
    expect(items[1].style.getPropertyValue('--nmorph-private-context-menu-item-color')).toBe(
      'var(--nmorph-error-text-color)'
    );
    expect(items[1].querySelector('.nmorph-context-menu__item-icon')).toBeTruthy();
    expect(items[1].querySelector('.nmorph-context-menu__item-shortcut')?.textContent).toBe('Del');
    expect(items[1].querySelector('.nmorph-context-menu__item-description')?.textContent).toContain('Remove item');
    expect(document.body.querySelector('.custom-option')?.textContent).toBe('Custom option');

    items[2].click();
    await nextTick();

    expect(wrapper.emitted('select')?.[0]).toEqual([componentOption, 2]);
    expect(document.body.querySelector('.nmorph-dropdown')).toBeTruthy();

    items[0].click();
    await nextTick();

    expect(wrapper.emitted('select')?.[1]).toEqual(['Open', 0]);
    expect(document.body.querySelector('.nmorph-dropdown')).toBeFalsy();

    wrapper.unmount();
    target.remove();
  });

  it('renders context menu scoped item slot, sections, dividers and bottom sheet mode', async () => {
    const target = document.createElement('div');
    document.body.appendChild(target);

    const wrapper = mount(
      defineComponent({
        components: { NmorphContextMenu },
        setup() {
          const extendedOptions = [
            { type: 'section', label: 'Actions' },
            { label: 'Rename', value: 'rename', shortcut: 'R', description: 'Change name' },
            { type: 'divider' },
            { label: 'Delete', value: 'delete', disabled: true },
          ];

          return { extendedOptions };
        },
        template: `
          <NmorphContextMenu trigger="click" :options="extendedOptions" mobile-mode="bottom-sheet">
            <button class="context-target">Target</button>
            <template #item="{ option, disabled }">
              <span class="custom-context-item" :data-disabled="disabled">
                {{ option.label }} {{ option.shortcut }} {{ option.description }}
              </span>
            </template>
          </NmorphContextMenu>
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

    vi.spyOn(wrapper.find('.nmorph-context-menu').element, 'getBoundingClientRect').mockReturnValue(
      rect(20, 30, 80, 32)
    );

    await wrapper.find('.context-target').trigger('click', { button: 0 });
    await nextTick();
    await nextTick();

    const dropdown = document.body.querySelector('.nmorph-context-menu__dropdown') as HTMLElement;
    const customItems = Array.from(document.body.querySelectorAll<HTMLElement>('.custom-context-item'));

    expect(dropdown.classList.contains('nmorph-context-menu__dropdown--bottom-sheet')).toBe(true);
    expect(document.body.querySelector('.nmorph-context-menu__section')?.textContent).toContain('Actions');
    expect(document.body.querySelector('.nmorph-context-menu__divider')).toBeTruthy();
    expect(customItems).toHaveLength(2);
    expect(customItems[0].textContent).toContain('Rename');
    expect(customItems[0].textContent).toContain('R');
    expect(customItems[0].textContent).toContain('Change name');
    expect(customItems[1].dataset.disabled).toBe('true');

    wrapper.unmount();
    target.remove();
  });
});
