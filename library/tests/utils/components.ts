import { mount } from '@vue/test-utils';
import { defineComponent, nextTick, reactive, ref } from 'vue';
import { expect, vi } from 'vitest';
import {
  NmorphAlert,
  NmorphAutocomplete,
  NmorphAudioMeter,
  NmorphAvatar,
  NmorphBacktop,
  NmorphAudioPreview,
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
  NmorphDrawer,
  NmorphDropdown,
  NmorphEmpty,
  NmorphEmojiPicker,
  NmorphFileCard,
  NmorphFileUpload,
  NmorphForm,
  NmorphFormItem,
  NmorphGuide,
  NmorphGuideStep,
  NmorphIcon,
  NmorphIconPin,
  NmorphIconSearch,
  NmorphImage,
  NmorphImagePreview,
  NmorphLayout,
  NmorphLink,
  NmorphMediaGallery,
  NmorphNotificationProvider,
  NmorphNumberInput,
  NmorphOTPInput,
  NmorphOverlay,
  NmorphPagination,
  NmorphProgress,
  NmorphQRCode,
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
  NmorphSpace,
  NmorphStepper,
  NmorphSwitch,
  NmorphTimePicker,
  NmorphTabPane,
  NmorphTable,
  NmorphTableCell,
  NmorphTableColumn,
  NmorphTabs,
  NmorphTagItem,
  NmorphTagList,
  NmorphTextarea,
  NmorphText,
  NmorphTextInput,
  NmorphTooltip,
  NmorphVirtualList,
  NmorphVideoPreview,
} from '@/components';

export const imageSrc =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22100%22 viewBox=%220 0 160 100%22%3E%3Crect width=%22160%22 height=%22100%22 fill=%22%23dfe8ef%22/%3E%3Ccircle cx=%2280%22 cy=%2250%22 r=%2232%22 fill=%22%23578bd6%22/%3E%3C/svg%3E';

export const options = [
  { value: 'first', label: 'First' },
  { value: 'second', label: 'Second' },
];

export const checkboxOptions = [
  { id: 'first', label: 'First' },
  { id: 'second', label: 'Second' },
];

export const tableData = [{ name: 'Button', status: 'Ready' }];
export const emojiData = [
  { emoji: '😀', annotation: 'grinning face', tags: ['smile'], group: 'Smileys', order: 1 },
  { emoji: '🚀', annotation: 'rocket', tags: ['launch'], group: 'Objects', order: 1 },
  { emoji: '✅', annotation: 'check mark', tags: ['done'], group: 'Symbols', order: 1 },
];
export const virtualItems = Array.from({ length: 40 }, (_, index) => ({
  id: index + 1,
  title: `Virtual item ${index + 1}`,
}));
export const rect = (x: number, y: number, width: number, height: number) =>
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

export type FileUploadValue = { data: File; previewUrl: string };

export const createTestFile = (name: string, type = 'image/png') => new File(['content'], name, { type });

