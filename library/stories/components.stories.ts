import type { Meta, StoryObj } from '@storybook/vue3';
import { useArgs } from 'storybook/preview-api';
import { computed, ref } from 'vue';
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
  NmorphDrawer,
  NmorphDropdown,
  NmorphEmpty,
  NmorphFileUpload,
  NmorphForm,
  NmorphFormItem,
  NmorphIcon,
  NmorphIconSearch,
  NmorphImage,
  NmorphImagePreview,
  NmorphLayout,
  NmorphLink,
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
  NmorphTabPane,
  NmorphTable,
  NmorphTableCell,
  NmorphTableColumn,
  NmorphTabs,
  NmorphTagItem,
  NmorphTagList,
  NmorphTextarea,
  NmorphTextInput,
  NmorphTimePicker,
  NmorphTooltip,
  NmorphVirtualList,
} from '@/components';

const meta: Meta = {
  title: 'Nmorph/Components',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<Record<string, unknown>>;

const imageSrc =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22480%22 height=%22320%22 viewBox=%220 0 480 320%22%3E%3Crect width=%22480%22 height=%22320%22 fill=%22%23dfe8ef%22/%3E%3Ccircle cx=%22240%22 cy=%22140%22 r=%2270%22 fill=%22%23578bd6%22/%3E%3Crect x=%22128%22 y=%22230%22 width=%22224%22 height=%2220%22 rx=%2210%22 fill=%22%237188a8%22/%3E%3C/svg%3E';
const imageSrcSecond =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22480%22 height=%22320%22 viewBox=%220 0 480 320%22%3E%3Crect width=%22480%22 height=%22320%22 fill=%22%23edf2e8%22/%3E%3Cpath d=%22M80 240L190 120l70 74 58-58 82 104z%22 fill=%22%234d9f72%22/%3E%3C/svg%3E';
const options = [
  { value: 'first', label: 'First' },
  { value: 'second', label: 'Second' },
  { value: 'third', label: 'Third', disabled: true },
];
const autocompleteList = [
  { value: 'Almaty', label: 'Almaty' },
  { value: 'Astana', label: 'Astana' },
  { value: 'Aktau', label: 'Aktau' },
];
const tableData = [
  { name: 'Button', group: 'Basic', status: 'Ready' },
  { name: 'Select', group: 'Form', status: 'Review' },
  { name: 'Dialog', group: 'Feedback', status: 'Ready' },
];
const tagList = [
  { value: 'basic', text: 'Basic', removable: true, height: 'thin', design: 'nmorph' },
  { value: 'form', text: 'Form', removable: true, height: 'thin', design: 'nmorph' },
];
const virtualItems = Array.from({ length: 120 }, (_, index) => ({
  id: index + 1,
  title: `Virtual item ${index + 1}`,
}));
const notifications = [
  { id: 'storybook-notification', title: 'Notification', content: 'Storybook preview', type: 'info', closable: true },
];
const formValue = {
  email: {
    value: '',
    rules: [(value: unknown) => (String(value).includes('@') ? true : 'Email is invalid')],
  },
};
const cardStyle = 'width: 320px; min-height: 120px;';
const wideStyle = 'width: 360px;';
const scrollContentStyle =
  'width: 520px; height: 220px; padding: 12px; background: linear-gradient(90deg, transparent, rgba(87,139,214,.18));';
const select = (options: unknown[]) => ({ control: 'select', options });
const number = { control: 'number' };
const text = { control: 'text' };
const boolean = { control: 'boolean' };
const object = { control: 'object' };
const color = { control: 'color' };
const noControl = { control: false };
const height = select(['thin', 'basic', 'thick']);
const direction = select(['row', 'column']);
const design = select(['nmorph', 'common']);
const placement = select([
  'top',
  'top-start',
  'top-center',
  'top-end',
  'right',
  'right-start',
  'right-center',
  'right-end',
  'bottom',
  'bottom-start',
  'bottom-center',
  'bottom-end',
  'left',
  'left-start',
  'left-center',
  'left-end',
]);
const commonInputArgTypes = {
  id: text,
  name: text,
  autocomplete: text,
  height,
  disabled: boolean,
  tabindex: number,
};
const render = (components: Record<string, unknown>, template: string, extra: Record<string, unknown> = {}) => {
  return (args: Record<string, unknown>) => {
    const [, updateArgs] = useArgs();

    return {
      components,
      setup() {
        const modelValue = computed({
          get: () => args.modelValue,
          set: (value) => updateArgs({ modelValue: value }),
        });

        return {
          args,
          modelValue,
          updateArgs,
          imageSrc,
          imageSrcSecond,
          options,
          autocompleteList,
          tableData,
          tagList,
          notifications,
          formValue,
          ...extra,
        };
      },
      template,
    };
  };
};
const renderWithAnchor = (template: string) => {
  return (args: Record<string, unknown>) => {
    return {
      components: { NmorphButton, NmorphDropdown },
      setup() {
        const anchor = ref(null);
        return { args, anchor };
      },
      template,
    };
  };
};

export const Button: Story = {
  args: {
    text: 'Button',
    styleType: 'default',
    color: '#578bd6',
    loading: false,
    ripple: true,
    type: 'button',
    disabled: false,
    height: 'basic',
    fill: false,
    accentBgOnHover: false,
    shape: 'default',
    tabindex: 0,
  },
  argTypes: {
    ...commonInputArgTypes,
    text: text,
    styleType: select(['default', 'transparent']),
    color: color,
    loading: boolean,
    ripple: boolean,
    type: select(['button', 'submit', 'reset']),
    fill: boolean,
    accentBgOnHover: boolean,
    shape: select(['default', 'round', 'circle', 'square']),
  },
  render: render(
    { NmorphButton, NmorphIconSearch },
    '<NmorphButton v-bind="args"><template #icon><NmorphIconSearch /></template></NmorphButton>'
  ),
};

export const Icon: Story = {
  args: {
    size: 'large',
    width: '',
    height: '',
    color: '#578bd6',
  },
  argTypes: {
    size: select(['small', 'medium', 'large']),
    width: text,
    height: text,
    color: color,
  },
  render: render({ NmorphIcon, NmorphIconSearch }, '<NmorphIcon v-bind="args"><NmorphIconSearch /></NmorphIcon>'),
};

export const Link: Story = {
  args: {
    type: 'accent',
    underline: true,
    href: '#',
    text: 'Link',
    target: 'self',
    disabled: false,
  },
  argTypes: {
    type: select(['accent', 'success', 'error', 'warning']),
    underline: boolean,
    href: text,
    text: text,
    target: select(['blank', 'self', 'parent', 'top']),
    disabled: boolean,
  },
  render: render(
    { NmorphLink, NmorphIconSearch },
    '<NmorphLink v-bind="args"><template #icon><NmorphIconSearch /></template></NmorphLink>'
  ),
};

export const Scroll: Story = {
  args: {
    height: '180px',
    maxHeight: '180px',
    modelValue: { x: 0, y: 0 },
    scrollYProp: 'auto',
    scrollXProp: 'auto',
    cssScrollBehavior: 'smooth',
    scrollEndDelay: 50,
    updateOnlyOnScrollEnd: false,
    yBarWidthInPx: 6,
    xBarWidthInPx: 6,
    yGapInPx: 0,
    xGapInPx: 0,
  },
  argTypes: {
    height: text,
    maxHeight: text,
    modelValue: object,
    scrollYProp: select(['auto', 'hidden', 'scroll']),
    scrollXProp: select(['auto', 'hidden', 'scroll']),
    cssScrollBehavior: select(['auto', 'smooth', 'inherit', 'initial', 'unset']),
    scrollEndDelay: number,
    updateOnlyOnScrollEnd: boolean,
    yBarWidthInPx: number,
    xBarWidthInPx: number,
    yGapInPx: number,
    xGapInPx: number,
  },
  render: render(
    { NmorphScroll },
    `<NmorphScroll v-bind="args" v-model="modelValue">
      <div style="${scrollContentStyle}">Scrollable Nmorph content</div>
    </NmorphScroll>`
  ),
};

export const Avatar: Story = {
  args: {
    src: imageSrc,
    srcSet: '',
    fit: 'cover',
    alt: 'Avatar',
    size: 72,
    shape: 'circle',
    frameBorder: 2,
    imagePadding: 4,
    name: 'NM',
    fallback: undefined,
    preview: true,
    previewSrc: [imageSrc, imageSrcSecond],
    previewInitialIndex: 0,
    previewScaleStep: 0.2,
    previewMinScaleLevel: 0.2,
    previewMaxScaleLevel: 4,
  },
  argTypes: {
    src: object,
    srcSet: text,
    fit: select(['fill', 'contain', 'cover', 'none', 'scale-down']),
    alt: text,
    size: number,
    shape: select(['circle', 'square']),
    frameBorder: number,
    imagePadding: number,
    name: text,
    fallback: noControl,
    preview: boolean,
    previewSrc: object,
    previewInitialIndex: number,
    previewScaleStep: number,
    previewMinScaleLevel: number,
    previewMaxScaleLevel: number,
  },
  render: render({ NmorphAvatar }, '<NmorphAvatar v-bind="args" />'),
};

export const Badge: Story = {
  args: {
    value: 12,
    max: 99,
    type: 'default',
    ribbonCorner: 'top-right',
    hidden: false,
    color: '#578bd6',
    size: 'base',
    offsetY: 0,
    offsetX: 0,
    zIndex: 1,
    disabled: false,
  },
  argTypes: {
    value: text,
    max: number,
    type: select(['default', 'dot', 'tag', 'ribbon']),
    ribbonCorner: select(['top-left', 'top-right', 'bottom-left', 'bottom-right']),
    hidden: boolean,
    color: color,
    size: select(['tiny', 'extra-small', 'base', 'medium', 'large', 'extra-large']),
    offsetY: number,
    offsetX: number,
    zIndex: number,
    disabled: boolean,
  },
  render: render(
    { NmorphBadge, NmorphButton },
    '<NmorphBadge v-bind="args"><NmorphButton text="Inbox" /></NmorphBadge>'
  ),
};

export const Calendar: Story = {
  args: {
    markToday: true,
    initialDate: new Date(),
    range: undefined,
    type: 'date',
    modelValue: new Date(),
  },
  argTypes: {
    markToday: boolean,
    initialDate: object,
    range: object,
    type: select(['date', 'dates', 'daterange']),
    modelValue: object,
  },
  render: render(
    { NmorphCalendar },
    '<NmorphCalendar v-bind="args" v-model="modelValue" />'
  ),
};

export const Card: Story = {
  args: {
    shadowType: 'outset',
    combinedShadowBorderWidth: 2,
    fill: true,
    tag: 'div',
  },
  argTypes: {
    shadowType: select(['inset', 'outset', 'combined', 'not-defined']),
    combinedShadowBorderWidth: number,
    fill: boolean,
    tag: text,
  },
  render: render(
    { NmorphCard },
    `<NmorphCard v-bind="args" style="${cardStyle}">
      <template #header>Card header</template>
      Card content
      <template #footer>Card footer</template>
    </NmorphCard>`
  ),
};

export const Carousel: Story = {
  args: {
    loop: true,
  },
  argTypes: {
    loop: boolean,
  },
  render: render(
    { NmorphCarousel, NmorphCarouselItem },
    `<NmorphCarousel v-bind="args" style="width: 360px; height: 200px;">
      <NmorphCarouselItem name="one"><div style="height: 180px; padding: 40px; background: rgba(87,139,214,.2);">First slide</div></NmorphCarouselItem>
      <NmorphCarouselItem name="two"><div style="height: 180px; padding: 40px; background: rgba(77,159,114,.2);">Second slide</div></NmorphCarouselItem>
    </NmorphCarousel>`
  ),
};

export const Collapse: Story = {
  args: {
    modelValue: ['first'],
    accordion: false,
    itemHeight: 'basic',
    firstDisabled: false,
    itemBlock: false,
  },
  argTypes: {
    modelValue: object,
    accordion: boolean,
    itemHeight: height,
    firstDisabled: boolean,
    itemBlock: boolean,
  },
  render: render(
    { NmorphCollapse, NmorphCollapseItem },
    `<NmorphCollapse v-model="modelValue" :accordion="args.accordion">
      <NmorphCollapseItem name="first" title="First item" :height="args.itemHeight" :disabled="args.firstDisabled" :block="args.itemBlock">First content</NmorphCollapseItem>
      <NmorphCollapseItem name="second" title="Second item" :height="args.itemHeight" :block="args.itemBlock">Second content</NmorphCollapseItem>
    </NmorphCollapse>`
  ),
};

export const Image: Story = {
  args: {
    src: imageSrc,
    srcSet: '',
    fit: 'cover',
    alt: 'Preview image',
    loadingText: '',
    loadFailedText: '',
    frameBorder: 4,
  },
  argTypes: {
    src: text,
    srcSet: text,
    fit: select(['fill', 'contain', 'cover', 'none', 'scale-down']),
    alt: text,
    loadingText: text,
    loadFailedText: text,
    frameBorder: number,
  },
  render: render({ NmorphImage }, '<NmorphImage v-bind="args" style="width: 320px; height: 220px;" />'),
};

export const ImagePreview: Story = {
  args: {
    modelValue: false,
    alt: 'Preview image',
    initialIndex: 0,
    src: [imageSrc, imageSrcSecond],
    scaleStep: 0.2,
    minScaleLevel: 0.2,
    maxScaleLevel: 4,
    zIndex: 43183,
    showNavigationButtons: true,
    showActionBar: true,
  },
  argTypes: {
    modelValue: boolean,
    alt: text,
    initialIndex: number,
    src: object,
    scaleStep: number,
    minScaleLevel: number,
    maxScaleLevel: number,
    zIndex: number,
    showNavigationButtons: boolean,
    showActionBar: boolean,
  },
  render: render(
    { NmorphImagePreview },
    '<NmorphImagePreview v-bind="args" v-model="modelValue" />'
  ),
};

export const Pagination: Story = {
  args: {
    totalElementsQuantity: 64,
    modelValue: 1,
    elementsQuantityOnPage: 8,
    disabled: false,
    hideOnSinglePage: true,
    maxVisiblePages: 7,
    fastForwardStep: 5,
  },
  argTypes: {
    totalElementsQuantity: number,
    modelValue: number,
    elementsQuantityOnPage: number,
    disabled: boolean,
    hideOnSinglePage: boolean,
    maxVisiblePages: number,
    fastForwardStep: number,
  },
  render: render(
    { NmorphPagination },
    '<NmorphPagination v-bind="args" v-model="modelValue" />'
  ),
};

export const Progress: Story = {
  args: {
    type: 'linear',
    color: '#578bd6',
    percentage: 72,
    valueInside: false,
    valueRightSide: true,
    indeterminate: false,
    circleSize: 120,
  },
  argTypes: {
    type: select(['linear', 'circle']),
    color: color,
    percentage: number,
    valueInside: boolean,
    valueRightSide: boolean,
    indeterminate: boolean,
    circleSize: number,
  },
  render: render({ NmorphProgress }, '<div style="width: 320px;"><NmorphProgress v-bind="args" /></div>'),
};

export const Skeleton: Story = {
  args: {
    animated: true,
    loading: true,
    rows: 0,
    itemVariant: 'rect',
    itemWidth: '240px',
    itemHeight: '72px',
    itemDesign: 'nmorph',
  },
  argTypes: {
    animated: boolean,
    loading: boolean,
    rows: number,
    itemVariant: select(['rect', 'circle', 'image']),
    itemWidth: text,
    itemHeight: text,
    itemDesign: design,
  },
  render: render(
    { NmorphSkeleton, NmorphSkeletonItem },
    `<NmorphSkeleton :animated="args.animated" :loading="args.loading" :rows="args.rows">
      <template #template><NmorphSkeletonItem :variant="args.itemVariant" :width="args.itemWidth" :height="args.itemHeight" :design="args.itemDesign" /></template>
      <div>Loaded content</div>
    </NmorphSkeleton>`
  ),
};

export const Table: Story = {
  args: {
    data: tableData,
    rowHover: true,
    bordered: true,
    sort: { name: undefined, group: undefined, status: undefined },
    design: 'nmorph',
  },
  argTypes: {
    data: object,
    rowHover: boolean,
    bordered: boolean,
    sort: object,
    design: design,
  },
  render: render(
    { NmorphTable, NmorphTableColumn },
    `<NmorphTable v-bind="args" style="min-width: 520px;">
      <NmorphTableColumn prop="name" label="Name" width="180" alignment="left" />
      <NmorphTableColumn prop="group" label="Group" width="160" />
      <NmorphTableColumn prop="status" label="Status" width="160" />
    </NmorphTable>`
  ),
};

export const TagList: Story = {
  args: {
    modelValue: tagList,
  },
  argTypes: {
    modelValue: object,
  },
  render: render(
    { NmorphTagList },
    '<NmorphTagList v-bind="args" v-model="modelValue" />'
  ),
};

export const Alert: Story = {
  args: {
    id: 'alert',
    type: 'info',
    closable: true,
    title: 'Alert title',
    content: 'Alert content',
    fill: false,
    showIcon: true,
    bordered: true,
    html: '',
    closeIconPosition: 'center',
  },
  argTypes: {
    id: text,
    type: select(['success', 'error', 'warning', 'info']),
    closable: boolean,
    title: text,
    content: text,
    fill: boolean,
    showIcon: boolean,
    bordered: boolean,
    html: text,
    closeIconPosition: text,
  },
  render: render({ NmorphAlert }, '<NmorphAlert v-bind="args" />'),
};

export const Callout: Story = {
  args: {
    type: 'info',
    title: 'Callout',
    content: 'Useful contextual content',
  },
  argTypes: {
    type: select(['info', 'warning', 'success', 'error']),
    title: text,
    content: text,
  },
  render: render({ NmorphCallout }, '<NmorphCallout v-bind="args" style="width: 360px;" />'),
};

export const Dialog: Story = {
  args: {
    modelValue: true,
    title: 'Dialog',
    width: '330px',
    maxHeight: undefined,
    openDelay: 0,
    closeDelay: 0,
    closeOnClickModal: true,
    showClose: true,
    zIndex: 43183,
    closeOnOverlay: true,
  },
  argTypes: {
    modelValue: boolean,
    title: text,
    width: text,
    maxHeight: text,
    openDelay: number,
    closeDelay: number,
    closeOnClickModal: boolean,
    showClose: boolean,
    zIndex: number,
    closeOnOverlay: boolean,
  },
  parameters: {
    layout: 'fullscreen',
  },
  render: render(
    { NmorphDialog },
    '<NmorphDialog v-bind="args" v-model="modelValue">Dialog content</NmorphDialog>'
  ),
};

export const Tooltip: Story = {
  args: {
    text: 'Tooltip text',
    position: 'top',
    forceShow: false,
    forceCoordinate: null,
  },
  argTypes: {
    text: text,
    position: select(['left', 'right', 'top', 'bottom']),
    forceShow: boolean,
    forceCoordinate: object,
  },
  render: render(
    { NmorphTooltip, NmorphButton },
    '<NmorphTooltip v-bind="args"><NmorphButton text="Hover" /></NmorphTooltip>'
  ),
};

export const Autocomplete: Story = {
  args: {
    id: 'autocomplete',
    name: 'autocomplete',
    autocomplete: 'off',
    height: 'basic',
    disabled: false,
    tabindex: 0,
    modelValue: '',
    placeholder: 'Type city',
    clearable: true,
    list: autocompleteList,
    actionCallback: undefined,
    zIndex: 43183,
  },
  argTypes: {
    ...commonInputArgTypes,
    modelValue: text,
    placeholder: text,
    clearable: boolean,
    list: object,
    actionCallback: noControl,
    zIndex: number,
  },
  render: render(
    { NmorphAutocomplete },
    '<NmorphAutocomplete v-bind="args" v-model="modelValue" />'
  ),
};

export const Checkbox: Story = {
  args: {
    id: 'checkbox',
    disabled: false,
    modelValue: true,
    label: 'Checkbox',
    design: 'checkbox',
    height: 'thin',
  },
  argTypes: {
    id: text,
    disabled: boolean,
    modelValue: boolean,
    label: text,
    design: select(['button', 'checkbox']),
    height,
  },
  render: render(
    { NmorphCheckbox },
    '<NmorphCheckbox v-bind="args" v-model="modelValue" />'
  ),
};

export const CheckboxGroup: Story = {
  args: {
    id: 'checkbox-group',
    name: 'checkbox-group',
    autocomplete: '',
    height: 'thin',
    disabled: false,
    tabindex: 0,
    modelValue: ['first'],
    options,
    design: 'checkbox',
    direction: 'row',
  },
  argTypes: {
    ...commonInputArgTypes,
    modelValue: object,
    options: object,
    design: select(['button', 'checkbox']),
    direction,
  },
  render: render(
    { NmorphCheckboxGroup },
    '<NmorphCheckboxGroup v-bind="args" v-model="modelValue" />'
  ),
};

export const ColorPicker: Story = {
  args: {
    id: 'color-picker',
    name: 'color-picker',
    autocomplete: '',
    height: 'basic',
    disabled: false,
    tabindex: 0,
    modelValue: '#578bd6',
    showValue: true,
    displayFormat: 'hex',
  },
  argTypes: {
    ...commonInputArgTypes,
    modelValue: color,
    showValue: boolean,
    displayFormat: select(['hex', 'rgb', 'hsl']),
  },
  render: render(
    { NmorphColorPicker },
    '<NmorphColorPicker v-bind="args" v-model="modelValue" />'
  ),
};

export const DatePicker: Story = {
  args: {
    id: 'date-picker',
    name: 'date-picker',
    autocomplete: '',
    height: 'basic',
    disabled: false,
    tabindex: 0,
    placeholder: '',
    modelValue: null,
    type: 'date',
    textSeparator: '-',
    initialDate: new Date(),
    zIndex: 43183,
  },
  argTypes: {
    ...commonInputArgTypes,
    placeholder: text,
    modelValue: object,
    type: select(['date', 'dates', 'daterange']),
    textSeparator: text,
    initialDate: object,
    zIndex: number,
  },
  render: render(
    { NmorphDatePicker },
    '<NmorphDatePicker v-bind="args" v-model="modelValue" />'
  ),
};

export const FileUpload: Story = {
  args: {
    modelValue: [],
    disabled: false,
    multiple: false,
    allowedTypes: ['jpg', 'jpeg', 'png'],
    photoWithPreview: true,
    buttonText: 'Select file',
  },
  argTypes: {
    modelValue: object,
    disabled: boolean,
    multiple: boolean,
    allowedTypes: object,
    photoWithPreview: boolean,
    buttonText: text,
  },
  render: render(
    { NmorphFileUpload },
    '<NmorphFileUpload v-bind="args" v-model="modelValue" />'
  ),
};

export const Form: Story = {
  args: {
    value: formValue,
    validateImmediately: true,
    formItemId: 'email',
    formItemName: 'email',
    formItemAutocomplete: 'email',
    formItemHeight: 'basic',
    formItemLabel: 'Email',
    showValidationIcon: true,
    staticErrorBoxSpace: true,
  },
  argTypes: {
    value: object,
    validateImmediately: boolean,
    formItemId: text,
    formItemName: text,
    formItemAutocomplete: text,
    formItemHeight: height,
    formItemLabel: text,
    showValidationIcon: boolean,
    staticErrorBoxSpace: boolean,
  },
  render: render(
    { NmorphForm, NmorphFormItem, NmorphTextInput },
    `<NmorphForm :value="args.value" :validate-immediately="args.validateImmediately" style="${wideStyle}">
      <NmorphFormItem :id="args.formItemId" :name="args.formItemName" :autocomplete="args.formItemAutocomplete" :height="args.formItemHeight" :label="args.formItemLabel" :show-validation-icon="args.showValidationIcon" :static-error-box-space="args.staticErrorBoxSpace">
        <NmorphTextInput :id="args.formItemId" model-value="" placeholder="name@mail.com" />
      </NmorphFormItem>
    </NmorphForm>`
  ),
};

export const NumberInput: Story = {
  args: {
    id: 'number-input',
    name: 'number-input',
    autocomplete: '',
    height: 'basic',
    disabled: false,
    tabindex: 0,
    modelValue: 4,
    max: 10,
    min: 0,
    step: 1,
    actionBtnPositionRight: false,
  },
  argTypes: {
    ...commonInputArgTypes,
    modelValue: number,
    max: number,
    min: number,
    step: number,
    actionBtnPositionRight: boolean,
  },
  render: render(
    { NmorphNumberInput },
    '<NmorphNumberInput v-bind="args" v-model="modelValue" />'
  ),
};

export const OTPInput: Story = {
  args: {
    id: 'otp-input',
    name: 'otp-input',
    autocomplete: 'one-time-code',
    height: 'basic',
    disabled: false,
    tabindex: 0,
    modelValue: '',
    length: 6,
    mode: 'numeric',
    autofocus: false,
    autocapitalize: 'none',
  },
  argTypes: {
    ...commonInputArgTypes,
    modelValue: text,
    length: number,
    mode: select(['numeric', 'text', 'alphanumeric']),
    autofocus: boolean,
    autocapitalize: text,
  },
  render: render(
    { NmorphOTPInput },
    '<NmorphOTPInput v-bind="args" v-model="modelValue" />'
  ),
};

export const Select: Story = {
  args: {
    id: 'select',
    name: 'select',
    autocomplete: '',
    height: 'basic',
    disabled: false,
    tabindex: 0,
    noElementPlaceholder: '',
    valueRequired: false,
    options,
    optionsMap: [],
    modelValue: 'first',
    loading: false,
    open: false,
    fill: false,
    optionsWidth: 'truncate',
    zIndex: 43183,
  },
  argTypes: {
    ...commonInputArgTypes,
    noElementPlaceholder: text,
    valueRequired: boolean,
    options: object,
    optionsMap: object,
    modelValue: object,
    loading: boolean,
    open: boolean,
    fill: boolean,
    optionsWidth: select(['truncate', 'auto']),
    zIndex: number,
  },
  render: render(
    { NmorphSelect },
    '<NmorphSelect v-bind="args" v-model="modelValue" />'
  ),
};

export const Slider: Story = {
  args: {
    id: 'slider',
    name: 'slider',
    autocomplete: '',
    disabled: false,
    tabindex: 0,
    modelValue: 48,
    max: 100,
    min: 0,
    step: 1,
    showTooltip: true,
  },
  argTypes: {
    id: text,
    name: text,
    autocomplete: text,
    disabled: boolean,
    tabindex: number,
    modelValue: number,
    max: number,
    min: number,
    step: number,
    showTooltip: boolean,
  },
  render: render(
    { NmorphSlider },
    '<div style="width: 360px;"><NmorphSlider v-bind="args" v-model="modelValue" /></div>'
  ),
};

export const Switch: Story = {
  args: {
    id: 'switch',
    name: 'switch',
    autocomplete: '',
    disabled: false,
    tabindex: 0,
    modelValue: false,
    loading: false,
    activeValue: true,
    inactiveValue: false,
  },
  argTypes: {
    id: text,
    name: text,
    autocomplete: text,
    disabled: boolean,
    tabindex: number,
    modelValue: object,
    loading: boolean,
    activeValue: object,
    inactiveValue: object,
  },
  render: render(
    { NmorphSwitch },
    '<NmorphSwitch v-bind="args" v-model="modelValue" />'
  ),
};

export const TextInput: Story = {
  args: {
    id: 'text-input',
    name: 'text-input',
    autocomplete: 'off',
    height: 'basic',
    disabled: false,
    tabindex: 0,
    placeholder: 'Text',
    typePassword: false,
    modelValue: '',
    clearable: true,
    indentation: '',
    inputAttrs: {},
  },
  argTypes: {
    ...commonInputArgTypes,
    placeholder: text,
    typePassword: boolean,
    modelValue: text,
    clearable: boolean,
    indentation: text,
    inputAttrs: object,
  },
  render: render(
    { NmorphTextInput },
    '<NmorphTextInput v-bind="args" v-model="modelValue" />'
  ),
};

export const Radio: Story = {
  args: {
    disabled: false,
    label: 'Radio',
    styleType: 'radio-style',
    checked: true,
    tabindex: 0,
    value: 'radio',
    height: 'thin',
  },
  argTypes: {
    disabled: boolean,
    label: text,
    styleType: select(['radio-style', 'button']),
    checked: boolean,
    tabindex: number,
    value: text,
    height,
  },
  render: render({ NmorphRadio }, '<NmorphRadio v-bind="args" />'),
};

export const RadioGroup: Story = {
  args: {
    id: 'radio-group',
    name: 'radio-group',
    autocomplete: '',
    height: 'thin',
    disabled: false,
    tabindex: 0,
    modelValue: 'first',
    options,
    styleType: 'radio-style',
    direction: 'row',
  },
  argTypes: {
    ...commonInputArgTypes,
    modelValue: text,
    options: object,
    styleType: select(['radio-style', 'button']),
    direction,
  },
  render: render(
    { NmorphRadioGroup },
    '<NmorphRadioGroup v-bind="args" v-model="modelValue" />'
  ),
};

export const SelectButton: Story = {
  args: {
    id: 'select-button',
    name: 'select-button',
    autocomplete: '',
    height: 'basic',
    disabled: false,
    tabindex: 0,
    modelValue: 'first',
    options,
    fill: false,
  },
  argTypes: {
    ...commonInputArgTypes,
    modelValue: text,
    options: object,
    fill: boolean,
  },
  render: render(
    { NmorphSelectButton },
    '<NmorphSelectButton v-bind="args" v-model="modelValue" />'
  ),
};

export const Backtop: Story = {
  args: {
    right: 24,
    bottom: 24,
    visibilityHeight: 0,
    design: 'nmorph',
  },
  argTypes: {
    right: number,
    bottom: number,
    visibilityHeight: number,
    design: design,
  },
  render: render(
    { NmorphBacktop },
    '<div style="width: 360px; height: 220px; overflow: auto;"><div style="height: 520px; padding: 16px;">Scroll this area<NmorphBacktop v-bind="args" /></div></div>'
  ),
};

export const Breadcrumb: Story = {
  args: {
    separator: '/',
    firstTo: '/',
    secondTo: '/components',
    replace: false,
  },
  argTypes: {
    separator: text,
    firstTo: text,
    secondTo: text,
    replace: boolean,
  },
  render: render(
    { NmorphBreadcrumb, NmorphBreadcrumbItem },
    `<NmorphBreadcrumb :separator="args.separator">
      <NmorphBreadcrumbItem :to="args.firstTo" :replace="args.replace">Home</NmorphBreadcrumbItem>
      <NmorphBreadcrumbItem :to="args.secondTo" :replace="args.replace">Components</NmorphBreadcrumbItem>
    </NmorphBreadcrumb>`
  ),
};

export const Dropdown: Story = {
  args: {
    open: true,
    width: 220,
    minWidth: 160,
    maxWidth: 320,
    placement: 'bottom-end',
    xOffset: 0,
    yOffset: 8,
    fillWidth: false,
    zIndex: 43183,
  },
  argTypes: {
    open: boolean,
    relativeElement: noControl,
    width: object,
    minWidth: object,
    maxWidth: object,
    placement,
    xOffset: number,
    yOffset: number,
    fillWidth: boolean,
    zIndex: number,
  },
  render: renderWithAnchor(
    `<div style="height: 180px; width: 320px;">
      <NmorphButton ref="anchor" text="Anchor" />
      <NmorphDropdown v-if="anchor" v-bind="args" :relative-element="anchor.$el || anchor">
        <div style="padding: 12px;">Dropdown content</div>
      </NmorphDropdown>
    </div>`
  ),
};

export const Tabs: Story = {
  args: {
    modelValue: 'first',
    stretch: false,
    panes: [],
  },
  argTypes: {
    modelValue: object,
    stretch: boolean,
    panes: object,
  },
  render: render(
    { NmorphTabs, NmorphTabPane },
    `<NmorphTabs v-bind="args" v-model="modelValue" style="width: 360px;">
      <NmorphTabPane name="first" label="First" content="First content" />
      <NmorphTabPane name="second" label="Second" content="Second content" />
    </NmorphTabs>`
  ),
};

export const Divider: Story = {
  args: {
    direction: 'horizontal',
  },
  argTypes: {
    direction: select(['vertical', 'horizontal']),
  },
  render: render(
    { NmorphDivider },
    '<div style="width: 320px; height: 120px; display: flex;"><NmorphDivider v-bind="args" /></div>'
  ),
};

export const Overlay: Story = {
  args: {
    show: true,
    transparent: false,
    zIndex: 43183,
  },
  argTypes: {
    show: boolean,
    transparent: boolean,
    zIndex: number,
  },
  parameters: {
    layout: 'fullscreen',
  },
  render: render(
    { NmorphOverlay },
    '<NmorphOverlay v-bind="args"><div style="padding: 24px; background: var(--nmorph-main-color);">Overlay content</div></NmorphOverlay>'
  ),
};

export const BreadcrumbItem: Story = {
  args: {
    to: '#',
    replace: false,
  },
  argTypes: {
    to: text,
    replace: boolean,
  },
  render: render(
    { NmorphBreadcrumb, NmorphBreadcrumbItem },
    `<NmorphBreadcrumb>
      <NmorphBreadcrumbItem to="/">Home</NmorphBreadcrumbItem>
      <NmorphBreadcrumbItem v-bind="args">Current item</NmorphBreadcrumbItem>
    </NmorphBreadcrumb>`
  ),
};

export const CarouselItem: Story = {
  args: {
    name: 'story-slide',
  },
  argTypes: {
    name: text,
  },
  render: render(
    { NmorphCarousel, NmorphCarouselItem },
    `<NmorphCarousel style="width: 360px; height: 180px;">
      <NmorphCarouselItem v-bind="args">
        <div style="height: 160px; display: grid; place-items: center; background: rgba(87,139,214,.2);">Carousel item</div>
      </NmorphCarouselItem>
    </NmorphCarousel>`
  ),
};

export const CollapseItem: Story = {
  args: {
    name: 'item',
    title: 'Collapse item',
    disabled: false,
    height: 'basic',
    block: false,
    transitionSpeed: 220,
  },
  argTypes: {
    name: text,
    title: text,
    disabled: boolean,
    height,
    block: boolean,
    transitionSpeed: number,
  },
  render: render(
    { NmorphCollapse, NmorphCollapseItem },
    `<NmorphCollapse model-value="item">
      <NmorphCollapseItem v-bind="args">Collapse item content</NmorphCollapseItem>
    </NmorphCollapse>`
  ),
};

export const ContextMenu: Story = {
  args: {
    modelValue: false,
    options: ['Open', 'Rename', { label: 'Delete', color: 'var(--nmorph-error-text-color)' }],
    trigger: 'both',
    placement: 'bottom-start',
    width: 180,
    yOffset: 6,
  },
  argTypes: {
    modelValue: boolean,
    options: object,
    trigger: select(['contextmenu', 'click', 'both']),
    placement,
    width: object,
    yOffset: number,
  },
  render: render(
    { NmorphContextMenu, NmorphButton },
    '<NmorphContextMenu v-bind="args" v-model="modelValue"><NmorphButton text="Open menu" /></NmorphContextMenu>'
  ),
};

export const Drawer: Story = {
  args: {
    modelValue: true,
    title: 'Drawer',
    placement: 'right',
    size: '320px',
    showClose: true,
    closeOnOverlay: true,
    closeOnEscape: true,
    zIndex: 43183,
  },
  argTypes: {
    modelValue: boolean,
    title: text,
    placement: select(['left', 'right', 'top', 'bottom']),
    size: object,
    showClose: boolean,
    closeOnOverlay: boolean,
    closeOnEscape: boolean,
    zIndex: number,
  },
  parameters: {
    layout: 'fullscreen',
  },
  render: render(
    { NmorphDrawer, NmorphButton },
    `<NmorphDrawer v-bind="args" v-model="modelValue">
      <div style="display: grid; gap: 12px;">
        <p>Drawer content</p>
        <NmorphButton text="Close" @click="modelValue = false" />
      </div>
    </NmorphDrawer>`
  ),
};

export const Empty: Story = {
  args: {
    title: 'No data',
    description: 'There is nothing to display yet.',
    iconSize: 44,
    minHeight: 160,
    design: 'nmorph',
    shadowType: 'outset',
    hideIcon: false,
  },
  argTypes: {
    title: text,
    description: text,
    iconSize: object,
    minHeight: object,
    design,
    shadowType: select(['inset', 'outset', 'combined', 'not-defined']),
    hideIcon: boolean,
  },
  render: render(
    { NmorphEmpty, NmorphButton },
    '<NmorphEmpty v-bind="args"><template #action><NmorphButton text="Create" height="thin" /></template></NmorphEmpty>'
  ),
};

export const FormItem: Story = {
  args: {
    value: formValue,
    id: 'email',
    label: 'Email',
    name: 'email',
    autocomplete: 'email',
    height: 'basic',
    showValidationIcon: true,
    staticErrorBoxSpace: true,
  },
  argTypes: {
    value: object,
    id: text,
    label: text,
    name: text,
    autocomplete: text,
    height,
    showValidationIcon: boolean,
    staticErrorBoxSpace: boolean,
  },
  render: render(
    { NmorphForm, NmorphFormItem, NmorphTextInput },
    `<NmorphForm :value="args.value" validate-immediately style="${wideStyle}">
      <NmorphFormItem :id="args.id" :label="args.label" :name="args.name" :autocomplete="args.autocomplete" :height="args.height" :show-validation-icon="args.showValidationIcon" :static-error-box-space="args.staticErrorBoxSpace">
        <NmorphTextInput placeholder="name@mail.com" />
      </NmorphFormItem>
    </NmorphForm>`
  ),
};

export const Layout: Story = {
  args: {
    gap: '12px',
    asideWidth: '120px',
    asidePosition: 'left',
    fullHeight: false,
    tag: 'div',
  },
  argTypes: {
    gap: object,
    asideWidth: object,
    asidePosition: select(['left', 'right']),
    fullHeight: boolean,
    tag: text,
  },
  render: render(
    { NmorphLayout },
    `<NmorphLayout v-bind="args" style="width: 520px;">
      <template #header><div style="padding: 12px; background: rgba(87,139,214,.16);">Header</div></template>
      <template #aside><div style="min-height: 110px; padding: 12px; background: rgba(87,139,214,.12);">Aside</div></template>
      <div style="min-height: 110px; padding: 12px; background: rgba(87,139,214,.08);">Main</div>
      <template #footer><div style="padding: 12px; background: rgba(87,139,214,.16);">Footer</div></template>
    </NmorphLayout>`
  ),
};

export const QRCode: Story = {
  args: {
    value: 'https://nmorph-ui-kit.example',
    size: 180,
    margin: 4,
    color: '#1f2937',
    background: '#ffffff',
    level: 'M',
    title: 'Nmorph QR code',
  },
  argTypes: {
    value: text,
    size: object,
    margin: number,
    color,
    background: color,
    level: select(['L', 'M', 'Q', 'H']),
    title: text,
  },
  render: render({ NmorphQRCode }, '<NmorphQRCode v-bind="args" />'),
};

export const SelectButtonItem: Story = {
  args: {
    value: 'middle',
    disabled: false,
    tabindex: 0,
  },
  argTypes: {
    value: text,
    disabled: boolean,
    tabindex: number,
  },
  render: render(
    { NmorphSelectButton, NmorphSelectButtonItem },
    `<NmorphSelectButton model-value="middle">
      <NmorphSelectButtonItem value="left">Left</NmorphSelectButtonItem>
      <NmorphSelectButtonItem v-bind="args">Story item</NmorphSelectButtonItem>
      <NmorphSelectButtonItem value="right">Right</NmorphSelectButtonItem>
    </NmorphSelectButton>`
  ),
};

export const SelectOption: Story = {
  args: {
    value: 'story',
    label: 'Story option',
    disabled: false,
    focused: false,
    hoverBackground: 'rgba(87,139,214,.16)',
    hoverColor: '#578bd6',
  },
  argTypes: {
    value: text,
    label: text,
    disabled: boolean,
    focused: boolean,
    hoverBackground: color,
    hoverColor: color,
  },
  render: render(
    { NmorphSelect, NmorphSelectOption },
    `<NmorphSelect model-value="story" style="width: 260px;">
      <NmorphSelectOption value="before" label="Before" />
      <NmorphSelectOption v-bind="args" />
      <NmorphSelectOption value="after" label="After" />
    </NmorphSelect>`
  ),
};

export const SkeletonItem: Story = {
  args: {
    variant: 'rect',
    width: '220px',
    height: '72px',
    design: 'nmorph',
  },
  argTypes: {
    variant: select(['rect', 'circle', 'image']),
    width: text,
    height: text,
    design,
  },
  render: render({ NmorphSkeletonItem }, '<NmorphSkeletonItem v-bind="args" />'),
};

export const Space: Story = {
  args: {
    direction: 'row',
    size: 'medium',
    align: 'center',
    justify: 'start',
    wrap: true,
    inline: false,
    fill: false,
  },
  argTypes: {
    direction: select(['row', 'column']),
    size: select(['small', 'medium', 'large']),
    align: select(['start', 'center', 'end', 'stretch', 'baseline']),
    justify: select(['start', 'center', 'end', 'space-between', 'space-around', 'space-evenly']),
    wrap: boolean,
    inline: boolean,
    fill: boolean,
  },
  render: render(
    { NmorphSpace, NmorphButton },
    '<NmorphSpace v-bind="args"><NmorphButton text="One" /><NmorphButton text="Two" /><NmorphButton text="Three" /></NmorphSpace>'
  ),
};

export const TableCell: Story = {
  args: {
    row: 0,
  },
  argTypes: {
    row: number,
  },
  render: render(
    { NmorphTable, NmorphTableColumn, NmorphTableCell },
    `<NmorphTable :data="tableData" style="min-width: 360px;">
      <NmorphTableColumn prop="name" label="Name" width="180" />
      <NmorphTableColumn prop="status" label="Status" width="160">
        <template #default="{ scope }">
          <NmorphTableCell v-bind="args">{{ scope.rows[args.row]?.status }}</NmorphTableCell>
        </template>
      </NmorphTableColumn>
    </NmorphTable>`
  ),
};

export const TableColumn: Story = {
  args: {
    prop: 'name',
    label: 'Name',
    width: '180',
    alignment: 'left',
  },
  argTypes: {
    prop: text,
    label: text,
    width: text,
    alignment: select(['left', 'center', 'right']),
  },
  render: render(
    { NmorphTable, NmorphTableColumn },
    `<NmorphTable :data="tableData" style="min-width: 360px;">
      <NmorphTableColumn v-bind="args" />
      <NmorphTableColumn prop="status" label="Status" width="160" />
    </NmorphTable>`
  ),
};

export const TabPane: Story = {
  args: {
    name: 'story',
    label: 'Story tab',
    content: 'Story tab content',
    disabled: false,
  },
  argTypes: {
    name: text,
    label: text,
    content: text,
    disabled: boolean,
  },
  render: render(
    { NmorphTabs, NmorphTabPane },
    `<NmorphTabs model-value="story" style="width: 360px;">
      <NmorphTabPane v-bind="args" />
      <NmorphTabPane name="other" label="Other" content="Other content" />
    </NmorphTabs>`
  ),
};

export const TagItem: Story = {
  args: {
    value: 'story',
    text: 'Story tag',
    removable: true,
    height: 'basic',
    design: 'nmorph',
  },
  argTypes: {
    value: text,
    text: text,
    removable: boolean,
    height,
    design,
  },
  render: render({ NmorphTagItem }, '<NmorphTagItem v-bind="args" />'),
};

export const Textarea: Story = {
  args: {
    id: 'textarea',
    name: 'textarea',
    autocomplete: '',
    height: 'basic',
    disabled: false,
    tabindex: 0,
    modelValue: 'Textarea content',
    placeholder: 'Textarea',
    rows: 3,
    minRows: 2,
    maxRows: 6,
    resize: 'vertical',
    autoSize: false,
  },
  argTypes: {
    ...commonInputArgTypes,
    modelValue: text,
    placeholder: text,
    rows: number,
    minRows: number,
    maxRows: number,
    resize: select(['none', 'both', 'horizontal', 'vertical']),
    autoSize: boolean,
  },
  render: render(
    { NmorphTextarea },
    '<NmorphTextarea v-bind="args" v-model="modelValue" style="width: 360px;" />'
  ),
};

export const TimePicker: Story = {
  args: {
    id: 'time-picker',
    name: 'time-picker',
    autocomplete: '',
    height: 'basic',
    disabled: false,
    tabindex: 0,
    modelValue: '09:30',
    placeholder: 'Time',
    hourStep: 1,
    minuteStep: 5,
    secondStep: 10,
    showSeconds: false,
    minTime: '',
    maxTime: '',
    clearable: true,
    width: 180,
    zIndex: 43183,
  },
  argTypes: {
    ...commonInputArgTypes,
    modelValue: text,
    placeholder: text,
    hourStep: number,
    minuteStep: number,
    secondStep: number,
    showSeconds: boolean,
    minTime: text,
    maxTime: text,
    clearable: boolean,
    width: object,
    zIndex: number,
  },
  render: render(
    { NmorphTimePicker },
    '<NmorphTimePicker v-bind="args" v-model="modelValue" />'
  ),
};

export const VirtualList: Story = {
  args: {
    items: virtualItems,
    height: '260px',
    maxHeight: '260px',
    itemHeight: 44,
    overscan: 6,
    dynamic: false,
    disabled: false,
    itemKey: 'id',
  },
  argTypes: {
    items: object,
    height: object,
    maxHeight: object,
    itemHeight: number,
    overscan: number,
    dynamic: boolean,
    disabled: boolean,
    itemKey: text,
  },
  render: render(
    { NmorphVirtualList },
    `<NmorphVirtualList v-bind="args" style="width: 360px;">
      <template #default="{ item }">
        <div style="box-sizing: border-box; min-height: 44px; padding: 8px 12px; border-bottom: 1px solid rgba(127,127,127,.24);">
          {{ item.title }}
        </div>
      </template>
    </NmorphVirtualList>`
  ),
};

export const NotificationProvider: Story = {
  args: {
    notifications,
    placement: 'top-right',
    zIndex: 43183,
    quantity: 3,
  },
  argTypes: {
    notifications: object,
    placement: select(['top-right', 'top-left', 'bottom-right', 'bottom-left']),
    zIndex: number,
    quantity: number,
  },
  render: render({ NmorphNotificationProvider }, '<NmorphNotificationProvider v-bind="args" />'),
};
