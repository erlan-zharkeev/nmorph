import { mount } from '@vue/test-utils';
import { defineComponent, nextTick, reactive } from 'vue';
import { describe, expect, it } from 'vitest';
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
});
