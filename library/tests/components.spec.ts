import { mount } from '@vue/test-utils';
import { createSSRApp, defineComponent, h, nextTick, reactive, ref } from 'vue';
import { renderToString } from '@vue/server-renderer';
import { describe, expect, it, vi } from 'vitest';
import { NmorphLibrary } from '../src/main';
import {
  NmorphAlert,
  NmorphAutocomplete,
  NmorphAvatar,
  NmorphBacktop,
  NmorphBadge,
  NmorphBreadcrumb,
  NmorphBreadcrumbItem,
  NmorphButton,
  NmorphCalendar,
  NmorphCallout,
  NmorphCard,
  NmorphCarousel,
  NmorphCarouselItem,
  NmorphCheckbox,
  NmorphCheckboxGroup,
  NmorphCollapse,
  NmorphCollapseItem,
  NmorphColorPicker,
  NmorphContextMenu,
  NmorphDatePicker,
  NmorphDialog,
  NmorphDivider,
  NmorphDropdown,
  NmorphFileUpload,
  NmorphForm,
  NmorphFormItem,
  NmorphIcon,
  NmorphIconSearch,
  NmorphImage,
  NmorphImagePreview,
  NmorphLink,
  NmorphNotificationProvider,
  NmorphNumberInput,
  NmorphOTPInput,
  NmorphOverlay,
  NmorphPagination,
  NmorphProgress,
  NmorphRadio,
  NmorphRadioGroup,
  NmorphScroll,
  NmorphSelect,
  NmorphSelectButton,
  NmorphSelectButtonItem,
  NmorphSelectOption,
  NmorphSkeleton,
  NmorphSkeletonItem,
  NmorphSlider,
  NmorphSwitch,
  NmorphTabPane,
  NmorphTable,
  NmorphTableCell,
  NmorphTableColumn,
  NmorphTabs,
  NmorphTagItem,
  NmorphTagList,
  NmorphTextInput,
  NmorphTooltip,
} from '../src/components';

const imageSrc =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22100%22 viewBox=%220 0 160 100%22%3E%3Crect width=%22160%22 height=%22100%22 fill=%22%23dfe8ef%22/%3E%3Ccircle cx=%2280%22 cy=%2250%22 r=%2232%22 fill=%22%23578bd6%22/%3E%3C/svg%3E';

const options = [
  { value: 'first', label: 'First' },
  { value: 'second', label: 'Second' },
];

const checkboxOptions = [
  { id: 'first', label: 'First' },
  { id: 'second', label: 'Second' },
];

const tableData = [{ name: 'Button', status: 'Ready' }];
const rect = (x: number, y: number, width: number, height: number) =>
  ({
    x,
    y,
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    toJSON: () => ({}),
  }) as DOMRect;

const createFormValue = () =>
  reactive({
    email: {
      value: '',
      rules: [(value) => (String(value).includes('@') ? true : 'Email is invalid')],
    },
  });