export const setFileInputState = (input: HTMLInputElement, files: File[], value = 'selected') => {
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

export const mockObjectUrlApi = (urls: string[] = []) => {
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

export const setVideoBufferedState = (
  video: HTMLVideoElement,
  { duration, start = 0, end }: { duration: number; start?: number; end: number }
) => {
  Object.defineProperty(video, 'duration', {
    configurable: true,
    value: duration,
  });
  Object.defineProperty(video, 'buffered', {
    configurable: true,
    value: {
      length: 1,
      start: () => start,
      end: () => end,
    },
  });
};

export const createFormValue = () =>
  reactive({
    email: {
      value: '',
      rules: [(value) => (String(value).includes('@') ? true : 'Email is invalid')],
    },
  });

export const renderCases = [
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
    name: 'NmorphText',
    component: NmorphText,
    props: { as: 'p', variant: 'body', color: 'semi-contrast' },
    slots: { default: 'Text' },
  },
  {
    name: 'NmorphLayout',
    component: defineComponent({
      components: { NmorphLayout },
      template:
        '<NmorphLayout gap="8px" aside-width="120px"><template #header>Header</template><template #aside>Aside</template>Main<template #footer>Footer</template></NmorphLayout>',
    }),
  },
  {
    name: 'NmorphScroll',
    component: NmorphScroll,
    props: { height: '120px' },
    slots: { default: '<div style="height: 240px;">Scroll content</div>' },
  },
  {
    name: 'NmorphSpace',
    component: NmorphSpace,
    props: { size: 'large', wrap: true },
    slots: { default: '<button>One</button><button>Two</button>' },
  },
  {
    name: 'NmorphAvatar',
    component: NmorphAvatar,
    props: { name: 'Nmorph', size: 48 },
  },
  {
    name: 'NmorphAudioMeter',
    component: NmorphAudioMeter,
    props: { value: 0.5 },
  },
  {
    name: 'NmorphAudioPreview',
    component: NmorphAudioPreview,
    props: { src: 'blob:audio', name: 'audio.mp3', durationMs: 62000 },
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
    name: 'NmorphEmojiPicker',
    component: NmorphEmojiPicker,
    props: { dataSource: emojiData, quickList: ['😀', '🚀'], initialExpanded: false },
  },
  {
    name: 'NmorphFileCard',
    component: NmorphFileCard,
    props: { name: 'report.pdf', mimeType: 'application/pdf', size: 2048, previewSrc: 'blob:report' },
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
    name: 'NmorphMediaGallery',
    component: NmorphMediaGallery,
    props: { modelValue: true, items: [{ kind: 'image', src: imageSrc, name: 'Preview' }] },
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
    name: 'NmorphQRCode',
    component: NmorphQRCode,
    props: { value: 'nmorph', title: 'Nmorph QR code' },
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
    name: 'NmorphDrawer',
    component: NmorphDrawer,
    props: { modelValue: true, title: 'Drawer', disabledTeleport: true },
    slots: { default: 'Drawer content' },
  },
  {
    name: 'NmorphTooltip',
    component: defineComponent({
      components: { NmorphButton, NmorphTooltip },
      template: '<NmorphTooltip text="Tooltip"><NmorphButton text="Hover" /></NmorphTooltip>',
    }),
  },
  {
    name: 'NmorphGuide',
    component: defineComponent({
      components: { NmorphGuide, NmorphGuideStep },
      template:
        '<NmorphGuide model-value :steps="[{ name: \'first\', title: \'Guide\' }]"><NmorphGuideStep name="first"><button>Target</button></NmorphGuideStep></NmorphGuide>',
    }),
  },
  {
    name: 'NmorphGuideStep',
    component: defineComponent({
      components: { NmorphGuide, NmorphGuideStep },
      template:
        '<NmorphGuide model-value :steps="[{ name: \'first\', title: \'Guide\' }]"><NmorphGuideStep name="first"><button>Target</button></NmorphGuideStep></NmorphGuide>',
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
    name: 'NmorphTextarea',
    component: NmorphTextarea,
    props: { modelValue: 'Text', placeholder: 'Textarea' },
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
    name: 'NmorphStepper',
    component: defineComponent({
      components: { NmorphStepper },
      template:
        '<NmorphStepper :model-value="0" :count="2"><section>First</section><section>Second</section></NmorphStepper>',
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
    name: 'NmorphVirtualList',
    component: defineComponent({
      components: { NmorphVirtualList },
      setup: () => ({ virtualItems }),
      template:
        '<NmorphVirtualList :items="virtualItems" item-key="id" :item-height="20" height="60px"><template #default="{ item }">{{ item.title }}</template></NmorphVirtualList>',
    }),
  },
  {
    name: 'NmorphVideoPreview',
    component: NmorphVideoPreview,
    props: { src: 'blob:video', name: 'video.mp4', durationMs: 90000 },
  },
  {
    name: 'NmorphNotificationProvider',
    component: NmorphNotificationProvider,
    props: {
      notifications: [{ id: 'notification', type: 'info', title: 'Notification', content: 'Content' }],
      disabledTeleport: true,
    },
  },
];

export const mountCase = async (renderCase) => {
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

export const getRenderCase = (name: string) => {
  const renderCase = renderCases.find((item) => item.name === name);

  if (!renderCase) {
    throw new Error(`Missing render case for ${name}`);
  }

  return renderCase;
};
