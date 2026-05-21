import { mount } from '@vue/test-utils';
import { createSSRApp, defineComponent, h, nextTick, reactive, ref } from 'vue';
import { renderToString } from '@vue/server-renderer';
import { describe, expect, it, vi } from 'vitest';
import { NmorphLibrary } from '../src/main';
import { getCommonStyles } from '../src/hooks/use-common-styles';
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
  NmorphEmpty,
  NmorphFileUpload,
  NmorphForm,
  NmorphFormItem,
  NmorphIcon,
  NmorphIconPin,
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
  NmorphTimePicker,
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

type FileUploadValue = { data: File; previewUrl: string };

const createTestFile = (name: string, type = 'image/png') => new File(['content'], name, { type });

const setFileInputState = (input: HTMLInputElement, files: File[], value = 'selected') => {
  Object.defineProperty(input, 'files', {
    configurable: true,
    value: files,
  });
  Object.defineProperty(input, 'value', {
    configurable: true,
    writable: true,
    value,
  });
};

const mockObjectUrlApi = (urls: string[] = []) => {
  const urlApi = URL as unknown as Record<'createObjectURL' | 'revokeObjectURL', unknown>;
  const originalCreateObjectURL = urlApi.createObjectURL;
  const originalRevokeObjectURL = urlApi.revokeObjectURL;
  const createObjectURL = vi.fn(() => urls.shift() || `blob:file-${createObjectURL.mock.calls.length}`);
  const revokeObjectURL = vi.fn();

  Object.defineProperty(URL, 'createObjectURL', {
    configurable: true,
    writable: true,
    value: createObjectURL,
  });
  Object.defineProperty(URL, 'revokeObjectURL', {
    configurable: true,
    writable: true,
    value: revokeObjectURL,
  });

  return {
    createObjectURL,
    revokeObjectURL,
    restore: () => {
      if (originalCreateObjectURL === undefined) {
        delete urlApi.createObjectURL;
      } else {
        Object.defineProperty(URL, 'createObjectURL', {
          configurable: true,
          writable: true,
          value: originalCreateObjectURL,
        });
      }

      if (originalRevokeObjectURL === undefined) {
        delete urlApi.revokeObjectURL;
      } else {
        Object.defineProperty(URL, 'revokeObjectURL', {
          configurable: true,
          writable: true,
          value: originalRevokeObjectURL,
        });
      }
    },
  };
};

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
      components: { NmorphIcon, NmorphIconPin, NmorphIconSearch },
      template: '<NmorphIcon><NmorphIconSearch /></NmorphIcon><NmorphIcon><NmorphIconPin /></NmorphIcon>',
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
    name: 'NmorphEmpty',
    component: NmorphEmpty,
    props: { title: 'Nothing here', description: 'Create the first item to get started.' },
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
    name: 'NmorphTimePicker',
    component: NmorphTimePicker,
    props: { modelValue: '09:30', placeholder: 'Time' },
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

  it('passes card padding prop to the card CSS variable', () => {
    const wrapper = mount(NmorphCard, {
      props: {
        cardPadding: 24,
      },
      slots: {
        default: 'Content',
      },
    });

    const card = wrapper.find('.nmorph-card').element as HTMLElement;

    expect(card.style.getPropertyValue('--card-padding')).toBe('24px');

    wrapper.unmount();
  });

  it('adds combined border width variable only for combined cards', () => {
    const regular = mount(NmorphCard, {
      props: {
        combinedShadowBorderWidth: 2,
      },
      slots: {
        default: 'Content',
      },
    });
    const combined = mount(NmorphCard, {
      props: {
        shadowType: 'combined',
        combinedShadowBorderWidth: 2,
      },
      slots: {
        default: 'Content',
      },
    });

    expect(
      (regular.find('.nmorph-card').element as HTMLElement).style.getPropertyValue(
        '--nmorph-card-combined-border-width'
      )
    ).toBe('');
    expect(
      (combined.find('.nmorph-card').element as HTMLElement).style.getPropertyValue(
        '--nmorph-card-combined-border-width'
      )
    ).toBe('2px');

    regular.unmount();
    combined.unmount();
  });

  it('fills the available width by default and can fit content', () => {
    const filled = mount(NmorphCard, {
      slots: {
        default: 'Content',
      },
    });
    const fitted = mount(NmorphCard, {
      props: {
        fill: false,
      },
      slots: {
        default: 'Content',
      },
    });

    expect(filled.find('.nmorph-card').classes()).toContain('nmorph-card--fill');
    expect(fitted.find('.nmorph-card').classes()).toContain('nmorph-card--fit-content');

    filled.unmount();
    fitted.unmount();
  });

  it('renders the card root with a custom tag', () => {
    const wrapper = mount(NmorphCard, {
      props: {
        tag: 'article',
      },
      slots: {
        default: 'Content',
      },
    });

    expect(wrapper.find('.nmorph-card').element.tagName).toBe('ARTICLE');

    wrapper.unmount();
  });

  it('renders card header wrapper only when header slot exists', () => {
    const withoutHeader = mount(NmorphCard, {
      slots: {
        default: 'Content',
      },
    });
    const withHeader = mount(NmorphCard, {
      slots: {
        header: 'Header',
        default: 'Content',
      },
    });

    expect(withoutHeader.find('.nmorph-card__header').exists()).toBe(false);
    expect(withHeader.find('.nmorph-card__header').exists()).toBe(true);

    withoutHeader.unmount();
    withHeader.unmount();
  });

  it('applies custom class to the card content wrapper', () => {
    const wrapper = mount(NmorphCard, {
      props: {
        contentClass: 'custom-card-content',
      },
      slots: {
        default: 'Content',
      },
    });

    expect(wrapper.find('.nmorph-card__content').classes()).toContain('custom-card-content');

    wrapper.unmount();
  });

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

    expect(empty.style.getPropertyValue('--nmorph-empty-icon-size')).toBe('32px');
    expect(empty.style.getPropertyValue('--nmorph-empty-min-height')).toBe('120px');
    expect(empty.style.getPropertyValue('--nmorph-empty-padding')).toBe('12px');
    expect(wrapper.find('.nmorph-empty__action button').text()).toBe('Create');

    wrapper.unmount();
  });

  it('keeps empty default padding token defined', () => {
    const wrapper = mount(NmorphEmpty);
    const empty = wrapper.find('.nmorph-empty').element as HTMLElement;

    expect(empty.style.getPropertyValue('--nmorph-empty-padding')).toBe('var(--indentation-05)');
    expect(getCommonStyles()).toContain('--indentation-05: 24px;');

    wrapper.unmount();
  });

  it('keeps backtop position variables on the teleported element', async () => {
    const target = document.createElement('div');
    const portal = document.createElement('div');
    portal.id = 'backtop-portal-test';
    document.body.append(target, portal);

    const wrapper = mount(NmorphBacktop, {
      props: {
        right: 24,
        bottom: 32,
        zIndex: 99,
        teleportTo: '#backtop-portal-test',
      },
      attachTo: target,
      global: {
        stubs: {
          Teleport: false,
        },
      },
    });

    await nextTick();
    await nextTick();

    const backtop = portal.querySelector('.nmorph-backtop') as HTMLElement;

    expect(backtop).toBeTruthy();
    expect(backtop.style.getPropertyValue('--nmorph-backtop-right')).toBe('24px');
    expect(backtop.style.getPropertyValue('--nmorph-backtop-bottom')).toBe('32px');
    expect(backtop.style.getPropertyValue('--nmorph-backtop-z-index')).toBe('99');

    wrapper.unmount();
    target.remove();
    portal.remove();
  });

  it('uses the nearest scrollable ancestor for nested backtop usage', async () => {
    const scrollContainer = document.createElement('div');
    const content = document.createElement('div');
    scrollContainer.style.overflowY = 'auto';
    Object.defineProperty(scrollContainer, 'clientHeight', { configurable: true, value: 100 });
    Object.defineProperty(scrollContainer, 'scrollHeight', { configurable: true, value: 400 });
    Object.defineProperty(scrollContainer, 'scrollTo', { configurable: true, value: vi.fn() });
    scrollContainer.append(content);
    document.body.append(scrollContainer);

    const wrapper = mount(NmorphBacktop, {
      props: {
        visibilityHeight: 10,
        teleportDisabled: true,
      },
      attachTo: content,
    });

    await nextTick();

    expect(wrapper.find('.nmorph-backtop').classes()).not.toContain('nmorph-backtop--show');

    scrollContainer.scrollTop = 40;
    scrollContainer.dispatchEvent(new Event('scroll'));
    await nextTick();

    expect(wrapper.find('.nmorph-backtop').classes()).toContain('nmorph-backtop--show');

    await wrapper.find('.nmorph-backtop > div').trigger('click');

    expect(scrollContainer.scrollTo).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

    wrapper.unmount();
    scrollContainer.remove();
  });

  it('forwards CSS variable props on data and feedback components', async () => {
    const assertStyles = async (wrapper, selector, expected) => {
      await nextTick();

      const element = wrapper.find(selector).element as HTMLElement;

      for (const [name, value] of Object.entries(expected)) {
        expect(element.style.getPropertyValue(name)).toBe(value);
      }

      wrapper.unmount();
    };

    await assertStyles(mount(NmorphBadge, { props: { color: '#123456' } }), '.nmorph-badge', {
      '--nmorph-badge-color': '#123456',
    });

    await assertStyles(
      mount(NmorphProgress, {
        props: {
          percentage: 50,
          height: 12,
          widthTransition: 'width 120ms ease',
          indeterminateAnimation: 'pulse 1s linear infinite',
        },
      }),
      '.nmorph-progress',
      {
        '--height': '12px',
        '--width-transition': 'width 120ms ease',
        '--animation': 'pulse 1s linear infinite',
      }
    );

    await assertStyles(
      mount(NmorphCalendar, {
        props: {
          initialDate: new Date(2024, 0, 1),
          modelValue: new Date(2024, 0, 1),
          cellHeight: 44,
        },
      }),
      '.nmorph-calendar',
      {
        '--table-data-cell-height': '44px',
      }
    );

    await assertStyles(
      mount(NmorphSkeleton, {
        props: {
          loadingGradient: 'linear-gradient(90deg, red, blue)',
        },
      }),
      '.nmorph-skeleton',
      {
        '--loading-gradient': 'linear-gradient(90deg, red, blue)',
      }
    );

    await assertStyles(
      mount(NmorphTable, {
        props: {
          data: tableData,
          borderColor: '#123456',
          cellHeight: 52,
          rowHoverBackground: 'rgba(1, 2, 3, 0.2)',
        },
      }),
      '.nmorph-table',
      {
        '--border-color': '#123456',
        '--table-cell-height': '52px',
        '--table-background-row-hover': 'rgba(1, 2, 3, 0.2)',
      }
    );

    await assertStyles(
      mount(NmorphImagePreview, {
        props: {
          src: imageSrc,
          width: 222,
          height: '130px',
        },
      }),
      '.nmorph-image-preview',
      {
        '--width': '222px',
        '--height': '130px',
      }
    );

    await assertStyles(
      mount(NmorphTooltip, {
        props: {
          forceShow: true,
          text: 'Tooltip',
          width: 180,
          maxWidth: '220px',
          height: 48,
        },
        slots: {
          default: '<button>Target</button>',
        },
      }),
      '.nmorph-tooltip',
      {
        '--width': '180px',
        '--max-width': '220px',
        '--height': '48px',
      }
    );

    await assertStyles(
      mount(NmorphAlert, {
        props: {
          id: 'alert-style',
          type: 'info',
          title: 'Alert',
          content: 'Content',
          backgroundColor: 'rgba(10, 20, 30, 0.2)',
        },
      }),
      '.nmorph-alert',
      {
        '--background-color': 'rgba(10, 20, 30, 0.2)',
      }
    );

    await assertStyles(
      mount(NmorphCallout, {
        props: {
          type: 'info',
          title: 'Callout',
          content: 'Content',
          color: '#345678',
          padding: 14,
          borderRadius: 'var(--border-radius-80)',
          accentWidth: 6,
          titleGap: 10,
          titleFontSize: '18px',
          contentFontSize: '13px',
        },
      }),
      '.nmorph-callout',
      {
        '--callout-color': '#345678',
        '--callout-padding': '14px',
        '--callout-border-radius': 'var(--border-radius-80)',
        '--callout-accent-width': '6px',
        '--callout-title-gap': '10px',
        '--callout-title-font-size': '18px',
        '--callout-content-font-size': '13px',
      }
    );

    await assertStyles(
      mount(NmorphLink, {
        props: {
          href: '#',
          text: 'Link',
          color: '#abcdef',
        },
      }),
      '.nmorph-link',
      {
        '--link-color': '#abcdef',
      }
    );
  });

  it('renders link icon by icon name before text', async () => {
    const wrapper = mount(NmorphLink, {
      props: {
        iconName: 'edit',
        text: 'Edit',
      },
    });

    await nextTick();

    const link = wrapper.find('a').element as HTMLElement;
    const icon = wrapper.find('.nmorph-link__icon');

    expect(icon.exists()).toBe(true);
    expect(icon.find('svg').exists()).toBe(true);
    expect(link.firstElementChild).toBe(icon.element);

    wrapper.unmount();
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

    expect(badge.style.getPropertyValue('--nmorph-badge-ribbon-offset-x')).toBe('-6px');
    expect(badge.style.getPropertyValue('--nmorph-badge-ribbon-offset-y')).toBe('8px');
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

    expect(badge.style.getPropertyValue('--nmorph-badge-ribbon-offset-x')).toBe('12px');
    expect(badge.style.getPropertyValue('--nmorph-badge-ribbon-offset-y')).toBe('4px');
    expect(ribbonCorner.classes()).toContain('nmorph-badge__ribbon-corner--top-right');
    expect(ribbonCorner.classes()).toContain('nmorph-badge__ribbon-corner--flat');

    wrapper.unmount();
  });

  it('uses badge type as the primary display mode', async () => {
    const ribbon = mount(NmorphBadge, {
      props: {
        value: 'New',
        type: 'ribbon',
        isDot: true,
        isTag: true,
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
    const legacyDot = mount(NmorphBadge, {
      props: {
        isDot: true,
      },
      slots: {
        default: '<button>Legacy</button>',
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

    expect(legacyDot.find('.nmorph-badge__dot').exists()).toBe(true);
    expect(
      (legacyDot.find('.nmorph-badge').element as HTMLElement).style.getPropertyValue('--nmorph-badge-dot-size')
    ).toBe('');

    ribbon.unmount();
    tag.unmount();
    legacyDot.unmount();
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

  it('syncs file upload list when model value is cleared from outside', async () => {
    const initialValue: FileUploadValue[] = [
      {
        data: createTestFile('avatar.png'),
        previewUrl: 'blob:external',
      },
    ];
    const wrapper = mount(NmorphFileUpload, {
      props: {
        modelValue: initialValue,
      },
    });

    await nextTick();

    const input = wrapper.find('input[type="file"]').element as HTMLInputElement;
    setFileInputState(input, [], 'selected');

    expect(wrapper.find('.nmorph-file-upload__file-name').text()).toBe('avatar.png');

    await wrapper.setProps({ modelValue: [] });
    await nextTick();

    expect(wrapper.find('.nmorph-file-upload__file').exists()).toBe(false);
    expect(input.value).toBe('');

    wrapper.unmount();
  });

  it('clears native file input after upload so the same file can be selected after reset', async () => {
    const objectUrls = mockObjectUrlApi(['blob:first', 'blob:second']);
    const wrapper = mount(NmorphFileUpload, {
      props: {
        modelValue: [],
      },
    });

    try {
      const file = createTestFile('avatar.png');
      const inputWrapper = wrapper.find('input[type="file"]');
      const input = inputWrapper.element as HTMLInputElement;

      setFileInputState(input, [file]);
      await inputWrapper.trigger('change');
      await nextTick();

      const firstPayload = wrapper.emitted('update:model-value')?.at(-1)?.[0] as FileUploadValue[];

      expect(firstPayload).toHaveLength(1);
      expect(input.value).toBe('');

      await wrapper.setProps({ modelValue: firstPayload });
      await wrapper.setProps({ modelValue: [] });
      await nextTick();

      setFileInputState(input, [file]);
      await inputWrapper.trigger('change');
      await nextTick();

      const lastPayload = wrapper.emitted('update:model-value')?.at(-1)?.[0] as FileUploadValue[];

      expect(objectUrls.createObjectURL).toHaveBeenCalledTimes(2);
      expect(objectUrls.revokeObjectURL).toHaveBeenCalledWith('blob:first');
      expect(lastPayload).toHaveLength(1);
      expect(lastPayload[0].previewUrl).toBe('blob:second');
      expect(input.value).toBe('');
    } finally {
      wrapper.unmount();
      objectUrls.restore();
    }
  });

  it('emits a new file list, clears input, and revokes preview when removing a file', async () => {
    const objectUrls = mockObjectUrlApi(['blob:first', 'blob:second']);
    const wrapper = mount(NmorphFileUpload, {
      props: {
        modelValue: [],
        multiple: true,
      },
    });

    try {
      const firstFile = createTestFile('first.png');
      const secondFile = createTestFile('second.png');
      const inputWrapper = wrapper.find('input[type="file"]');
      const input = inputWrapper.element as HTMLInputElement;

      setFileInputState(input, [firstFile, secondFile]);
      await inputWrapper.trigger('change');
      await nextTick();

      const firstPayload = wrapper.emitted('update:model-value')?.at(-1)?.[0] as FileUploadValue[];

      await wrapper.setProps({ modelValue: firstPayload });
      await nextTick();
      setFileInputState(input, [], 'selected');

      await wrapper.findAll('.nmorph-file-upload__remove-file .nmorph-button')[0].trigger('click');
      await nextTick();

      const lastPayload = wrapper.emitted('update:model-value')?.at(-1)?.[0] as FileUploadValue[];

      expect(lastPayload).not.toBe(firstPayload);
      expect(lastPayload).toHaveLength(1);
      expect(lastPayload[0].data.name).toBe('second.png');
      expect(firstPayload).toHaveLength(2);
      expect(input.value).toBe('');
      expect(objectUrls.revokeObjectURL).toHaveBeenCalledWith('blob:first');
    } finally {
      wrapper.unmount();
      objectUrls.restore();
    }
  });

  it('clears unsupported file selections without adding them to input list', async () => {
    const objectUrls = mockObjectUrlApi();
    const wrapper = mount(NmorphFileUpload, {
      props: {
        modelValue: [],
        allowedTypes: ['png'],
      },
    });

    try {
      const inputWrapper = wrapper.find('input[type="file"]');
      const input = inputWrapper.element as HTMLInputElement;

      setFileInputState(input, [createTestFile('report.pdf', 'application/pdf')]);
      await inputWrapper.trigger('change');
      await nextTick();

      expect(wrapper.emitted('on-unsupported-file-type-error')?.at(-1)).toEqual(['application/pdf']);
      expect(wrapper.emitted('update:model-value')).toBeUndefined();
      expect(wrapper.find('.nmorph-file-upload__file').exists()).toBe(false);
      expect(input.value).toBe('');
      expect(objectUrls.createObjectURL).not.toHaveBeenCalled();
    } finally {
      wrapper.unmount();
      objectUrls.restore();
    }
  });

  it('accepts non-image files by default without rendering image previews', async () => {
    const objectUrls = mockObjectUrlApi(['blob:report']);
    const wrapper = mount(NmorphFileUpload, {
      props: {
        modelValue: [],
      },
    });

    try {
      const inputWrapper = wrapper.find('input[type="file"]');
      const input = inputWrapper.element as HTMLInputElement;
      const file = createTestFile('report.pdf', 'application/pdf');

      setFileInputState(input, [file]);
      await inputWrapper.trigger('change');
      await nextTick();

      const payload = wrapper.emitted('update:model-value')?.at(-1)?.[0] as FileUploadValue[];

      expect(payload).toHaveLength(1);
      expect(payload[0].data.name).toBe('report.pdf');
      expect(wrapper.emitted('on-unsupported-file-type-error')).toBeUndefined();
      expect(wrapper.find('.nmorph-file-upload__file-name').text()).toBe('report.pdf');
      expect(wrapper.find('.nmorph-image-preview').exists()).toBe(false);
      expect(wrapper.find('.nmorph-file-upload__file-info .nmorph-icon').exists()).toBe(true);
    } finally {
      wrapper.unmount();
      objectUrls.restore();
    }
  });

  it('forwards CSS variable props on form controls', async () => {
    const assertStyles = async (wrapper, selector, expected) => {
      await nextTick();

      const element = wrapper.find(selector).element as HTMLElement;

      for (const [name, value] of Object.entries(expected)) {
        expect(element.style.getPropertyValue(name)).toBe(value);
      }

      wrapper.unmount();
    };

    await assertStyles(
      mount(NmorphSwitch, {
        props: {
          modelValue: true,
          width: 54,
          height: 30,
          offset: 4,
          thumbHeight: 22,
        },
      }),
      '.nmorph-switch',
      {
        '--width': '54px',
        '--height': '30px',
        '--offset': '4px',
        '--thumb-height': '22px',
      }
    );

    await assertStyles(
      mount(NmorphSelectButton, {
        props: {
          modelValue: 'first',
          options,
          trackPadding: 3,
          itemSize: 36,
          itemFontSize: '13px',
        },
      }),
      '.nmorph-select-button',
      {
        '--track-padding': '3px',
        '--item-size': '36px',
        '--item-font-size': '13px',
      }
    );

    await assertStyles(
      mount(NmorphSelect, {
        props: {
          modelValue: 'first',
          options,
          width: 280,
        },
      }),
      '.nmorph-select',
      {
        '--base-width': '280px',
      }
    );

    await assertStyles(
      mount(NmorphSelectOption, {
        props: {
          value: 'first',
          label: 'First',
          hoverBackground: '#111111',
          hoverColor: '#eeeeee',
        },
        global: {
          provide: {
            'select-selected-value': ref('first'),
            'select-change-selected-value': () => undefined,
          },
        },
      }),
      '.nmorph-select-option',
      {
        '--hover-bg': '#111111',
        '--hover-color': '#eeeeee',
      }
    );

    await assertStyles(
      mount(NmorphSlider, {
        props: {
          modelValue: 40,
          thumbWidth: 64,
          sliderHeight: 28,
          valueFixedContainerHeight: 12,
        },
      }),
      '.nmorph-slider',
      {
        '--nmorph-slider-thumb-width': '64px',
        '--slider-height': '28px',
        '--value-fixed-container-height': '12px',
      }
    );

    await assertStyles(
      mount(NmorphDatePicker, {
        props: {
          modelValue: new Date(2024, 0, 1),
          initialDate: new Date(2024, 0, 1),
          width: 260,
          calendarCellHeight: 38,
        },
      }),
      '.nmorph-date-picker',
      {
        '--width': '260px',
        '--date-picker-calendar-cell-height': '38px',
      }
    );

    await assertStyles(
      mount(NmorphTimePicker, {
        props: {
          modelValue: '09:30',
          width: 180,
        },
      }),
      '.nmorph-time-picker',
      {
        '--width': '180px',
      }
    );

    await assertStyles(
      mount(
        defineComponent({
          components: { NmorphCollapse, NmorphCollapseItem },
          template: `
            <NmorphCollapse :model-value="['first']">
              <NmorphCollapseItem name="first" title="First" :transition-speed="220">Content</NmorphCollapseItem>
            </NmorphCollapse>
          `,
        })
      ),
      '.nmorph-collapse-item',
      {
        '--transition-speed': '220ms',
      }
    );
  });

  it('aligns dropdown option heights with their form control height', async () => {
    const autocomplete = mount(NmorphAutocomplete, {
      props: {
        height: 'thick',
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
          <NmorphSelect :open="true" height="thin" :model-value="''">
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
        height: 'thick',
      },
    });

    await timePicker.find('.nmorph-time-picker__input').trigger('click');
    await nextTick();

    expect(timePicker.find('.nmorph-time-picker__option').classes()).toContain('nmorph--thick-component');
    timePicker.unmount();
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

  it('keeps tooltip content above adjacent controls through z-index', async () => {
    const wrapper = mount(NmorphTooltip, {
      props: {
        forceShow: true,
        text: 'Tooltip',
        zIndex: 1234,
      },
      slots: {
        default: '<button>Target</button>',
      },
    });

    await nextTick();

    const tooltip = wrapper.find('.nmorph-tooltip').element as HTMLElement;
    const content = wrapper.find('.nmorph-tooltip__info-content').element as HTMLElement;

    expect(tooltip.style.getPropertyValue('--nmorph-tooltip-z-index')).toBe('1234');
    expect(content).toBeTruthy();

    wrapper.unmount();
  });

  it('keeps notification transition groups mounted for first-item enter animations', async () => {
    const wrapper = mount(NmorphNotificationProvider, {
      props: {
        notifications: [],
      },
    });

    expect(wrapper.findAll('.nmorph-notification-provider__list')).toHaveLength(6);

    await wrapper.setProps({
      notifications: [{ id: 'first', type: 'info', title: 'First' }],
    });
    await nextTick();

    expect(wrapper.find('.nmorph-notification-provider__notification').exists()).toBe(true);

    wrapper.unmount();
  });

  it('renders number input right action buttons with increase above decrease', () => {
    const wrapper = mount(NmorphNumberInput, {
      props: {
        modelValue: 10,
        actionBtnPositionRight: true,
      },
    });

    const actionButtons = wrapper.findAll('.nmorph-number-input__action-btns > div');

    expect(actionButtons[0].classes()).toContain('nmorph-number-input__increase');
    expect(actionButtons[1].classes()).toContain('nmorph-number-input__decrease');

    wrapper.unmount();
  });

  it('loops carousel navigation without rendering blank slides', async () => {
    const wrapper = mount(
      defineComponent({
        components: { NmorphCarousel, NmorphCarouselItem },
        template: `
          <NmorphCarousel>
            <NmorphCarouselItem name="first">First</NmorphCarouselItem>
            <NmorphCarouselItem name="second">Second</NmorphCarouselItem>
            <NmorphCarouselItem name="third">Third</NmorphCarouselItem>
          </NmorphCarousel>
        `,
      })
    );

    await nextTick();
    await nextTick();

    const rightButton = wrapper.find('.nmorph-carousel__prev');
    await rightButton.trigger('click');
    expect(wrapper.find('.nmorph-carousel__wrapper').attributes('style')).toContain('translateX(-100%)');

    await rightButton.trigger('click');
    expect(wrapper.find('.nmorph-carousel__wrapper').attributes('style')).toContain('translateX(-200%)');

    await rightButton.trigger('click');
    expect(wrapper.find('.nmorph-carousel__wrapper').attributes('style')).toContain('translateX(-0%)');
    expect(wrapper.findAll('.nmorph-carousel__item')).toHaveLength(3);

    wrapper.unmount();
  });

  it('keeps collapse title available after closing and opens it again', async () => {
    const wrapper = mount(
      defineComponent({
        components: { NmorphCollapse, NmorphCollapseItem },
        setup() {
          const model = ref(['first']);

          return { model };
        },
        template: `
          <NmorphCollapse v-model="model">
            <NmorphCollapseItem name="first" title="First">Content</NmorphCollapseItem>
          </NmorphCollapse>
        `,
      })
    );

    await nextTick();
    await nextTick();

    const title = wrapper.find('.nmorph-collapse-item__title');
    expect(title.exists()).toBe(true);

    await title.trigger('click');
    expect(wrapper.vm.model).toEqual([]);
    expect(wrapper.find('.nmorph-collapse-item__title').exists()).toBe(true);

    await wrapper.find('.nmorph-collapse-item__title').trigger('click');
    expect(wrapper.vm.model).toEqual(['first']);

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
    expect(dropdown.style.getPropertyValue('--nmorph-dropdown-width')).toBe('max-content');

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
        options: ['Open', { label: 'Delete', color: 'var(--nmorph-error-text-color)' }, componentOption],
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
    expect(items[1].style.getPropertyValue('--nmorph-context-menu-item-color')).toBe('var(--nmorph-error-text-color)');
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
    const firstAction = document.body.querySelector('.first-action') as HTMLButtonElement;
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

    expect(dialog.style.getPropertyValue('--nmorph-dialog-width')).toBe('960px');
    expect(dialog.style.getPropertyValue('--nmorph-dialog-max-height')).toBe('240px');
    expect(wrapper.find('.nmorph-dialog__header').exists()).toBe(true);
    expect(wrapper.find('.nmorph-dialog__content').exists()).toBe(true);

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

  it('uses default text color for avatar loading icon', async () => {
    const wrapper = mount(NmorphAvatar, {
      props: { src: imageSrc },
    });

    await nextTick();

    const icon = wrapper.find('.nmorph-image__loading .nmorph-icon').element as HTMLElement;

    expect(icon.style.getPropertyValue('--nmorph-icon-color')).toBe('');
    expect(icon.style.getPropertyValue('--color')).toBe('');

    wrapper.unmount();
  });

  it('renders avatar initials without inline color override', () => {
    const wrapper = mount(NmorphAvatar, {
      props: { name: 'Jane Doe' },
    });

    const initials = wrapper.find('.nmorph-avatar__initials');

    expect(initials.exists()).toBe(true);
    expect(initials.text()).toBe('JD');
    expect((initials.element as HTMLElement).style.color).toBe('');

    wrapper.unmount();
  });

  it('opens image preview from the trigger', async () => {
    const wrapper = mount(NmorphImagePreview, {
      props: { src: imageSrc, alt: 'Preview' },
    });

    await nextTick();
    await wrapper.find('.nmorph-image-preview__trigger').trigger('click');
    await nextTick();

    expect(wrapper.emitted('update:model-value')?.at(-1)).toEqual([true]);
    wrapper.unmount();
  });

  it('hides closed image preview portal from hit testing', async () => {
    const target = document.createElement('div');
    document.body.appendChild(target);

    const wrapper = mount(NmorphImagePreview, {
      props: { src: imageSrc, alt: 'Preview' },
      attachTo: target,
      global: {
        stubs: {
          Teleport: false,
        },
      },
    });

    await nextTick();
    await nextTick();

    const portal = Array.from(document.body.querySelectorAll<HTMLElement>('.nmorph-image-preview__portal')).at(-1);

    expect(portal?.style.display).toBe('none');

    await wrapper.find('.nmorph-image-preview__trigger').trigger('click');
    await nextTick();

    expect(portal?.style.display).not.toBe('none');

    const overlay = Array.from(document.body.querySelectorAll<HTMLElement>('.nmorph-overlay')).at(-1);
    overlay?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await nextTick();

    expect(portal?.style.display).toBe('none');

    wrapper.unmount();
    target.remove();
  });

  it('keeps image preview overlay controls inside preview portal', async () => {
    const target = document.createElement('div');
    document.body.appendChild(target);

    const wrapper = mount(NmorphImagePreview, {
      props: { modelValue: true, src: [imageSrc, imageSrc], alt: 'Preview' },
      attachTo: target,
      global: {
        stubs: {
          Teleport: false,
        },
      },
    });

    await nextTick();
    await nextTick();

    const portal = document.body.querySelector('.nmorph-image-preview__portal') as HTMLElement;
    const overlay = document.body.querySelector('.nmorph-overlay') as HTMLElement;
    const actions = document.body.querySelector('.nmorph-image-preview__actions') as HTMLElement;

    expect(portal).toBeTruthy();
    expect(overlay).toBeTruthy();
    expect(actions).toBeTruthy();
    expect(portal.contains(overlay)).toBe(true);
    expect(portal.contains(actions)).toBe(true);

    wrapper.unmount();
    target.remove();
  });

  it('can hide image preview navigation buttons and action bar independently', async () => {
    const target = document.createElement('div');
    document.body.appendChild(target);

    const wrapper = mount(NmorphImagePreview, {
      props: {
        modelValue: true,
        src: [imageSrc, imageSrc],
        alt: 'Preview',
        showNavigationButtons: false,
        showActionBar: false,
      },
      attachTo: target,
      global: {
        stubs: {
          Teleport: false,
        },
      },
    });

    await nextTick();
    await nextTick();

    expect(document.body.querySelector('.nmorph-image-preview__left')).toBeFalsy();
    expect(document.body.querySelector('.nmorph-image-preview__right')).toBeFalsy();
    expect(document.body.querySelector('.nmorph-image-preview__actions')).toBeFalsy();

    await wrapper.setProps({ showNavigationButtons: true });
    await nextTick();

    expect(document.body.querySelector('.nmorph-image-preview__left')).toBeTruthy();
    expect(document.body.querySelector('.nmorph-image-preview__right')).toBeTruthy();
    expect(document.body.querySelector('.nmorph-image-preview__actions')).toBeFalsy();

    await wrapper.setProps({ showNavigationButtons: false, showActionBar: true });
    await nextTick();

    expect(document.body.querySelector('.nmorph-image-preview__left')).toBeFalsy();
    expect(document.body.querySelector('.nmorph-image-preview__right')).toBeFalsy();
    expect(document.body.querySelector('.nmorph-image-preview__actions')).toBeTruthy();

    wrapper.unmount();
    target.remove();
  });

  it('closes image preview from backdrop and Escape key', async () => {
    const wrapper = mount(NmorphImagePreview, {
      props: { modelValue: true, src: imageSrc, alt: 'Preview' },
    });

    await nextTick();

    await wrapper.find('.nmorph-overlay').trigger('click');

    expect(wrapper.emitted('update:model-value')?.at(-1)).toEqual([false]);

    await wrapper.setProps({ modelValue: true });
    await nextTick();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await nextTick();

    expect(wrapper.emitted('update:model-value')?.at(-1)).toEqual([false]);
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