const renderCases = [
  {
    name: 'NmorphButton',
    component: NmorphButton,
    props: { text: 'Button' },
  },
  {
    name: 'NmorphIcon',
    component: defineComponent({
      components: { NmorphIcon, NmorphIconSearch },
      template: '<NmorphIcon><NmorphIconSearch /></NmorphIcon>',
    }),
  },
  {
    name: 'NmorphLink',
    component: NmorphLink,
    props: { href: '#', text: 'Link' },
  },
  {
    name: 'NmorphScroll',
    component: NmorphScroll,
    props: { height: '120px' },
    slots: { default: '<div style="height: 240px;">Scroll content</div>' },
  },
  {
    name: 'NmorphAvatar',
    component: NmorphAvatar,
    props: { name: 'Nmorph', size: 48 },
  },
  {
    name: 'NmorphBadge',
    component: NmorphBadge,
    props: { value: 3 },
    slots: { default: '<button>Inbox</button>' },
  },
  {
    name: 'NmorphCalendar',
    component: NmorphCalendar,
    props: { initialDate: new Date(2024, 0, 1), modelValue: new Date(2024, 0, 1) },
  },
  {
    name: 'NmorphCard',
    component: NmorphCard,
    slots: { header: 'Header', default: 'Content', footer: 'Footer' },
  },
  {
    name: 'NmorphCarousel',
    component: defineComponent({
      components: { NmorphCarousel, NmorphCarouselItem },
      template:
        '<NmorphCarousel :loop="false"><NmorphCarouselItem name="first">First</NmorphCarouselItem></NmorphCarousel>',
    }),
  },
  {
    name: 'NmorphCarouselItem',
    component: defineComponent({
      components: { NmorphCarousel, NmorphCarouselItem },
      template:
        '<NmorphCarousel :loop="false"><NmorphCarouselItem name="first">First</NmorphCarouselItem></NmorphCarousel>',
    }),
  },
  {
    name: 'NmorphCollapse',
    component: defineComponent({
      components: { NmorphCollapse, NmorphCollapseItem },
      template:
        '<NmorphCollapse :model-value="[\'first\']"><NmorphCollapseItem name="first" title="First" /></NmorphCollapse>',
    }),
  },
  {
    name: 'NmorphCollapseItem',
    component: defineComponent({
      components: { NmorphCollapse, NmorphCollapseItem },
      template:
        '<NmorphCollapse :model-value="[\'first\']"><NmorphCollapseItem name="first" title="First" /></NmorphCollapse>',
    }),
  },
  {
    name: 'NmorphImage',
    component: NmorphImage,
    props: { src: imageSrc, alt: 'Image' },
  },
  {
    name: 'NmorphImagePreview',
    component: NmorphImagePreview,
    props: { modelValue: true, src: [imageSrc], alt: 'Preview' },
  },
  {
    name: 'NmorphPagination',
    component: NmorphPagination,
    props: { totalElementsQuantity: 24, modelValue: 1, elementsQuantityOnPage: 8 },
  },
  {
    name: 'NmorphProgress',
    component: NmorphProgress,
    props: { percentage: 60 },
  },
  {
    name: 'NmorphSkeleton',
    component: defineComponent({
      components: { NmorphSkeleton, NmorphSkeletonItem },
      template:
        '<NmorphSkeleton loading><template #template><NmorphSkeletonItem variant="rect" width="120px" height="24px" /></template><div>Loaded</div></NmorphSkeleton>',
    }),
  },
  {
    name: 'NmorphSkeletonItem',
    component: NmorphSkeletonItem,
    props: { variant: 'rect', width: '120px', height: '24px' },
  },
  {
    name: 'NmorphTable',
    component: defineComponent({
      components: { NmorphTable, NmorphTableColumn },
      setup: () => ({ tableData }),
      template:
        '<NmorphTable :data="tableData"><NmorphTableColumn prop="name" label="Name" width="120" /></NmorphTable>',
    }),
  },
  {
    name: 'NmorphTableColumn',
    component: defineComponent({
      components: { NmorphTable, NmorphTableColumn },
      setup: () => ({ tableData }),
      template:
        '<NmorphTable :data="tableData"><NmorphTableColumn prop="name" label="Name" width="120" /></NmorphTable>',
    }),
  },
  {
    name: 'NmorphTableCell',
    component: defineComponent({
      components: { NmorphTable, NmorphTableColumn, NmorphTableCell },
      setup: () => ({ tableData }),
      template:
        '<NmorphTable :data="tableData"><NmorphTableColumn prop="name" label="Name" width="120"><NmorphTableCell :row="0">Custom cell</NmorphTableCell></NmorphTableColumn></NmorphTable>',
    }),
  },
  {
    name: 'NmorphTagList',
    component: NmorphTagList,
    props: { modelValue: [{ value: 'tag', text: 'Tag', removable: true }] },
  },
  {
    name: 'NmorphTagItem',
    component: NmorphTagItem,
    props: { value: 'tag', text: 'Tag' },
  },
  {
    name: 'NmorphAlert',
    component: NmorphAlert,
    props: { id: 'alert', type: 'info', title: 'Alert', content: 'Content' },
  },
  {
    name: 'NmorphCallout',
    component: NmorphCallout,
    props: { type: 'info', title: 'Callout', content: 'Content' },
  },
  {
    name: 'NmorphDialog',
    component: NmorphDialog,
    props: { modelValue: true, title: 'Dialog' },
    slots: { default: 'Dialog content' },
  },
  {
    name: 'NmorphTooltip',
    component: defineComponent({
      components: { NmorphButton, NmorphTooltip },
      template: '<NmorphTooltip text="Tooltip"><NmorphButton text="Hover" /></NmorphTooltip>',
    }),
  },
  {
    name: 'NmorphAutocomplete',
    component: NmorphAutocomplete,
    props: { modelValue: '', list: options, placeholder: 'Type' },
  },
  {
    name: 'NmorphCheckbox',
    component: NmorphCheckbox,
    props: { id: 'checkbox', modelValue: true, label: 'Checkbox' },
  },
  {
    name: 'NmorphCheckboxGroup',
    component: NmorphCheckboxGroup,
    props: { modelValue: ['first'], options: checkboxOptions },
  },
  {
    name: 'NmorphColorPicker',
    component: NmorphColorPicker,
    props: { modelValue: '#578bd6', showValue: true },
  },
  {
    name: 'NmorphDatePicker',
    component: NmorphDatePicker,
    props: { modelValue: new Date(2024, 0, 1), initialDate: new Date(2024, 0, 1) },
  },
  {
    name: 'NmorphFileUpload',
    component: NmorphFileUpload,
    props: { modelValue: [], buttonText: 'Select file' },
  },
  {
    name: 'NmorphForm',
    component: defineComponent({
      components: { NmorphForm, NmorphFormItem, NmorphTextInput },
      setup: () => ({ formValue: createFormValue() }),
      template:
        '<NmorphForm :value="formValue"><NmorphFormItem id="email" label="Email"><NmorphTextInput model-value="" /></NmorphFormItem></NmorphForm>',
    }),
  },
  {
    name: 'NmorphFormItem',
    component: defineComponent({
      components: { NmorphForm, NmorphFormItem, NmorphTextInput },
      setup: () => ({ formValue: createFormValue() }),
      template:
        '<NmorphForm :value="formValue"><NmorphFormItem id="email" label="Email"><NmorphTextInput model-value="" /></NmorphFormItem></NmorphForm>',
    }),
  },
  {
    name: 'NmorphNumberInput',
    component: NmorphNumberInput,
    props: { modelValue: 4, min: 0, max: 10 },
  },
  {
    name: 'NmorphOTPInput',
    component: NmorphOTPInput,
    props: { modelValue: '', length: 4 },
  },
  {
    name: 'NmorphRadio',
    component: NmorphRadio,
    props: { value: 'first', checked: true, label: 'Radio' },
  },
  {
    name: 'NmorphRadioGroup',
    component: NmorphRadioGroup,
    props: { modelValue: 'first', options },
  },
  {
    name: 'NmorphSelect',
    component: NmorphSelect,
    props: { modelValue: 'first', options },
  },
  {
    name: 'NmorphSelectOption',
    component: NmorphSelectOption,
    props: { value: 'first', label: 'First' },
    mountOptions: {
      global: {
        provide: {
          'select-selected-value': { value: 'first' },
          'select-change-selected-value': () => undefined,
        },
      },
    },
  },
  {
    name: 'NmorphSelectButton',
    component: NmorphSelectButton,
    props: { modelValue: 'first', options },
  },
  {
    name: 'NmorphSelectButtonItem',
    component: defineComponent({
      components: { NmorphSelectButton, NmorphSelectButtonItem },
      template:
        '<NmorphSelectButton model-value="first"><NmorphSelectButtonItem value="first">First</NmorphSelectButtonItem></NmorphSelectButton>',
    }),
  },
  {
    name: 'NmorphSlider',
    component: NmorphSlider,
    props: { modelValue: 40, min: 0, max: 100 },
  },
  {
    name: 'NmorphSwitch',
    component: NmorphSwitch,
    props: { modelValue: true },
  },
  {
    name: 'NmorphTextInput',
    component: NmorphTextInput,
    props: { modelValue: '', placeholder: 'Text', clearable: true },
  },
  {
    name: 'NmorphBacktop',
    component: NmorphBacktop,
    props: { visibilityHeight: 0 },
  },
  {
    name: 'NmorphBreadcrumb',
    component: defineComponent({
      components: { NmorphBreadcrumb, NmorphBreadcrumbItem },
      template:
        '<NmorphBreadcrumb><NmorphBreadcrumbItem to="/">Home</NmorphBreadcrumbItem><NmorphBreadcrumbItem to="/docs">Docs</NmorphBreadcrumbItem></NmorphBreadcrumb>',
    }),
  },
  {
    name: 'NmorphBreadcrumbItem',
    component: defineComponent({
      components: { NmorphBreadcrumb, NmorphBreadcrumbItem },
      template: '<NmorphBreadcrumb><NmorphBreadcrumbItem to="/">Home</NmorphBreadcrumbItem></NmorphBreadcrumb>',
    }),
  },
  {
    name: 'NmorphDropdown',
    component: defineComponent({
      components: { NmorphButton, NmorphDropdown },
      template:
        '<div><NmorphButton ref="anchor" text="Anchor" /><NmorphDropdown v-if="anchor" open :relative-element="anchor.$el || anchor">Dropdown</NmorphDropdown></div>',
      data: () => ({ anchor: null }),
    }),
  },
  {
    name: 'NmorphContextMenu',
    component: defineComponent({
      components: { NmorphContextMenu },
      template:
        '<NmorphContextMenu><button>Target</button><template #menu><button>Action</button></template></NmorphContextMenu>',
    }),
  },
  {
    name: 'NmorphTabs',
    component: defineComponent({
      components: { NmorphTabs, NmorphTabPane },
      template:
        '<NmorphTabs model-value="first"><NmorphTabPane name="first" label="First">First</NmorphTabPane></NmorphTabs>',
    }),
  },
  {
    name: 'NmorphTabPane',
    component: defineComponent({
      components: { NmorphTabs, NmorphTabPane },
      template:
        '<NmorphTabs model-value="first"><NmorphTabPane name="first" label="First">First</NmorphTabPane></NmorphTabs>',
    }),
  },
  {
    name: 'NmorphDivider',
    component: NmorphDivider,
  },
  {
    name: 'NmorphOverlay',
    component: NmorphOverlay,
    props: { show: true },
    slots: { default: 'Overlay content' },
  },
  {
    name: 'NmorphNotificationProvider',
    component: NmorphNotificationProvider,
    props: {
      notifications: [{ id: 'notification', type: 'info', title: 'Notification', content: 'Content' }],
    },
  },
];

