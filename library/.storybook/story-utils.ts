import type { StoryObj } from '@storybook/vue3';
import { useArgs } from 'storybook/preview-api';
import { computed, ref } from 'vue';
import { NmorphButton, NmorphDropdown } from '@/components';

export type Story = StoryObj<Record<string, unknown>>;

export const tableData = [
  { name: 'Button', group: 'Basic', status: 'Ready' },
  { name: 'Select', group: 'Form', status: 'Review' },
  { name: 'Dialog', group: 'Feedback', status: 'Ready' },
];

export const formValue = {
  email: {
    value: '',
    rules: [(value: unknown) => (String(value).includes('@') ? true : 'Email is invalid')],
  },
};

export const cardStyle = 'width: 320px; min-height: 120px;';
export const wideStyle = 'width: 360px;';
export const scrollContentStyle =
  'width: 520px; height: 220px; padding: 12px; background: linear-gradient(90deg, transparent, rgba(87,139,214,.18));';

export const select = (options: unknown[]) => ({ control: 'select', options });
export const number = { control: 'number' };
export const text = { control: 'text' };
export const boolean = { control: 'boolean' };
export const object = { control: 'object' };
export const color = { control: 'color' };
export const noControl = { control: false };
export const thickness = select(['thin', 'basic', 'thick']);
export const direction = select(['row', 'column']);
export const design = select(['nmorph', 'plain']);
export const selectionDesign = select(['nmorph', 'plain']);
export const placement = select([
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

export const commonInputArgTypes = {
  id: text,
  name: text,
  autocomplete: text,
  thickness,
  disabled: boolean,
  tabindex: number,
};

export const render = (components: Record<string, unknown>, template: string, extra: Record<string, unknown> = {}) => {
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
          tableData,
          formValue,
          ...extra,
        };
      },
      template,
    };
  };
};

export const renderWithAnchor = (template: string) => {
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
