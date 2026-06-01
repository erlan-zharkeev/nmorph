import { mount } from '@vue/test-utils';
import { createSSRApp, defineComponent, h, nextTick, reactive, ref } from 'vue';
import { renderToString } from '@vue/server-renderer';
import { describe, expect, it, vi } from 'vitest';
import { NmorphLibrary } from '../src/main';
import { loadNmorphEmojiLocale, nmorphEmojiQuickList } from '../src/emoji';
import { useFieldValidation } from '../src/hooks/use-field-validation';
import { getCommonStyles } from '../src/hooks/use-common-styles';
import { getNmorphThemeStyles } from '../src/outside-hooks/use-nmorph-theme';
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
  NmorphIcon,
  NmorphIconPin,
  NmorphIconSearch,
  NmorphImage,
  NmorphImagePreview,
  NmorphLayout,
  NmorphLink,
  NmorphMediaGallery,
  NmorphMediaTile,
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
  NmorphTextInput,
  NmorphTooltip,
  NmorphVirtualList,
  NmorphVideoPreview,
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
const emojiData = [
  { emoji: '😀', annotation: 'grinning face', tags: ['smile'], group: 'Smileys', order: 1 },
  { emoji: '🚀', annotation: 'rocket', tags: ['launch'], group: 'Objects', order: 1 },
  { emoji: '✅', annotation: 'check mark', tags: ['done'], group: 'Symbols', order: 1 },
];
const virtualItems = Array.from({ length: 40 }, (_, index) => ({
  id: index + 1,
  title: `Virtual item ${index + 1}`,
}));
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
    name: 'NmorphMediaTile',
    component: NmorphMediaTile,
    props: { name: 'Ada Lovelace', videoOff: true },
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
  it('loads packaged emoji locale data lazily', async () => {
    const locale = await loadNmorphEmojiLocale('en');

    expect(locale.language).toBe('en');
    expect(locale.data.length).toBeGreaterThan(1000);
    expect(locale.data[0].emoji).toBe('😀');
    expect(locale.quickList).toEqual(nmorphEmojiQuickList);
  });

  it.each(renderCases)('renders $name', async (renderCase) => {
    await mountCase(renderCase);
  });

  it('applies tag list design to tags while preserving explicit tag overrides', async () => {
    const wrapper = mount(NmorphTagList, {
      props: {
        design: 'common',
        color: 'var(--nmorph-success-color)',
        modelValue: [
          { value: 'status', text: 'Status' },
          { value: 'locked', text: 'Locked', design: 'nmorph' },
          { value: 'preview', text: 'Preview', color: 'var(--nmorph-warn-color)' },
        ],
      },
    });

    const tags = wrapper.findAll('.nmorph-tag-item');

    expect(tags[0].classes()).toContain('nmorph-tag-item--common');
    expect(tags[1].classes()).toContain('nmorph-tag-item--nmorph');
    expect(tags[2].classes()).toContain('nmorph-tag-item--common');
    expect(wrapper.find('.nmorph-list').classes()).toContain('nmorph-list--common');
    expect(tags[0].element.style.getPropertyValue('--tag-item-background-color')).toBe('var(--nmorph-success-color)');
    expect(tags[2].element.style.getPropertyValue('--tag-item-background-color')).toBe('var(--nmorph-warn-color)');

    await tags[0].trigger('click');
    await tags[0].find('.nmorph-tag-item__close-icon').trigger('click');

    expect(wrapper.emitted('click')?.[0]).toEqual(['status']);
    expect(wrapper.emitted('close')?.[0]).toEqual(['status']);
    expect(wrapper.emitted('update:selected-value')?.[0]).toEqual(['status']);
    expect(wrapper.emitted('click')).toHaveLength(1);

    wrapper.unmount();
  });

  it('supports v-model:selected-value for clicked tags', async () => {
    const wrapper = mount({
      components: { NmorphTagList },
      setup() {
        const tags = ref([
          { value: 'status', text: 'Status' },
          { value: 'preview', text: 'Preview' },
        ]);
        const selectedValue = ref<string | null>(null);

        return { selectedValue, tags };
      },
      template: `
        <div>
          <NmorphTagList v-model="tags" v-model:selected-value="selectedValue" />
          <span class="selected-value">{{ selectedValue }}</span>
        </div>
      `,
    });

    await wrapper.findAll('.nmorph-tag-item')[1].trigger('click');
    await nextTick();

    expect(wrapper.find('.selected-value').text()).toBe('preview');

    wrapper.unmount();
  });

  it('renders custom tag item slot content instead of text', async () => {
    const wrapper = mount(NmorphTagItem, {
      props: {
        value: 'custom',
        text: 'Fallback',
        design: 'common',
      },
      slots: {
        default: '<span class="custom-tag-content">Custom</span>',
      },
    });

    expect(wrapper.find('.custom-tag-content').exists()).toBe(true);
    expect(wrapper.text()).toContain('Custom');
    expect(wrapper.text()).not.toContain('Fallback');

    await wrapper.find('.nmorph-tag-item').trigger('click');
    await wrapper.find('.nmorph-tag-item__close-icon').trigger('click');

    expect(wrapper.emitted('click')?.[0]).toEqual(['custom']);
    expect(wrapper.emitted('close')?.[0]).toEqual(['custom']);

    wrapper.unmount();
  });

  it('passes scoped item slots through tag list without breaking tag events', async () => {
    const wrapper = mount({
      components: { NmorphTagList },
      setup() {
        const tags = ref([
          { value: 'eyes', glyphKey: 'eyes', count: 2, visibleUsers: ['Ada', 'Lin'] },
          { value: 'thumb', glyphKey: 'thumb', count: 1, visibleUsers: ['Kai'], removable: false },
        ]);
        const selectedValue = ref<string | null>(null);

        return { selectedValue, tags };
      },
      template: `
        <div>
          <NmorphTagList v-model="tags" v-model:selected-value="selectedValue" design="common">
            <template #item="{ item }">
              <span class="reaction-glyph">{{ item.glyphKey }}</span>
              <span v-if="item.count > 1" class="reaction-count">{{ item.count }}</span>
              <span class="reaction-users">{{ item.visibleUsers.length }}</span>
            </template>
          </NmorphTagList>
          <span class="selected-value">{{ selectedValue }}</span>
          <span class="tag-count">{{ tags.length }}</span>
        </div>
      `,
    });

    const firstTag = wrapper.findAll('.nmorph-tag-item')[0];

    expect(firstTag.text()).toContain('eyes');
    expect(firstTag.text()).toContain('2');
    expect(firstTag.text()).not.toContain('undefined');
    expect(firstTag.attributes()).not.toHaveProperty('count');
    expect(firstTag.attributes()).not.toHaveProperty('visibleusers');

    await firstTag.trigger('click');
    await nextTick();

    expect(wrapper.find('.selected-value').text()).toBe('eyes');

    await firstTag.find('.nmorph-tag-item__close-icon').trigger('click');
    await nextTick();

    expect(wrapper.find('.tag-count').text()).toBe('1');
    expect(wrapper.findAll('.nmorph-tag-item')).toHaveLength(1);

    wrapper.unmount();
  });

  it('uses contrast text color for nmorph tag close icons', async () => {
    const wrapper = mount(NmorphTagItem, {
      props: {
        value: 'new',
        text: 'New',
      },
    });

    await nextTick();

    const closeIcon = wrapper.find('.nmorph-tag-item__close-icon').element as HTMLElement;

    expect(closeIcon.style.getPropertyValue('--nmorph-icon-color')).toBe('var(--nmorph-contrast-text-color)');
    expect(closeIcon.style.getPropertyValue('--color')).toBe('var(--nmorph-contrast-text-color)');

    wrapper.unmount();
  });

  it('uses readable content colors for common tag backgrounds', async () => {
    document.documentElement.style.setProperty('--nmorph-gray-color', '#c9d2de');
    document.documentElement.style.setProperty('--nmorph-main-color', '#1c1f21');

    const wrapper = mount({
      components: { NmorphTagItem },
      template: `
        <div>
          <NmorphTagItem value="light" text="Light" design="common" />
          <NmorphTagItem value="dark" text="Dark" design="common" color="var(--nmorph-main-color)" />
        </div>
      `,
    });

    await nextTick();
    await nextTick();

    const [lightTag, darkTag] = wrapper.findAll('.nmorph-tag-item');

    expect(lightTag.element.style.getPropertyValue('--tag-item-background-color')).toBe('var(--nmorph-gray-color)');
    expect(lightTag.element.style.getPropertyValue('--tag-item-content-color')).toBe('var(--nmorph-black-color)');
    expect(darkTag.element.style.getPropertyValue('--tag-item-background-color')).toBe('var(--nmorph-main-color)');
    expect(darkTag.element.style.getPropertyValue('--tag-item-content-color')).toBe('var(--nmorph-white-color)');
    expect(lightTag.find('.nmorph-tag-item__close-icon').element.style.getPropertyValue('--nmorph-icon-color')).toBe(
      'var(--nmorph-black-color)'
    );
    expect(darkTag.find('.nmorph-tag-item__close-icon').element.style.getPropertyValue('--nmorph-icon-color')).toBe(
      'var(--nmorph-white-color)'
    );
    expect(lightTag.attributes('style')).not.toContain('--nmorph-tag-item-color');
    expect(lightTag.attributes('style')).not.toContain('--nmorph-tag-item-background');

    wrapper.unmount();
    document.documentElement.style.removeProperty('--nmorph-gray-color');
    document.documentElement.style.removeProperty('--nmorph-main-color');
  });

  it('places layout slots around the body and forwards sizing variables', () => {
    const wrapper = mount(NmorphLayout, {
      props: {
        tag: 'article',
        gap: 12,
        asideWidth: '88px',
        asidePosition: 'right',
        fullHeight: true,
      },
      slots: {
        header: 'Header',
        aside: 'Aside',
        default: 'Main',
        footer: 'Footer',
      },
    });

    const layout = wrapper.find('.nmorph-layout');
    const element = layout.element as HTMLElement;
    const bodyChildren = wrapper.find('.nmorph-layout__body').element.children;

    expect(element.tagName).toBe('ARTICLE');
    expect(layout.classes()).toContain('nmorph-layout--aside-right');
    expect(layout.classes()).toContain('nmorph-layout--full-height');
    expect(element.style.getPropertyValue('--nmorph-layout-gap')).toBe('12px');
    expect(element.style.getPropertyValue('--nmorph-layout-aside-width')).toBe('88px');
    expect(bodyChildren[0].classList.contains('nmorph-layout__main')).toBe(true);
    expect(bodyChildren[1].classList.contains('nmorph-layout__aside')).toBe(true);
    expect(wrapper.find('.nmorph-layout__header').text()).toBe('Header');
    expect(wrapper.find('.nmorph-layout__footer').text()).toBe('Footer');

    wrapper.unmount();
  });

  it('forwards space layout variables and custom root tag', () => {
    const wrapper = mount(NmorphSpace, {
      props: {
        tag: 'nav',
        direction: 'column',
        size: 'large',
        align: 'end',
        justify: 'space-between',
        wrap: true,
        inline: true,
        fill: true,
      },
      slots: {
        default: '<button>One</button><button>Two</button>',
      },
    });

    const space = wrapper.find('.nmorph-space');
    const element = space.element as HTMLElement;

    expect(element.tagName).toBe('NAV');
    expect(space.classes()).toEqual(
      expect.arrayContaining([
        'nmorph-space--column',
        'nmorph-space--wrap',
        'nmorph-space--inline',
        'nmorph-space--fill',
      ])
    );
    expect(element.style.getPropertyValue('--nmorph-space-gap')).toBe('16px');
    expect(element.style.getPropertyValue('--nmorph-space-align')).toBe('flex-end');
    expect(element.style.getPropertyValue('--nmorph-space-justify')).toBe('space-between');

    wrapper.unmount();
  });

  it('renders QR code svg and exposes scoped error content', () => {
    const wrapper = mount(NmorphQRCode, {
      props: {
        value: 'nmorph',
        size: 128,
        margin: 2,
        color: '#111111',
        background: '#ffffff',
        title: 'Nmorph QR',
      },
    });
    const qrCode = wrapper.find('.nmorph-qr-code').element as HTMLElement;

    expect(qrCode.style.getPropertyValue('--nmorph-qr-code-size')).toBe('128px');
    expect(qrCode.style.getPropertyValue('--nmorph-qr-code-color')).toBe('#111111');
    expect(wrapper.find('.nmorph-qr-code__svg').exists()).toBe(true);
    expect(wrapper.find('title').text()).toBe('Nmorph QR');
    expect(wrapper.find('path').attributes('d')).toContain('M');

    const error = mount(NmorphQRCode, {
      props: {
        value: 'x'.repeat(1000),
        maxVersion: 1,
      },
      slots: {
        error: ({ message }) => h('span', { class: 'qr-error' }, message),
      },
    });

    expect(error.find('.nmorph-qr-code').classes()).toContain('nmorph-qr-code--error');
    expect(error.find('.qr-error').text()).toContain('too large');

    wrapper.unmount();
    error.unmount();
  });

  it('selects quick emoji and expands compact emoji picker', async () => {
    const wrapper = mount(NmorphEmojiPicker, {
      props: {
        dataSource: emojiData,
        quickList: ['😀', '🚀'],
        initialExpanded: false,
        i18n: {
          expandLabel: 'Expand emoji',
          quickLabel: 'Quick emoji',
        },
      },
    });

    expect(wrapper.find('.nmorph-emoji-picker__quick-list').exists()).toBe(true);

    await wrapper.findAll('.nmorph-emoji-picker__quick-button')[1].trigger('click');

    expect(wrapper.emitted('select')?.at(-1)).toEqual(['🚀']);

    const expandButton = wrapper.find('.nmorph-emoji-picker__expand-button');

    expect(expandButton.attributes('aria-label')).toBe('Expand emoji');

    await expandButton.trigger('click');

    expect(wrapper.emitted('expand')).toHaveLength(1);
    expect(wrapper.find('.nmorph-emoji-picker__panel').exists()).toBe(true);
    expect(wrapper.find('.nmorph-emoji-picker__quick-list').exists()).toBe(false);

    wrapper.unmount();
  });

  it('filters emoji by annotation and tags', async () => {
    const wrapper = mount(NmorphEmojiPicker, {
      props: {
        dataSource: {
          Smileys: [emojiData[0]],
          Objects: [emojiData[1]],
          Symbols: [emojiData[2]],
        },
        initialExpanded: true,
      },
    });

    await wrapper.find('.nmorph-emoji-picker__search-input').setValue('launch');
    await nextTick();

    const buttons = wrapper.findAll('.nmorph-emoji-picker__emoji');

    expect(buttons).toHaveLength(1);
    expect(buttons[0].text()).toBe('🚀');

    await buttons[0].trigger('click');

    expect(wrapper.emitted('select')?.at(-1)).toEqual(['🚀']);

    wrapper.unmount();
  });

  it('filters emoji by localized group labels', async () => {
    const wrapper = mount(NmorphEmojiPicker, {
      props: {
        language: 'ru',
        dataSource: [{ emoji: '😀', annotation: 'радость', group: 'Smileys', groupLabel: 'Смайлы' }],
        i18n: {
          categories: {
            Smileys: 'Смайлы',
          },
        },
        initialExpanded: true,
      },
    });

    await wrapper.find('.nmorph-emoji-picker__search-input').setValue('смай');
    await nextTick();

    const buttons = wrapper.findAll('.nmorph-emoji-picker__emoji');

    expect(buttons).toHaveLength(1);
    expect(buttons[0].text()).toBe('😀');

    wrapper.unmount();
  });

  it('moves emoji grid focus with keyboard navigation', async () => {
    const target = document.createElement('div');
    document.body.appendChild(target);

    const wrapper = mount(NmorphEmojiPicker, {
      props: {
        dataSource: emojiData.map((item) => ({ ...item, group: 'Smileys' })),
        initialExpanded: true,
      },
      attachTo: target,
    });

    const buttons = wrapper.findAll('.nmorph-emoji-picker__emoji');

    await buttons[0].trigger('focus');
    await buttons[0].trigger('keydown', { key: 'ArrowRight' });
    await nextTick();

    expect(document.activeElement).toBe(buttons[1].element);

    wrapper.unmount();
    target.remove();
  });

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

  it('virtualizes long lists and exposes scroll helpers', async () => {
    const wrapper = mount(NmorphVirtualList, {
      props: {
        items: virtualItems,
        itemKey: 'id',
        itemHeight: 20,
        overscan: 1,
        height: '60px',
      },
      slots: {
        default:
          '<template #default="{ item, index }"><div class="virtual-row">{{ index }}: {{ item.title }}</div></template>',
      },
    });

    const container = wrapper.find('.nmorph-virtual-list').element as HTMLElement;
    Object.defineProperty(container, 'clientHeight', {
      configurable: true,
      value: 60,
    });

    (wrapper.vm as unknown as { refresh: () => void }).refresh();
    await nextTick();

    expect(wrapper.find('.nmorph-virtual-list__spacer').attributes('style')).toContain('height: 800px');
    expect(wrapper.findAll('.virtual-row')).toHaveLength(4);
    expect(wrapper.findAll('.virtual-row')[0].text()).toContain('Virtual item 1');

    (wrapper.vm as unknown as { scrollToIndex: (index: number) => void }).scrollToIndex(10);
    await nextTick();

    expect(wrapper.findAll('.virtual-row')[0].text()).toContain('Virtual item 10');

    container.scrollTop = 120;
    await wrapper.trigger('scroll');

    expect(wrapper.emitted('on-scroll')).toHaveLength(1);

    wrapper.unmount();
  });

  it('closes drawer from close button and honors overlay close configuration', async () => {
    const wrapper = mount(NmorphDrawer, {
      props: {
        modelValue: true,
        title: 'Settings',
        placement: 'left',
        size: 280,
        disabledTeleport: true,
        contentClass: 'custom-drawer-content',
      },
      slots: {
        default: 'Drawer content',
        footer: 'Footer',
      },
    });

    const drawer = wrapper.find('.nmorph-drawer');
    const drawerElement = drawer.element as HTMLElement;

    expect(drawer.classes()).toEqual(expect.arrayContaining(['nmorph-drawer--left', 'nmorph-drawer--open']));
    expect(drawerElement.style.getPropertyValue('--nmorph-drawer-size')).toBe('280px');
    expect(drawer.attributes('aria-label')).toBe('Settings');
    expect(wrapper.find('.custom-drawer-content').text()).toBe('Drawer content');
    expect(wrapper.find('.nmorph-drawer__footer').text()).toBe('Footer');

    await wrapper.find('.nmorph-drawer__close').trigger('click');

    expect(wrapper.emitted('on-close')).toHaveLength(1);
    expect(wrapper.emitted('update:model-value')?.at(-1)).toEqual([false]);

    const overlayLocked = mount(NmorphDrawer, {
      props: {
        modelValue: true,
        closeOnOverlay: false,
        disabledTeleport: true,
      },
      slots: {
        default: 'Drawer content',
      },
    });

    await overlayLocked.find('.nmorph-overlay').trigger('click');
    expect(overlayLocked.emitted('update:model-value')).toBeUndefined();

    await overlayLocked.setProps({ closeOnOverlay: true });
    await overlayLocked.find('.nmorph-overlay').trigger('click');
    expect(overlayLocked.emitted('update:model-value')?.at(-1)).toEqual([false]);

    wrapper.unmount();
    overlayLocked.unmount();
  });

  it('passes card spacing and radius props to card styles', () => {
    const wrapper = mount(NmorphCard, {
      props: {
        cardPadding: 24,
        padding: 18,
        radius: 12,
        contentPadding: 8,
      },
      slots: {
        default: 'Content',
      },
    });

    const card = wrapper.find('.nmorph-card').element as HTMLElement;

    expect(card.style.getPropertyValue('--card-padding')).toBe('18px');
    expect(card.style.getPropertyValue('--nmorph-card-radius')).toBe('12px');
    expect(card.style.getPropertyValue('--nmorph-card-content-padding')).toBe('8px');
    expect(card.style.padding).toBe('18px');

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

  it('keeps NmorphScroll skin in common styles for plugin-only usage', () => {
    const styles = getCommonStyles();

    expect(styles).toContain('.nmorph-scroll::-webkit-scrollbar-track');
    expect(styles).toContain('box-shadow: var(--nmorph-shadow-inset);');
    expect(styles).toContain('.nmorph-scroll::-webkit-scrollbar-button');
  });

  it('keeps default placeholder colors cool-toned', () => {
    const styles = getNmorphThemeStyles();

    expect(styles).toContain('--nmorph-placeholder-text-color: #9aa8b3;');
    expect(styles).toContain('--nmorph-placeholder-text-color: #68747b;');
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

    await assertStyles(
      mount(NmorphBadge, { props: { color: '#123456', ribbonSize: 30, ribbonRadius: 6 } }),
      '.nmorph-badge',
      {
        '--nmorph-badge-color': '#123456',
        '--nmorph-badge-ribbon-height': '30px',
        '--nmorph-badge-ribbon-radius': '6px',
      }
    );

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
          radius: 10,
          fit: 'contain',
        },
      }),
      '.nmorph-image-preview',
      {
        '--width': '222px',
        '--height': '130px',
        '--nmorph-image-preview-radius': '10px',
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

  it('renders file card surface variants without requiring inner class overrides', async () => {
    const wrapper = mount(NmorphFileCard, {
      props: {
        name: 'very-long-file-name-that-should-still-use-the-standard-ellipsis-layout.pdf',
        mimeType: 'application/pdf',
        size: 4096,
        surface: 'soft',
        showExtensionBadge: false,
        iconSurface: false,
        compact: true,
      },
    });

    await nextTick();

    const card = wrapper.find('.nmorph-file-card');

    expect(card.classes()).toEqual(
      expect.arrayContaining(['nmorph-file-card--soft', 'nmorph-file-card--compact', 'nmorph-file-card--icon-plain'])
    );
    expect(card.classes()).not.toContain('nmorph-file-card--card');
    expect(wrapper.find('.nmorph-file-card__badge').exists()).toBe(false);
    expect(wrapper.find('.nmorph-file-card__icon').exists()).toBe(true);
    expect(
      (wrapper.find('.nmorph-file-card__icon > .nmorph-icon').element as HTMLElement).style.getPropertyValue(
        '--nmorph-icon-color'
      )
    ).toBe('');
    expect(wrapper.find('.nmorph-file-card__name').text()).toBe(
      'very-long-file-name-that-should-still-use-the-standard-ellipsis-layout.pdf'
    );

    wrapper.unmount();
  });

  it('keeps file card card surface and extension badge enabled by default', async () => {
    const wrapper = mount(NmorphFileCard, {
      props: {
        name: 'report.pdf',
        mimeType: 'application/pdf',
      },
    });

    await nextTick();

    expect(wrapper.find('.nmorph-file-card').classes()).toContain('nmorph-file-card--card');
    expect(wrapper.find('.nmorph-file-card').classes()).not.toContain('nmorph-file-card--icon-plain');
    expect(wrapper.find('.nmorph-file-card__badge').text()).toBe('pdf');

    wrapper.unmount();
  });

  it('shows a file card action loader while loading and removes it when no actions remain', async () => {
    const wrapper = mount(NmorphFileCard, {
      props: {
        name: 'voice-note.ogg',
        mimeType: 'audio/ogg',
        previewSrc: 'blob:voice',
        downloadHref: 'blob:voice',
        loading: true,
      },
    });

    await nextTick();

    expect(wrapper.find('.nmorph-file-card__actions').exists()).toBe(true);
    expect(wrapper.find('.nmorph-file-card__action-loader').exists()).toBe(true);
    expect(wrapper.find('.nmorph-file-card__action-loader').attributes('role')).toBe('status');
    expect(wrapper.find('.nmorph-file-card__action-loader').html()).toContain('animateTransform');
    expect(wrapper.find('.nmorph-file-card__icon').html()).not.toContain('animateTransform');
    expect(wrapper.findAll('.nmorph-file-card__actions .nmorph-file-card__action-link')).toHaveLength(0);

    await wrapper.setProps({ loading: false, previewSrc: '', downloadHref: '' });

    expect(wrapper.find('.nmorph-file-card__actions').exists()).toBe(false);
    expect(wrapper.find('.nmorph-file-card__action-loader').exists()).toBe(false);

    wrapper.unmount();
  });

  it('renders audio media preview inside the file card shell', async () => {
    const wrapper = mount(NmorphFileCard, {
      props: {
        name: 'voice-message.mp3',
        mimeType: 'audio/mpeg',
        size: 8192,
        previewSrc: 'blob:voice',
        downloadHref: 'blob:voice',
        mediaPreview: 'audio',
        surface: 'soft',
        showExtensionBadge: false,
        iconSurface: false,
        compact: true,
      },
    });

    await nextTick();

    const card = wrapper.find('.nmorph-file-card');
    const audioPreview = wrapper.find('.nmorph-file-card__audio-preview.nmorph-audio-preview');
    const audio = audioPreview.find('audio');
    const actionLinks = wrapper.findAll('.nmorph-file-card__actions .nmorph-file-card__action-link');

    expect(card.classes()).toEqual(
      expect.arrayContaining([
        'nmorph-file-card--soft',
        'nmorph-file-card--compact',
        'nmorph-file-card--media',
        'nmorph-file-card--media-audio',
      ])
    );
    expect(card.classes()).toContain('nmorph-file-card--icon-plain');
    expect(wrapper.find('.nmorph-file-card__name').text()).toBe('voice-message.mp3');
    expect(wrapper.find('.nmorph-file-card__meta').text()).toBe('mp3 · 8 KB');
    expect(wrapper.find('.nmorph-file-card__badge').exists()).toBe(false);
    expect(audioPreview.classes()).toEqual(
      expect.arrayContaining([
        'nmorph-audio-preview--plain',
        'nmorph-audio-preview--embedded',
        'nmorph-audio-preview--compact',
        'nmorph-audio-preview--no-icon',
        'nmorph-audio-preview--no-header',
        'nmorph-audio-preview--no-actions',
      ])
    );
    expect(audio.exists()).toBe(true);
    expect(audio.attributes('src')).toBe('blob:voice');
    expect(wrapper.find('button.nmorph-audio-preview__play-button').attributes('aria-label')).toBe(
      'Play voice-message.mp3'
    );
    expect(
      (
        wrapper.find('button.nmorph-audio-preview__play-button .nmorph-icon').element as HTMLElement
      ).style.getPropertyValue('--nmorph-icon-color')
    ).toBe('var(--nmorph-contrast-text-color)');
    expect(
      (
        wrapper.find('button.nmorph-audio-preview__play-button .nmorph-icon').element as HTMLElement
      ).style.getPropertyValue('--color')
    ).toBe('var(--nmorph-contrast-text-color)');
    expect(wrapper.find('.nmorph-audio-preview__range').exists()).toBe(true);
    expect(wrapper.find('.nmorph-audio-preview__actions').exists()).toBe(false);
    expect(wrapper.find('.nmorph-audio-preview__icon').exists()).toBe(false);
    expect(actionLinks).toHaveLength(1);
    expect(actionLinks[0].attributes('href')).toBe('blob:voice');
    expect(actionLinks[0].attributes('download')).toBe('voice-message.mp3');
    expect(wrapper.find('.nmorph-file-card__icon-action').exists()).toBe(false);

    wrapper.unmount();
  });

  it('renders video media preview inside the file card shell with shared title and metadata', async () => {
    const target = document.createElement('div');
    document.body.appendChild(target);

    const wrapper = mount(NmorphFileCard, {
      attachTo: target,
      global: {
        stubs: {
          Teleport: false,
        },
      },
      props: {
        name: 'clip.mp4',
        mimeType: 'video/mp4',
        size: 1048576,
        previewSrc: 'blob:clip',
        downloadHref: 'blob:clip',
        mediaPreview: 'video',
        surface: 'soft',
        showExtensionBadge: false,
        compact: true,
      },
    });

    await nextTick();

    const card = wrapper.find('.nmorph-file-card');
    const videoPreview = wrapper.find('.nmorph-file-card__video-preview.nmorph-video-preview');
    const video = videoPreview.find('video');
    const actionLinks = wrapper.findAll('.nmorph-file-card__actions .nmorph-file-card__action-link');

    expect(card.classes()).toEqual(
      expect.arrayContaining([
        'nmorph-file-card--soft',
        'nmorph-file-card--compact',
        'nmorph-file-card--media',
        'nmorph-file-card--media-video',
        'nmorph-file-card--media-visual',
      ])
    );
    expect(wrapper.find('.nmorph-file-card__name').text()).toBe('clip.mp4');
    expect(wrapper.find('.nmorph-file-card__meta').exists()).toBe(false);
    expect(wrapper.find('.nmorph-file-card__visual-size').text()).toBe('1 MB');
    expect(wrapper.find('.nmorph-file-card__icon').exists()).toBe(false);
    expect(wrapper.find('.nmorph-file-card__badge').exists()).toBe(false);
    expect(videoPreview.classes()).toEqual(
      expect.arrayContaining([
        'nmorph-video-preview--plain',
        'nmorph-video-preview--embedded',
        'nmorph-video-preview--compact',
        'nmorph-video-preview--no-meta',
      ])
    );
    expect(videoPreview.classes()).not.toContain('nmorph-video-preview--no-actions');
    expect(video.exists()).toBe(true);
    expect(video.attributes('src')).toBe('blob:clip');
    expect(video.attributes('controls')).toBeUndefined();
    expect(wrapper.find('.nmorph-video-preview__meta').exists()).toBe(false);
    expect(wrapper.find('button.nmorph-video-preview__play').attributes('aria-label')).toBe('Play clip.mp4');
    expect(
      (wrapper.find('button.nmorph-video-preview__play .nmorph-icon').element as HTMLElement).style.getPropertyValue(
        '--nmorph-icon-color'
      )
    ).toBe('var(--nmorph-contrast-text-color)');
    expect(
      (wrapper.find('button.nmorph-video-preview__play .nmorph-icon').element as HTMLElement).style.getPropertyValue(
        '--color'
      )
    ).toBe('var(--nmorph-contrast-text-color)');
    expect(wrapper.find('.nmorph-video-preview__actions').exists()).toBe(true);
    expect(wrapper.findAll('.nmorph-video-preview__action-button')).toHaveLength(2);
    expect(wrapper.find('.nmorph-video-preview__action-button--preview').attributes('aria-label')).toBe(
      'Preview clip.mp4'
    );
    expect(wrapper.find('.nmorph-video-preview__action-button--fullscreen').attributes('aria-label')).toBe(
      'Fullscreen clip.mp4'
    );
    expect(wrapper.find('.nmorph-video-preview__action-link').exists()).toBe(false);
    expect(actionLinks).toHaveLength(1);
    expect(actionLinks[0].attributes('href')).toBe('blob:clip');
    expect(actionLinks[0].attributes('download')).toBe('clip.mp4');
    expect(wrapper.find('.nmorph-file-card__icon-action').exists()).toBe(false);

    await wrapper.find('.nmorph-video-preview__action-button--preview').trigger('click');
    await nextTick();

    const galleryVideo = document.body.querySelector('.nmorph-media-gallery__video');

    expect(wrapper.emitted('open')).toHaveLength(1);
    expect(galleryVideo?.getAttribute('src')).toBe('blob:clip');
    expect(galleryVideo?.hasAttribute('controls')).toBe(true);

    wrapper.unmount();
    target.remove();
  });

  it('renders image media preview inside the file card shell with shared title and metadata', async () => {
    const target = document.createElement('div');
    document.body.appendChild(target);

    const wrapper = mount(NmorphFileCard, {
      attachTo: target,
      global: {
        stubs: {
          Teleport: false,
        },
      },
      props: {
        name: 'photo.jpg',
        mimeType: 'image/jpeg',
        size: 12345,
        previewSrc: 'blob:photo',
        downloadHref: 'blob:photo-download',
        mediaPreview: 'image',
        surface: 'soft',
        showExtensionBadge: false,
        iconSurface: false,
        compact: true,
      },
    });

    await nextTick();

    const card = wrapper.find('.nmorph-file-card');
    const imagePreviewFrame = wrapper.find('.nmorph-file-card__image-preview');
    const image = imagePreviewFrame.find('img');
    const actionLinks = wrapper.findAll('.nmorph-file-card__actions .nmorph-file-card__action-link');

    expect(card.classes()).toEqual(
      expect.arrayContaining([
        'nmorph-file-card--soft',
        'nmorph-file-card--compact',
        'nmorph-file-card--media',
        'nmorph-file-card--media-image',
        'nmorph-file-card--media-visual',
        'nmorph-file-card--icon-plain',
      ])
    );
    expect(wrapper.find('.nmorph-file-card__name').text()).toBe('photo.jpg');
    expect(wrapper.find('.nmorph-file-card__meta').exists()).toBe(false);
    expect(wrapper.find('.nmorph-file-card__visual-size').text()).toBe('12 KB');
    expect(wrapper.find('.nmorph-file-card__icon').exists()).toBe(false);
    expect(wrapper.find('.nmorph-file-card__badge').exists()).toBe(false);
    expect(imagePreviewFrame.attributes('title')).toBe('photo.jpg');
    expect(imagePreviewFrame.attributes('type')).toBe('button');
    expect(imagePreviewFrame.attributes('aria-label')).toBe('Preview photo.jpg');
    expect(image.attributes('src')).toBe('blob:photo');
    expect(image.attributes('alt')).toBe('photo.jpg');
    expect(actionLinks).toHaveLength(1);
    expect(actionLinks[0].attributes('href')).toBe('blob:photo-download');
    expect(actionLinks[0].attributes('download')).toBe('photo.jpg');

    await imagePreviewFrame.trigger('click');
    await nextTick();

    const galleryImage = document.body.querySelector('.nmorph-media-gallery .nmorph-image img');

    expect(wrapper.emitted('open')).toHaveLength(1);
    expect(galleryImage?.getAttribute('src')).toBe('blob:photo');
    expect(galleryImage?.getAttribute('alt')).toBe('photo.jpg');

    wrapper.unmount();
    target.remove();
  });

  it('can emit visual file preview without opening the internal gallery', async () => {
    const target = document.createElement('div');
    document.body.appendChild(target);

    const wrapper = mount(NmorphFileCard, {
      attachTo: target,
      global: {
        stubs: {
          Teleport: false,
        },
      },
      props: {
        name: 'clip.mp4',
        mimeType: 'video/mp4',
        previewSrc: 'blob:clip',
        mediaPreview: 'video',
        previewMode: 'emit',
      },
    });

    await nextTick();
    await wrapper.find('.nmorph-video-preview__action-button--preview').trigger('click');
    await nextTick();

    expect(wrapper.emitted('open')).toHaveLength(1);
    expect(document.body.querySelector('.nmorph-media-gallery__video')).toBeFalsy();

    wrapper.unmount();
    target.remove();
  });

  it('falls back to regular file card when audio media preview has no preview source', async () => {
    const wrapper = mount(NmorphFileCard, {
      props: {
        name: 'voice-message.mp3',
        mimeType: 'audio/mpeg',
        mediaPreview: 'audio',
      },
    });

    await nextTick();

    const card = wrapper.find('.nmorph-file-card');

    expect(card.classes()).not.toContain('nmorph-file-card--media-audio');
    expect(wrapper.find('.nmorph-file-card__audio-preview').exists()).toBe(false);
    expect(wrapper.find('.nmorph-file-card__actions').exists()).toBe(false);
    expect(wrapper.find('.nmorph-file-card__badge').text()).toBe('mp3');

    wrapper.unmount();
  });

  it('falls back to regular file card when video media preview has no preview source', async () => {
    const wrapper = mount(NmorphFileCard, {
      props: {
        name: 'clip.mp4',
        mimeType: 'video/mp4',
        mediaPreview: 'video',
      },
    });

    await nextTick();

    const card = wrapper.find('.nmorph-file-card');

    expect(card.classes()).not.toContain('nmorph-file-card--media-video');
    expect(wrapper.find('.nmorph-file-card__video-preview').exists()).toBe(false);
    expect(wrapper.find('.nmorph-file-card__actions').exists()).toBe(false);
    expect(wrapper.find('.nmorph-file-card__badge').text()).toBe('mp4');

    wrapper.unmount();
  });

  it('falls back to regular file card when image media preview has no preview source', async () => {
    const wrapper = mount(NmorphFileCard, {
      props: {
        name: 'photo.jpg',
        mimeType: 'image/jpeg',
        mediaPreview: 'image',
      },
    });

    await nextTick();

    const card = wrapper.find('.nmorph-file-card');

    expect(card.classes()).not.toContain('nmorph-file-card--media-image');
    expect(wrapper.find('.nmorph-file-card__image-preview').exists()).toBe(false);
    expect(wrapper.find('.nmorph-file-card__actions').exists()).toBe(false);
    expect(wrapper.find('.nmorph-file-card__badge').text()).toBe('jpg');

    wrapper.unmount();
  });

  it('lets the actions slot override default actions in image media preview mode', async () => {
    const wrapper = mount(NmorphFileCard, {
      props: {
        name: 'photo.jpg',
        mimeType: 'image/jpeg',
        previewSrc: 'blob:photo',
        downloadHref: 'blob:photo-download',
        mediaPreview: 'image',
        showDefaultActions: false,
      },
      slots: {
        actions: '<button class="custom-file-action" type="button">Remove</button>',
      },
    });

    await nextTick();

    expect(wrapper.find('.nmorph-file-card__image-preview').exists()).toBe(true);
    expect(wrapper.find('.custom-file-action').text()).toBe('Remove');
    expect(wrapper.findAll('.nmorph-file-card__actions .nmorph-file-card__action-link')).toHaveLength(0);

    wrapper.unmount();
  });

  it('renders embedded audio preview surfaces with playback control on the icon', async () => {
    const wrapper = mount(NmorphAudioPreview, {
      props: {
        src: 'blob:audio',
        name: '32.mp3',
        durationMs: 200000,
        surface: 'soft',
        downloadHref: 'blob:audio',
      },
    });

    await nextTick();

    const preview = wrapper.find('.nmorph-audio-preview');
    const iconButton = wrapper.find('button.nmorph-audio-preview__icon');

    expect(preview.classes()).toEqual(expect.arrayContaining(['nmorph-audio-preview--soft']));
    expect(iconButton.exists()).toBe(true);
    expect(iconButton.attributes('aria-label')).toBe('Play 32.mp3');
    expect(wrapper.find('.nmorph-audio-preview__play-indicator').exists()).toBe(true);
    expect(wrapper.find('.nmorph-audio-preview__play').exists()).toBe(false);
    expect(
      (wrapper.find('.nmorph-audio-preview__icon > .nmorph-icon').element as HTMLElement).style.getPropertyValue(
        '--nmorph-icon-color'
      )
    ).toBe('');
    expect(
      (
        wrapper.find('.nmorph-audio-preview__play-indicator .nmorph-icon').element as HTMLElement
      ).style.getPropertyValue('--nmorph-icon-color')
    ).toBe('var(--nmorph-contrast-text-color)');
    expect(
      (
        wrapper.find('.nmorph-audio-preview__play-indicator .nmorph-icon').element as HTMLElement
      ).style.getPropertyValue('--color')
    ).toBe('var(--nmorph-contrast-text-color)');

    wrapper.unmount();
  });

  it('keeps audio preview time away from the edge when actions are hidden', async () => {
    const wrapper = mount(NmorphAudioPreview, {
      props: {
        src: 'blob:audio',
        name: '32.mp3',
        durationMs: 200000,
        showDefaultActions: false,
      },
    });

    await nextTick();

    expect(wrapper.find('.nmorph-audio-preview').classes()).toContain('nmorph-audio-preview--no-actions');
    expect(wrapper.find('.nmorph-audio-preview__actions').exists()).toBe(false);

    wrapper.unmount();
  });

  it('renders embedded video preview surfaces with playback control over the media', async () => {
    const target = document.createElement('div');
    document.body.appendChild(target);

    const wrapper = mount(NmorphVideoPreview, {
      attachTo: target,
      global: {
        stubs: {
          Teleport: false,
        },
      },
      props: {
        src: 'blob:video',
        name: 'clip.mp4',
        surface: 'plain',
        embedded: true,
        showMeta: false,
        controls: false,
      },
    });

    await nextTick();

    const preview = wrapper.find('.nmorph-video-preview');
    const playButton = wrapper.find('button.nmorph-video-preview__play');
    const fullscreenButton = wrapper.find('.nmorph-video-preview__action-button--fullscreen');
    const previewButton = wrapper.find('.nmorph-video-preview__action-button--preview');

    expect(preview.classes()).toEqual(
      expect.arrayContaining([
        'nmorph-video-preview--plain',
        'nmorph-video-preview--embedded',
        'nmorph-video-preview--no-meta',
      ])
    );
    expect(wrapper.find('.nmorph-video-preview__meta').exists()).toBe(false);
    expect(playButton.exists()).toBe(true);
    expect(playButton.attributes('aria-label')).toBe('Play clip.mp4');
    expect((playButton.find('.nmorph-icon').element as HTMLElement).style.getPropertyValue('--nmorph-icon-color')).toBe(
      'var(--nmorph-contrast-text-color)'
    );
    expect((playButton.find('.nmorph-icon').element as HTMLElement).style.getPropertyValue('--color')).toBe(
      'var(--nmorph-contrast-text-color)'
    );
    expect(fullscreenButton.exists()).toBe(true);
    expect(previewButton.exists()).toBe(true);
    expect(
      (fullscreenButton.find('.nmorph-icon').element as HTMLElement).style.getPropertyValue('--nmorph-icon-color')
    ).toBe('var(--nmorph-contrast-text-color)');

    await wrapper.find('video').trigger('play');

    expect(preview.classes()).toEqual(expect.arrayContaining(['nmorph-video-preview--playing']));
    expect(playButton.attributes('aria-label')).toBe('Pause clip.mp4');

    const requestFullscreen = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(wrapper.find('video').element, 'requestFullscreen', {
      configurable: true,
      value: requestFullscreen,
    });

    await fullscreenButton.trigger('click');

    expect(requestFullscreen).toHaveBeenCalledTimes(1);
    expect(wrapper.emitted('fullscreen')).toHaveLength(1);

    await previewButton.trigger('click');
    await nextTick();

    const portal = document.body.querySelector('.nmorph-video-preview__portal');
    const portalVideo = portal?.querySelector('video');

    expect(portal).toBeTruthy();
    expect(portalVideo?.getAttribute('src')).toBe('blob:video');
    expect(portalVideo?.hasAttribute('controls')).toBe(true);
    expect(wrapper.emitted('preview')).toHaveLength(1);

    wrapper.unmount();
    target.remove();
  });

  it('can emit video preview without opening its internal overlay', async () => {
    const target = document.createElement('div');
    document.body.appendChild(target);

    const wrapper = mount(NmorphVideoPreview, {
      attachTo: target,
      global: {
        stubs: {
          Teleport: false,
        },
      },
      props: {
        src: 'blob:video',
        name: 'clip.mp4',
        previewMode: 'emit',
      },
    });

    await nextTick();
    await wrapper.find('.nmorph-video-preview__action-button--preview').trigger('click');
    await nextTick();

    expect(wrapper.emitted('preview')).toHaveLength(1);
    expect(document.body.querySelector('.nmorph-video-preview__portal')).toBeFalsy();

    wrapper.unmount();
    target.remove();
  });

  it('renders pdf file preview action on the file icon', async () => {
    const wrapper = mount(NmorphFileCard, {
      props: {
        name: 'report.pdf',
        mimeType: 'application/pdf',
        previewSrc: 'blob:report',
        downloadHref: 'blob:download-report',
      },
    });

    await nextTick();

    const iconAction = wrapper.find('.nmorph-file-card__icon-action');
    const defaultActions = wrapper.findAll('.nmorph-file-card__actions .nmorph-file-card__action-link');

    expect(iconAction.exists()).toBe(true);
    expect(iconAction.attributes('href')).toBe('blob:report');
    expect(iconAction.attributes('target')).toBe('_blank');
    expect(iconAction.attributes('rel')).toBe('noopener noreferrer');
    expect(
      (wrapper.find('.nmorph-file-card__icon > .nmorph-icon').element as HTMLElement).style.getPropertyValue(
        '--nmorph-icon-color'
      )
    ).toBe('');
    expect((iconAction.find('.nmorph-icon').element as HTMLElement).style.getPropertyValue('--nmorph-icon-color')).toBe(
      'var(--nmorph-contrast-text-color)'
    );
    expect((iconAction.find('.nmorph-icon').element as HTMLElement).style.getPropertyValue('--color')).toBe(
      'var(--nmorph-contrast-text-color)'
    );
    expect(defaultActions).toHaveLength(1);
    expect(defaultActions[0].attributes('href')).toBe('blob:download-report');
    expect(defaultActions[0].attributes('download')).toBe('report.pdf');

    iconAction.element.addEventListener('click', (event) => event.preventDefault());
    await iconAction.trigger('click');

    expect(wrapper.emitted('open')).toHaveLength(1);

    wrapper.unmount();
  });

  it('uses download href as a pdf preview fallback when preview source is missing', async () => {
    const wrapper = mount(NmorphFileCard, {
      props: {
        name: 'report.pdf',
        mimeType: 'application/pdf',
        downloadHref: 'blob:download-report',
      },
    });

    await nextTick();

    const iconAction = wrapper.find('.nmorph-file-card__icon-action');
    const defaultActions = wrapper.findAll('.nmorph-file-card__actions .nmorph-file-card__action-link');

    expect(iconAction.exists()).toBe(true);
    expect(iconAction.attributes('href')).toBe('blob:download-report');
    expect(iconAction.attributes('target')).toBe('_blank');
    expect(iconAction.attributes('rel')).toBe('noopener noreferrer');
    expect(defaultActions).toHaveLength(1);
    expect(defaultActions[0].attributes('download')).toBe('report.pdf');

    iconAction.element.addEventListener('click', (event) => event.preventDefault());
    await iconAction.trigger('click');

    expect(wrapper.emitted('open')).toHaveLength(1);

    wrapper.unmount();
  });

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

  it('passes external link attributes to the inner anchor', async () => {
    const wrapper = mount(NmorphLink, {
      props: {
        href: 'https://example.com',
        target: 'blank',
        rel: 'noopener noreferrer nofollow ugc',
        referrerpolicy: 'no-referrer',
        download: 'message-link.html',
        ariaLabel: 'Open external message link',
        title: 'External link',
      },
    });

    await nextTick();

    const link = wrapper.find('a');

    expect(link.attributes('href')).toBe('https://example.com');
    expect(link.attributes('target')).toBe('_blank');
    expect(link.attributes('rel')).toBe('noopener noreferrer nofollow ugc');
    expect(link.attributes('referrerpolicy')).toBe('no-referrer');
    expect(link.attributes('download')).toBe('message-link.html');
    expect(link.attributes('aria-label')).toBe('Open external message link');
    expect(link.attributes('title')).toBe('External link');
    expect(wrapper.attributes('rel')).toBeUndefined();
    expect(wrapper.attributes('referrerpolicy')).toBeUndefined();

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

  it('renders audio meter variants with meter semantics and threshold state', () => {
    const wrapper = mount(NmorphAudioMeter, {
      props: {
        value: 0.75,
        variant: 'line',
        label: 'Mic level',
      },
    });

    const meter = wrapper.find('.nmorph-audio-meter');

    expect(meter.attributes('role')).toBe('meter');
    expect(meter.attributes('aria-label')).toBe('Mic level');
    expect(meter.attributes('aria-valuenow')).toBe('75');
    expect(meter.classes()).toEqual(expect.arrayContaining(['nmorph-audio-meter--line', 'nmorph-audio-meter--warn']));
    expect((meter.element as HTMLElement).style.getPropertyValue('--nmorph-audio-meter-percent')).toBe('75%');

    wrapper.unmount();
  });

  it('renders media tile fallback, state overlays and assigns srcObject to video', async () => {
    const descriptor = Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, 'srcObject');
    let assignedSrcObject: unknown = null;

    Object.defineProperty(HTMLMediaElement.prototype, 'srcObject', {
      configurable: true,
      get() {
        return assignedSrcObject;
      },
      set(value) {
        assignedSrcObject = value;
      },
    });

    try {
      const stream = { id: 'stream' } as MediaStream;
      const wrapper = mount(NmorphMediaTile, {
        props: {
          srcObject: stream,
          name: 'Ada Lovelace',
          fit: 'contain',
          mirrored: true,
          micMuted: true,
          screenSharing: true,
          selected: true,
          speaking: true,
        },
      });

      await nextTick();

      const tile = wrapper.find('.nmorph-media-tile');

      expect(tile.classes()).toEqual(
        expect.arrayContaining([
          'nmorph-media-tile--contain',
          'nmorph-media-tile--mirrored',
          'nmorph-media-tile--selected',
          'nmorph-media-tile--speaking',
          'nmorph-media-tile--screen-sharing',
        ])
      );
      expect(wrapper.find('video').exists()).toBe(true);
      expect(assignedSrcObject).toStrictEqual(stream);
      expect(wrapper.findAll('.nmorph-media-tile__status-item')).toHaveLength(2);

      await wrapper.setProps({ videoOff: true });
      await nextTick();

      expect(wrapper.find('.nmorph-media-tile__fallback').text()).toContain('Ada Lovelace');

      wrapper.unmount();
    } finally {
      if (descriptor) Object.defineProperty(HTMLMediaElement.prototype, 'srcObject', descriptor);
      else delete (HTMLMediaElement.prototype as HTMLMediaElement & { srcObject?: unknown }).srcObject;
    }
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
      expect(wrapper.find('.nmorph-image-preview').exists()).toBe(false);
      expect(wrapper.find('.nmorph-file-card').exists()).toBe(true);
      expect(wrapper.find('.nmorph-file-card__name').text()).toBe('report.pdf');
    } finally {
      wrapper.unmount();
      objectUrls.restore();
    }
  });

  it('renders video and audio previews for uploaded media files', async () => {
    const objectUrls = mockObjectUrlApi(['blob:video', 'blob:audio']);
    const wrapper = mount(NmorphFileUpload, {
      props: {
        modelValue: [],
        multiple: true,
      },
    });

    try {
      const inputWrapper = wrapper.find('input[type="file"]');
      const input = inputWrapper.element as HTMLInputElement;

      setFileInputState(input, [createTestFile('clip.mp4', 'video/mp4'), createTestFile('voice.mp3', 'audio/mpeg')]);
      await inputWrapper.trigger('change');
      await nextTick();

      expect(wrapper.find('.nmorph-video-preview').exists()).toBe(true);
      expect(wrapper.find('.nmorph-audio-preview').exists()).toBe(true);
      expect(wrapper.findAll('.nmorph-file-upload__file')).toHaveLength(2);
    } finally {
      wrapper.unmount();
      objectUrls.restore();
    }
  });

  it('validates file values with file-specific form rules', () => {
    const pngFile = createTestFile('avatar.png', 'image/png');
    const pdfFile = createTestFile('report.pdf', 'application/pdf');
    const largeFile = new File(['12345'], 'large.png', { type: 'image/png' });

    const maxSizeValidation = useFieldValidation({
      inputValue: [largeFile],
      rules: [{ fileMaxSize: 3, error: 'File is too large' }],
    });
    maxSizeValidation.validate();

    expect(maxSizeValidation.valid.value).toBe(false);
    expect(maxSizeValidation.errors.value).toEqual(['File is too large']);

    const allowedTypesValidation = useFieldValidation({
      inputValue: [{ data: pdfFile, previewUrl: 'blob:pdf' }],
      rules: [{ fileAllowedTypes: ['png'], error: 'Unsupported file type' }],
    });
    allowedTypesValidation.validate();

    expect(allowedTypesValidation.valid.value).toBe(false);
    expect(allowedTypesValidation.errors.value).toEqual(['Unsupported file type']);

    const maxCountValidation = useFieldValidation({
      inputValue: [pngFile, pdfFile],
      rules: [{ fileMaxCount: 1, error: 'Too many files' }],
    });
    maxCountValidation.validate();

    expect(maxCountValidation.valid.value).toBe(false);
    expect(maxCountValidation.errors.value).toEqual(['Too many files']);
  });

  it('rejects file upload through NmorphFormItem rules before accepting a file', async () => {
    const objectUrls = mockObjectUrlApi(['blob:valid']);
    const wrapper = mount(
      defineComponent({
        components: { NmorphFileUpload, NmorphForm, NmorphFormItem },
        setup() {
          const formRef = ref(null);
          const formValue = reactive({
            avatar: {
              value: [] as FileUploadValue[],
              rules: [{ fileMaxSize: 3, error: 'File is too large' }],
            },
          });

          return { formRef, formValue };
        },
        template: `
          <NmorphForm ref="formRef" :value="formValue">
            <NmorphFormItem id="avatar">
              <NmorphFileUpload v-model="formValue.avatar.value" />
            </NmorphFormItem>
          </NmorphForm>
        `,
      })
    );

    try {
      const inputWrapper = wrapper.find('input[type="file"]');
      const input = inputWrapper.element as HTMLInputElement;

      setFileInputState(input, [new File(['12345'], 'large.png', { type: 'image/png' })]);
      await inputWrapper.trigger('change');
      await nextTick();

      const upload = wrapper.findComponent(NmorphFileUpload);
      const getAvatarErrors = () => {
        const errors = wrapper.vm.formRef.formData.fields.avatar.errors;
        return Array.isArray(errors) ? errors : errors.value;
      };
      const getIsAnyTouched = () => {
        const touched = wrapper.vm.formRef.formData.isAnyTouched;
        return typeof touched === 'boolean' ? touched : touched.value;
      };

      expect(upload.emitted('update:model-value')).toBeUndefined();
      expect(upload.emitted('on-file-validation-error')?.at(-1)?.[0]).toMatchObject({
        errors: ['File is too large'],
      });
      expect(wrapper.vm.formValue.avatar.value).toHaveLength(0);
      expect(getAvatarErrors()).toEqual(['File is too large']);
      expect(getIsAnyTouched()).toBe(true);
      expect(wrapper.text()).toContain('File is too large');
      expect(objectUrls.createObjectURL).not.toHaveBeenCalled();

      setFileInputState(input, [new File(['ok'], 'avatar.png', { type: 'image/png' })]);
      await inputWrapper.trigger('change');
      await nextTick();
      await nextTick();

      expect(wrapper.vm.formValue.avatar.value).toHaveLength(1);
      expect(wrapper.vm.formValue.avatar.value[0].previewUrl).toBe('blob:valid');
      expect(getAvatarErrors()).toEqual([]);
      expect(objectUrls.createObjectURL).toHaveBeenCalledTimes(1);
    } finally {
      wrapper.unmount();
      objectUrls.restore();
    }
  });

  it('replaces single file uploads and revokes the previous generated preview URL', async () => {
    const objectUrls = mockObjectUrlApi(['blob:first', 'blob:second']);
    const wrapper = mount(NmorphFileUpload, {
      props: {
        modelValue: [],
      },
    });

    try {
      const inputWrapper = wrapper.find('input[type="file"]');
      const input = inputWrapper.element as HTMLInputElement;

      setFileInputState(input, [createTestFile('first.png')]);
      await inputWrapper.trigger('change');
      await nextTick();

      const firstPayload = wrapper.emitted('update:model-value')?.at(-1)?.[0] as FileUploadValue[];
      await wrapper.setProps({ modelValue: firstPayload });

      setFileInputState(input, [createTestFile('second.png')]);
      await inputWrapper.trigger('change');
      await nextTick();

      const secondPayload = wrapper.emitted('update:model-value')?.at(-1)?.[0] as FileUploadValue[];

      expect(secondPayload).toHaveLength(1);
      expect(secondPayload[0].data.name).toBe('second.png');
      expect(secondPayload[0].previewUrl).toBe('blob:second');
      expect(objectUrls.revokeObjectURL).toHaveBeenCalledWith('blob:first');
    } finally {
      wrapper.unmount();
      objectUrls.restore();
    }
  });

  it('binds a nested text input to the NmorphFormItem field when modelValue is omitted', async () => {
    const wrapper = mount(
      defineComponent({
        components: { NmorphForm, NmorphFormItem, NmorphTextInput },
        setup() {
          const formRef = ref(null);
          const formValue = reactive({
            chatName: {
              value: '',
              rules: [{ pattern: /.{3,}/, error: 'Too short' }],
            },
          });

          return { formRef, formValue };
        },
        template: `
          <NmorphForm ref="formRef" :value="formValue">
            <NmorphFormItem id="chatName">
              <NmorphTextInput />
            </NmorphFormItem>
          </NmorphForm>
        `,
      })
    );

    const input = wrapper.find('input');
    await input.setValue('ab');
    await nextTick();

    expect(wrapper.vm.formValue.chatName.value).toBe('ab');
    expect(wrapper.text()).toContain('Too short');
    expect(wrapper.findComponent(NmorphTextInput).emitted('update:model-value')?.at(-1)).toEqual(['ab']);

    await input.setValue('abcd');
    await nextTick();

    const field = wrapper.vm.formRef.formData.fields.chatName;
    expect(wrapper.vm.formValue.chatName.value).toBe('abcd');
    expect(Array.isArray(field.errors) ? field.errors : field.errors.value).toEqual([]);
    expect(typeof field.valid === 'boolean' ? field.valid : field.valid.value).toBe(true);

    wrapper.unmount();
  });

  it('keeps explicit text input v-model controlled inside NmorphFormItem', async () => {
    const wrapper = mount(
      defineComponent({
        components: { NmorphForm, NmorphFormItem, NmorphTextInput },
        setup() {
          const localValue = ref('');
          const formValue = reactive({
            chatName: {
              value: '',
              rules: [{ pattern: /.{3,}/, error: 'Too short' }],
            },
          });

          return { formValue, localValue };
        },
        template: `
          <NmorphForm :value="formValue">
            <NmorphFormItem id="chatName">
              <NmorphTextInput v-model="localValue" />
            </NmorphFormItem>
          </NmorphForm>
        `,
      })
    );

    await wrapper.find('input').setValue('local');
    await nextTick();

    expect(wrapper.vm.localValue).toBe('local');
    expect(wrapper.vm.formValue.chatName.value).toBe('');

    wrapper.unmount();
  });

  it('binds checkbox group selections to the NmorphFormItem field when modelValue is omitted', async () => {
    const wrapper = mount(
      defineComponent({
        components: { NmorphCheckboxGroup, NmorphForm, NmorphFormItem },
        setup() {
          const formValue = reactive({
            browsers: {
              value: [] as string[],
              rules: [{ arrayCompareType: 'contains-one', compareValue: ['chrome'], error: 'Chrome is required' }],
            },
          });

          return { checkboxOptions, formValue };
        },
        template: `
          <NmorphForm :value="formValue">
            <NmorphFormItem id="browsers">
              <NmorphCheckboxGroup :options="checkboxOptions" />
            </NmorphFormItem>
          </NmorphForm>
        `,
      })
    );

    await wrapper.findAll('input[type="checkbox"]')[0].trigger('change');
    await nextTick();

    expect(wrapper.vm.formValue.browsers.value).toEqual(['first']);

    wrapper.unmount();
  });

  it('binds file upload value to the NmorphFormItem field when modelValue is omitted', async () => {
    const objectUrls = mockObjectUrlApi(['blob:avatar']);
    const wrapper = mount(
      defineComponent({
        components: { NmorphFileUpload, NmorphForm, NmorphFormItem },
        setup() {
          const formValue = reactive({
            avatar: {
              value: [] as FileUploadValue[],
              rules: [{ fileMaxSize: 3, error: 'File is too large' }],
            },
          });

          return { formValue };
        },
        template: `
          <NmorphForm :value="formValue">
            <NmorphFormItem id="avatar">
              <NmorphFileUpload />
            </NmorphFormItem>
          </NmorphForm>
        `,
      })
    );

    try {
      const inputWrapper = wrapper.find('input[type="file"]');
      const input = inputWrapper.element as HTMLInputElement;

      setFileInputState(input, [new File(['12345'], 'large.png', { type: 'image/png' })]);
      await inputWrapper.trigger('change');
      await nextTick();

      expect(wrapper.vm.formValue.avatar.value).toHaveLength(0);
      expect(objectUrls.createObjectURL).not.toHaveBeenCalled();
      expect(wrapper.text()).toContain('File is too large');

      setFileInputState(input, [new File(['ok'], 'avatar.png', { type: 'image/png' })]);
      await inputWrapper.trigger('change');
      await nextTick();

      expect(wrapper.vm.formValue.avatar.value).toHaveLength(1);
      expect(wrapper.vm.formValue.avatar.value[0].previewUrl).toBe('blob:avatar');
      expect(wrapper.findComponent(NmorphFileUpload).emitted('update:model-value')?.at(-1)?.[0]).toHaveLength(1);
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

    const fileUpload = mount(NmorphFileUpload, {
      props: {
        compact: true,
        layout: 'inline',
        fileNameWidth: 180,
      },
    });
    const fileUploadElement = fileUpload.find('.nmorph-file-upload').element as HTMLElement;

    expect(fileUpload.find('.nmorph-file-upload').classes()).toEqual(
      expect.arrayContaining(['nmorph-file-upload--compact', 'nmorph-file-upload--layout-inline'])
    );
    expect(fileUploadElement.style.getPropertyValue('--nmorph-file-upload-name-width')).toBe('180px');
    fileUpload.unmount();

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

  it('supports toggle button state with aria-pressed and danger styling', async () => {
    const wrapper = mount(NmorphButton, {
      props: {
        toggle: true,
        modelValue: false,
        danger: true,
        shape: 'circle',
      },
      slots: {
        'icon-only': '<span>Mic</span>',
      },
    });

    const button = wrapper.find('.nmorph-button__content');

    expect(button.attributes('aria-pressed')).toBe('false');
    expect(wrapper.find('.nmorph-button').classes()).toEqual(
      expect.arrayContaining(['nmorph-button--danger', 'nmorph-button--circle'])
    );

    await button.trigger('click');

    expect(wrapper.emitted('update:model-value')?.at(-1)).toEqual([true]);

    await wrapper.setProps({ modelValue: true });

    expect(button.attributes('aria-pressed')).toBe('true');
    expect(wrapper.find('.nmorph-button').classes()).toContain('nmorph-button--active');

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

  it('keeps tooltip trigger and popup as direct positioning children', async () => {
    const wrapper = mount(NmorphTooltip, {
      props: {
        forceShow: true,
        text: 'Tooltip',
      },
      slots: {
        default: '<span class="tooltip-target">Target</span>',
      },
    });

    await nextTick();

    const content = wrapper.find('.nmorph-tooltip__content');
    const trigger = wrapper.find('.nmorph-tooltip__trigger');
    const popup = wrapper.find('.nmorph-tooltip__info-content');

    expect(trigger.exists()).toBe(true);
    expect(trigger.find('.tooltip-target').exists()).toBe(true);
    expect(trigger.element.parentElement).toBe(content.element);
    expect(popup.element.parentElement).toBe(content.element);

    wrapper.unmount();
  });

  it('supports tooltip content slot, click trigger, manual trigger and disabled state', async () => {
    const wrapper = mount(NmorphTooltip, {
      props: {
        trigger: 'click',
      },
      slots: {
        default: '<button class="tooltip-target">Target</button>',
        content: '<strong class="tooltip-content">Nickname</strong>',
      },
    });

    expect(wrapper.find('.tooltip-content').exists()).toBe(false);

    await wrapper.find('.tooltip-target').trigger('click', { button: 0 });
    await nextTick();

    expect(wrapper.find('.tooltip-content').text()).toBe('Nickname');

    await wrapper.setProps({ disabled: true });
    await nextTick();

    expect(wrapper.find('.tooltip-content').exists()).toBe(false);

    wrapper.unmount();

    const manual = mount(NmorphTooltip, {
      props: {
        trigger: 'manual',
      },
      slots: {
        default: '<button class="tooltip-target">Target</button>',
        content: '<span class="manual-content">Manual content</span>',
      },
    });

    await manual.find('.tooltip-target').trigger('click', { button: 0 });
    await nextTick();

    expect(manual.find('.manual-content').exists()).toBe(false);

    (manual.vm as unknown as { open: () => void }).open();
    await nextTick();

    expect(manual.find('.manual-content').text()).toBe('Manual content');

    manual.unmount();
  });

  it('can disable touch click activation for tooltips', async () => {
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

    const wrapper = mount(NmorphTooltip, {
      props: {
        trigger: 'click',
        touch: 'disable',
      },
      slots: {
        default: '<button class="tooltip-target">Target</button>',
        content: '<span class="touch-content">Touch content</span>',
      },
    });

    const target = wrapper.find('.tooltip-target').element as HTMLElement;

    target.dispatchEvent(createPointerEvent('pointerdown', { pointerType: 'touch' }));
    target.click();
    await nextTick();

    expect(wrapper.find('.touch-content').exists()).toBe(false);

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

  it('renders notification duration indicator and forwards alert border props', async () => {
    const wrapper = mount(NmorphNotificationProvider, {
      props: {
        notifications: [
          {
            id: 'timed',
            type: 'info',
            title: 'Timed',
            content: 'Content',
            duration: 3000,
            bordered: false,
          },
        ],
      },
    });

    await nextTick();

    const notification = wrapper.find('.nmorph-notification-provider__notification');
    const alert = wrapper.find('.nmorph-alert');

    expect(notification.classes()).toContain('nmorph-notification-provider__notification--with-duration');
    expect(
      (notification.element as HTMLElement).style.getPropertyValue('--nmorph-notification-provider-duration')
    ).toBe('3000ms');
    expect(wrapper.find('.nmorph-notification-provider__duration').exists()).toBe(true);
    expect(wrapper.find('.nmorph-notification-provider__duration-value').text()).toBe('3s');
    expect(alert.classes()).not.toContain('nmorph-alert--bordered');

    wrapper.unmount();
  });

  it('updates notification duration countdown label as time passes', async () => {
    vi.useFakeTimers();

    const wrapper = mount(NmorphNotificationProvider, {
      props: {
        notifications: [
          {
            id: 'timed',
            type: 'error',
            title: 'Timed',
            content: 'Content',
            duration: 60000,
          },
        ],
      },
    });

    try {
      await nextTick();

      expect(wrapper.find('.nmorph-notification-provider__duration-value').text()).toBe('60s');

      await vi.advanceTimersByTimeAsync(1000);
      await nextTick();

      expect(wrapper.find('.nmorph-notification-provider__duration-value').text()).toBe('59s');

      await vi.advanceTimersByTimeAsync(58000);
      await nextTick();

      expect(wrapper.find('.nmorph-notification-provider__duration-value').text()).toBe('1s');
    } finally {
      wrapper.unmount();
      vi.useRealTimers();
    }
  });

  it('can hide only notification duration value while keeping the progress bar', async () => {
    const wrapper = mount(NmorphNotificationProvider, {
      props: {
        notifications: [
          {
            id: 'timed',
            type: 'info',
            title: 'Timed',
            content: 'Content',
            duration: 3000,
            showDurationValue: false,
          },
        ],
      },
    });

    await nextTick();

    const duration = wrapper.find('.nmorph-notification-provider__duration');
    const alert = wrapper.find('.nmorph-alert');

    expect(duration.exists()).toBe(true);
    expect(duration.attributes('title')).toBeUndefined();
    expect(alert.attributes('showdurationvalue')).toBeUndefined();
    expect(alert.attributes('duration')).toBeUndefined();
    expect(wrapper.find('.nmorph-notification-provider__duration-track').exists()).toBe(true);
    expect(wrapper.find('.nmorph-notification-provider__duration-bar').exists()).toBe(true);
    expect(wrapper.find('.nmorph-notification-provider__duration-value').exists()).toBe(false);

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
    expect(items[1].style.getPropertyValue('--nmorph-context-menu-item-color')).toBe('var(--nmorph-error-text-color)');
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

  it('normalizes select emitted values for nullable single and multiple modes', async () => {
    const target = document.createElement('div');
    document.body.appendChild(target);

    const single = mount(NmorphSelect, {
      props: {
        modelValue: 'first',
        nullable: true,
        open: true,
        options,
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

    const firstOption = Array.from(document.body.querySelectorAll<HTMLElement>('.nmorph-select-option')).find(
      (option) => option.textContent?.includes('First')
    );

    firstOption?.click();
    await nextTick();

    expect(single.emitted('update:model-value')?.at(-1)).toEqual([null]);

    single.unmount();
    await nextTick();

    const multiple = mount(NmorphSelect, {
      props: {
        modelValue: [],
        multiple: true,
        open: true,
        options,
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

    const secondOption = Array.from(document.body.querySelectorAll<HTMLElement>('.nmorph-select-option')).find(
      (option) => option.textContent?.includes('Second')
    );

    secondOption?.click();
    await nextTick();

    expect(multiple.emitted('update:model-value')?.at(-1)).toEqual([['second']]);

    multiple.unmount();
    target.remove();
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

  it('passes fit prop to the image preview trigger image', async () => {
    const wrapper = mount(NmorphImagePreview, {
      props: { src: imageSrc, alt: 'Preview', fit: 'contain' },
    });

    await nextTick();

    const image = wrapper.find('.nmorph-image').element as HTMLElement;

    expect(image.style.getPropertyValue('--nmorph-image-fit')).toBe('contain');

    wrapper.unmount();
  });

  it('renders image preview gallery trigger and opens the clicked image', async () => {
    const target = document.createElement('div');
    document.body.appendChild(target);
    const gallerySources = ['preview-one.png', 'preview-two.png', 'preview-three.png'];

    const wrapper = mount(NmorphImagePreview, {
      props: {
        src: gallerySources,
        alt: 'Gallery preview',
        triggerView: 'gallery',
        triggerLimit: 2,
        width: 40,
        height: 32,
      },
      attachTo: target,
      global: {
        stubs: {
          Teleport: false,
        },
      },
    });

    await nextTick();

    const thumbnails = wrapper.findAll('.nmorph-image-preview__trigger-item');

    expect(wrapper.find('.nmorph-image-preview').classes()).toContain('nmorph-image-preview--gallery-trigger');
    expect(thumbnails).toHaveLength(2);
    expect(wrapper.find('.nmorph-image-preview__trigger-more').text()).toBe('+1');

    await thumbnails[1].trigger('click');
    await nextTick();

    const previewImage = document.body.querySelector('.nmorph-image-preview__content img');

    expect(wrapper.emitted('update:model-value')?.at(-1)).toEqual([true]);
    expect(previewImage?.getAttribute('src')).toBe(gallerySources[1]);

    wrapper.unmount();
    target.remove();
  });

  it('mounts image preview portal only while preview is open', async () => {
    const target = document.createElement('div');
    document.body.appendChild(target);

    const wrapper = mount(
      defineComponent({
        components: { NmorphImagePreview },
        setup: () => ({ imageSrc }),
        template: `
          <div>
            <NmorphImagePreview :src="imageSrc" alt="Preview 1" />
            <NmorphImagePreview :src="imageSrc" alt="Preview 2" />
            <NmorphImagePreview :src="imageSrc" alt="Preview 3" />
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

    const getPortals = () => Array.from(document.body.querySelectorAll<HTMLElement>('.nmorph-image-preview__portal'));

    expect(getPortals()).toHaveLength(0);

    await wrapper.findAll('.nmorph-image-preview__trigger')[1].trigger('click');
    await nextTick();

    expect(getPortals()).toHaveLength(1);

    const overlay = getPortals()[0].querySelector<HTMLElement>('.nmorph-overlay');
    overlay?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await nextTick();

    expect(getPortals()).toHaveLength(0);

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

  it('navigates image preview with keyboard arrows', async () => {
    const target = document.createElement('div');
    document.body.appendChild(target);
    const gallerySources = ['preview-one.png', 'preview-two.png', 'preview-three.png'];

    const wrapper = mount(NmorphImagePreview, {
      props: {
        modelValue: true,
        src: gallerySources,
        initialIndex: 1,
        alt: 'Preview',
        showNavigationButtons: false,
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

    const getPreviewImage = () => document.body.querySelector('.nmorph-image-preview__content img');

    expect(getPreviewImage()?.getAttribute('src')).toBe(gallerySources[1]);
    expect(document.body.querySelector('.nmorph-image-preview__left')).toBeFalsy();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    await nextTick();

    expect(getPreviewImage()?.getAttribute('src')).toBe(gallerySources[2]);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    await nextTick();

    expect(getPreviewImage()?.getAttribute('src')).toBe(gallerySources[0]);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    await nextTick();

    expect(getPreviewImage()?.getAttribute('src')).toBe(gallerySources[2]);

    wrapper.unmount();
    target.remove();
  });

  it('does not force focus to image preview controls when opened', async () => {
    const target = document.createElement('div');
    const focusedBeforeOpen = document.createElement('button');
    document.body.appendChild(focusedBeforeOpen);
    document.body.appendChild(target);
    focusedBeforeOpen.focus();

    const wrapper = mount(NmorphImagePreview, {
      props: { modelValue: true, src: imageSrc, alt: 'Preview' },
      attachTo: target,
      global: {
        stubs: {
          Teleport: false,
        },
      },
    });

    await nextTick();
    await nextTick();

    const firstActionButton = document.body.querySelector('.nmorph-image-preview__actions button');

    expect(firstActionButton).toBeTruthy();
    expect(document.activeElement).toBe(focusedBeforeOpen);
    expect(document.activeElement).not.toBe(firstActionButton);

    wrapper.unmount();
    target.remove();
    focusedBeforeOpen.remove();
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

  it('renders mixed media gallery and navigates between image and video', async () => {
    const target = document.createElement('div');
    document.body.appendChild(target);
    const items = [
      {
        kind: 'image' as const,
        src: imageSrc,
        name: 'photo.jpg',
        alt: 'Photo',
        size: 245760,
        downloadHref: 'blob:photo-download',
      },
      {
        kind: 'video' as const,
        src: 'blob:clip',
        name: 'clip.mp4',
        poster: 'blob:poster',
        size: 7340032,
        downloadHref: 'blob:clip-download',
        muted: true,
      },
    ];

    const wrapper = mount(NmorphMediaGallery, {
      props: {
        modelValue: true,
        items,
        initialIndex: 0,
      },
      attachTo: target,
      global: {
        stubs: {
          Teleport: false,
        },
      },
    });

    await nextTick();

    const gallery = document.body.querySelector('.nmorph-media-gallery') as HTMLElement;
    const image = gallery.querySelector('.nmorph-image img') as HTMLImageElement;

    expect(gallery).toBeTruthy();
    expect(gallery.querySelector('.nmorph-media-gallery__left .nmorph-button')).toBeTruthy();
    expect(gallery.querySelector('.nmorph-media-gallery__right .nmorph-button')).toBeTruthy();
    expect(gallery.querySelector('.nmorph-media-gallery__actions .nmorph-button')).toBeTruthy();
    expect(image.getAttribute('src')).toBe(imageSrc);
    expect(image.getAttribute('alt')).toBe('Photo');
    expect(gallery.querySelector('.nmorph-media-gallery__file-name')?.textContent).toBe('photo.jpg');
    expect(gallery.querySelector('.nmorph-media-gallery__file-size')?.textContent).toBe('240 KB');
    expect(gallery.querySelector('.nmorph-media-gallery__file-action')?.getAttribute('href')).toBe(
      'blob:photo-download'
    );

    (gallery.querySelector('.nmorph-media-gallery__file-action') as HTMLElement).click();

    expect(wrapper.emitted('download')?.[0]).toEqual([items[0], 0]);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    await nextTick();

    const video = document.body.querySelector('.nmorph-media-gallery__video') as HTMLVideoElement;
    const playButton = document.body.querySelector('button.nmorph-media-gallery__play') as HTMLButtonElement;
    const fileActions = Array.from(document.body.querySelectorAll('.nmorph-media-gallery__file-action'));

    expect(video.getAttribute('src')).toBe('blob:clip');
    expect(video.getAttribute('poster')).toBe('blob:poster');
    expect(video.hasAttribute('controls')).toBe(true);
    expect(video.hasAttribute('muted')).toBe(true);
    expect(document.body.querySelector('.nmorph-media-gallery__file-name')?.textContent).toBe('clip.mp4');
    expect(document.body.querySelector('.nmorph-media-gallery__file-size')?.textContent).toBe('7 MB');
    expect(fileActions).toHaveLength(2);
    expect(fileActions[0].getAttribute('aria-label')).toBe('Fullscreen clip.mp4');
    expect(fileActions[1].getAttribute('href')).toBe('blob:clip-download');
    expect(playButton).toBeTruthy();
    expect(playButton.getAttribute('aria-label')).toBe('Play clip.mp4');
    expect(wrapper.emitted('update:active-index')?.[0]).toEqual([1]);
    expect(wrapper.emitted('change')?.[0]).toEqual([items[1], 1]);

    video.dispatchEvent(new Event('play'));
    await nextTick();

    expect(playButton.getAttribute('aria-label')).toBe('Pause clip.mp4');

    video.dispatchEvent(new Event('pause'));
    await nextTick();

    expect(playButton.getAttribute('aria-label')).toBe('Play clip.mp4');

    wrapper.unmount();
    target.remove();
  });

  it('renders media gallery trigger items with file-card style overlays', async () => {
    const items = [
      {
        kind: 'image' as const,
        src: imageSrc,
        name: 'photo.jpg',
        alt: 'Photo',
        size: 245760,
        downloadHref: 'blob:photo-download',
      },
      {
        kind: 'video' as const,
        src: 'blob:clip',
        name: 'clip.mp4',
        poster: 'blob:poster',
        size: 7340032,
        downloadHref: 'blob:clip-download',
      },
    ];

    const wrapper = mount(NmorphMediaGallery, {
      props: {
        items,
        showTrigger: true,
      },
    });

    await nextTick();

    const triggerItems = wrapper.findAll('.nmorph-media-gallery__trigger-item');
    const imageTrigger = triggerItems[0];
    const videoTrigger = triggerItems[1];
    const imageDownload = imageTrigger.find('.nmorph-media-gallery__trigger-action');
    const videoActions = videoTrigger.findAll('.nmorph-media-gallery__trigger-action');

    expect(triggerItems).toHaveLength(2);
    expect(imageTrigger.find('.nmorph-media-gallery__trigger-name').text()).toBe('photo.jpg');
    expect(imageTrigger.find('.nmorph-media-gallery__trigger-size').text()).toBe('240 KB');
    expect(imageDownload.attributes('href')).toBe('blob:photo-download');
    expect(imageDownload.attributes('download')).toBe('photo.jpg');
    expect(videoTrigger.find('.nmorph-media-gallery__trigger-name').text()).toBe('clip.mp4');
    expect(videoTrigger.find('.nmorph-media-gallery__trigger-size').text()).toBe('7 MB');
    expect(videoTrigger.find('.nmorph-media-gallery__trigger-play').exists()).toBe(true);
    expect(videoActions).toHaveLength(3);
    expect(videoActions[0].attributes('aria-label')).toBe('Preview clip.mp4');
    expect(videoActions[1].attributes('aria-label')).toBe('Fullscreen clip.mp4');
    expect(videoActions[2].attributes('href')).toBe('blob:clip-download');

    imageDownload.element.addEventListener('click', (event) => event.preventDefault());
    await imageDownload.trigger('click');

    expect(wrapper.emitted('download')?.[0]).toEqual([items[0], 0]);

    await videoTrigger.find('.nmorph-media-gallery__trigger-open').trigger('click');

    expect(wrapper.emitted('update:model-value')?.[0]).toEqual([true]);
    expect(wrapper.emitted('update:active-index')?.[0]).toEqual([1]);
    expect(wrapper.emitted('change')?.at(-1)).toEqual([items[1], 1]);

    wrapper.unmount();
  });

  it('closes media gallery from backdrop and Escape key', async () => {
    const wrapper = mount(NmorphMediaGallery, {
      props: {
        modelValue: true,
        items: [{ kind: 'image' as const, src: imageSrc, name: 'photo.jpg' }],
      },
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

  it('pauses media gallery video when changing media and closing gallery', async () => {
    const target = document.createElement('div');
    document.body.appendChild(target);
    const items = [
      { kind: 'image' as const, src: imageSrc, name: 'photo.jpg' },
      { kind: 'video' as const, src: 'blob:clip', name: 'clip.mp4' },
    ];

    const wrapper = mount(NmorphMediaGallery, {
      props: {
        modelValue: true,
        items,
        initialIndex: 1,
      },
      attachTo: target,
      global: {
        stubs: {
          Teleport: false,
        },
      },
    });

    await nextTick();

    const firstVideo = document.body.querySelector('.nmorph-media-gallery__video') as HTMLVideoElement;
    const pauseOnChange = vi.fn();

    Object.defineProperty(firstVideo, 'pause', {
      configurable: true,
      value: pauseOnChange,
    });

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    await nextTick();

    expect(pauseOnChange).toHaveBeenCalledTimes(1);
    expect(document.body.querySelector('.nmorph-media-gallery .nmorph-image img')).toBeTruthy();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    await nextTick();

    const secondVideo = document.body.querySelector('.nmorph-media-gallery__video') as HTMLVideoElement;
    const pauseOnClose = vi.fn();

    Object.defineProperty(secondVideo, 'pause', {
      configurable: true,
      value: pauseOnClose,
    });

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await nextTick();

    expect(pauseOnClose).toHaveBeenCalledTimes(1);
    expect(wrapper.emitted('update:model-value')).toEqual([[false]]);
    expect(wrapper.emitted('close')).toHaveLength(1);

    wrapper.unmount();
    target.remove();
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