const mountCase = async (renderCase) => {
  const target = document.createElement('div');
  document.body.appendChild(target);

  const wrapper = mount(renderCase.component, {
    props: renderCase.props,
    slots: renderCase.slots,
    attachTo: target,
    ...renderCase.mountOptions,
  });

  await nextTick();
  await nextTick();

  expect(wrapper.exists()).toBe(true);
  expect(wrapper.html().length).toBeGreaterThan(0);

  wrapper.unmount();
  target.remove();
};

describe('components', () => {
  it.each(renderCases)('renders $name', async (renderCase) => {
    await mountCase(renderCase);
  });

  it('keeps explicit icon color inside transparent button', () => {
    const wrapper = mount(
      defineComponent({
        components: { NmorphButton, NmorphIcon, NmorphIconSearch },
        template: `
          <NmorphButton style-type="transparent">
            <NmorphIcon color="var(--nmorph-contrast-text-color)">
              <NmorphIconSearch />
            </NmorphIcon>
          </NmorphButton>
        `,
      })
    );

    const icon = wrapper.find('.nmorph-icon').element as HTMLElement;

    expect(icon.style.getPropertyValue('--nmorph-icon-color')).toBe('var(--nmorph-contrast-text-color)');
    expect(icon.style.getPropertyValue('--color')).toBe('var(--nmorph-contrast-text-color)');

    wrapper.unmount();
  });

  it('keeps transparent button color prop and derives hover color from it', () => {
    const wrapper = mount(NmorphButton, {
      props: {
        styleType: 'transparent',
        color: 'var(--nmorph-error-text-color)',
        text: 'Delete',
      },
    });

    const button = wrapper.find('.nmorph-button').element as HTMLElement;

    expect(button.style.getPropertyValue('--nmorph-button-color')).toBe('var(--nmorph-error-text-color)');
    expect(button.style.getPropertyValue('--transparent-button-color')).toBe('var(--nmorph-error-text-color)');
    expect(button.style.getPropertyValue('--nmorph-button-hover-color')).toBe(
      'color-mix(in srgb, var(--nmorph-error-text-color) 75%, var(--nmorph-white-color))'
    );

    wrapper.unmount();
  });

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

    const firstAction = document.body.querySelector('.first-action') as HTMLButtonElement;
    const lastAction = document.body.querySelector('.last-action') as HTMLButtonElement;

    expect(document.activeElement).toBe(firstAction);

    lastAction.focus();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    await nextTick();

    expect(document.activeElement).toBe(firstAction);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await nextTick();

    expect(wrapper.vm.open).toBe(false);
    wrapper.unmount();
  });

  it('selects select options with keyboard navigation', async () => {
    const wrapper = mount(NmorphSelect, {
      props: { modelValue: '', options },
    });

    const select = wrapper.find('select');
    await select.trigger('keydown', { key: 'ArrowDown' });
    await select.trigger('keydown', { key: 'Enter' });
    await nextTick();

    expect(wrapper.emitted('update:model-value')?.at(-1)?.[0]).toBe('second');
    wrapper.unmount();
  });

  it('formats date picker display values with custom tokens', async () => {
    const wrapper = mount(NmorphDatePicker, {
      props: {
        modelValue: new Date(2024, 4, 9),
        initialDate: new Date(2024, 4, 9),
        dateFormat: 'DD.MM.YYYY',
      },
    });

    await nextTick();

    expect(wrapper.find('.nmorph-date-picker__selected-value').text()).toBe('09.05.2024');
    wrapper.unmount();
  });

  it('renders overlay and form components on the server', async () => {
    const currentDocument = globalThis.document;
    vi.stubGlobal('document', undefined);

    const app = createSSRApp(
      defineComponent({
        setup() {
          return () =>
            h(
              NmorphOverlay,
              { show: true, disabledTeleport: true },
              {
                default: () => [
                  h(NmorphSelect, { modelValue: 'first', options }),
                  h(NmorphDatePicker, { modelValue: new Date(2024, 0, 1) }),
                ],
              }
            );
        },
      })
    );

    app.use(NmorphLibrary, {
      i18n: {
        locale: 'en',
      },
    });

    const context: { teleports?: Record<string, string> } = {};
    let renderedHtml = '';

    try {
      const html = await renderToString(app, context);
      renderedHtml = [html, ...Object.values(context.teleports || {})].join('');
    } finally {
      vi.stubGlobal('document', currentDocument);
    }

    expect(renderedHtml).toContain('nmorph-overlay');
  });

  it('syncs checkbox groups bound to the same model', async () => {
    const wrapper = mount(
      defineComponent({
        components: { NmorphCheckboxGroup },
        setup() {
          const value = ref(['second']);
          return { checkboxOptions, value };
        },
        template: `
          <NmorphCheckboxGroup v-model="value" :options="checkboxOptions" />
          <NmorphCheckboxGroup v-model="value" :options="checkboxOptions" />
        `,
      })
    );

    await wrapper.findAll('input[type="checkbox"]')[0].trigger('change');
    await nextTick();

    expect((wrapper.findAll('input[type="checkbox"]')[2].element as HTMLInputElement).checked).toBe(true);
    wrapper.unmount();
  });

  it('syncs radio groups bound to the same model', async () => {
    const wrapper = mount(
      defineComponent({
        components: { NmorphRadioGroup },
        setup() {
          const value = ref('second');
          return { options, value };
        },
        template: `
          <NmorphRadioGroup v-model="value" :options="options" />
          <NmorphRadioGroup v-model="value" :options="options" />
        `,
      })
    );

    await wrapper.findAll('.nmorph-radio')[0].trigger('click');
    await nextTick();

    expect((wrapper.findAll('input[type="radio"]')[2].element as HTMLInputElement).checked).toBe(true);
    wrapper.unmount();
  });

  it('does not render image preview trigger inside avatar preview', async () => {
    const wrapper = mount(NmorphAvatar, {
      props: { src: imageSrc, preview: true },
    });

    await nextTick();

    expect(wrapper.find('.nmorph-image-preview__trigger').exists()).toBe(false);
    wrapper.unmount();
  });

  it('uses basic height for pagination page controls by default', async () => {
    const wrapper = mount(NmorphPagination, {
      props: { totalElementsQuantity: 24, elementsQuantityOnPage: 8 },
    });

    await nextTick();

    const pagination = wrapper.find('.nmorph-pagination').element as HTMLElement;

    expect(pagination.style.getPropertyValue('--nmorph-pagination-height')).toBe('var(--default-thickness-component)');
    expect(wrapper.find('.nmorph-pagination__page-btn.nmorph-radio').classes()).toContain('nmorph--basic-component');
    wrapper.unmount();
  });

  it('moves virtual table active row with keyboard navigation', async () => {
    const rows = Array.from({ length: 20 }, (_, index) => ({ name: `Row ${index}` }));
    const wrapper = mount(
      defineComponent({
        components: { NmorphTable, NmorphTableColumn },
        setup() {
          return { rows };
        },
        template:
          '<NmorphTable virtual virtual-dynamic-height :data="rows" :virtual-row-height="20" virtual-height="40px"><NmorphTableColumn prop="name" label="Name" /></NmorphTable>',
      })
    );

    await nextTick();
    await nextTick();

    const body = wrapper.find('.nmorph-table__body');
    await body.trigger('keydown', { key: 'ArrowDown' });
    await nextTick();

    expect(wrapper.findAll('.nmorph-table__table-data-row')[0].classes()).toContain(
      'nmorph-table__table-data-row--active'
    );

    await body.trigger('keydown', { key: 'ArrowDown' });
    await nextTick();

    expect(wrapper.findAll('.nmorph-table__table-data-row')[1].classes()).toContain(
      'nmorph-table__table-data-row--active'
    );
    wrapper.unmount();
  });
});
