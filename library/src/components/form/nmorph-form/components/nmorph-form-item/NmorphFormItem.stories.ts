import type { Meta } from '@storybook/vue3';
import { NmorphForm, NmorphFormItem, NmorphTextInput } from '@/components';
import { boolean, object, render, text, thickness, wideStyle, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Form',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const FormItem: Story = {
  args: {
    value: formValue,
    id: 'email',
    name: '',
    autocomplete: '',
    label: '',
    thickness: 'basic',
    showValidationIcon: true,
    staticErrorBoxSpace: false,
  },
  argTypes: {
    value: object,
    id: text,
    name: text,
    autocomplete: text,
    label: text,
    thickness,
    showValidationIcon: boolean,
    staticErrorBoxSpace: boolean,
  },
  render: render(
    { NmorphForm, NmorphFormItem, NmorphTextInput },
    `<NmorphForm :value="args.value" style="${wideStyle}">
      <NmorphFormItem :id="args.id" :label="args.label" :name="args.name" :autocomplete="args.autocomplete" :thickness="args.thickness" :show-validation-icon="args.showValidationIcon" :static-error-box-space="args.staticErrorBoxSpace">
        <NmorphTextInput />
      </NmorphFormItem>
    </NmorphForm>`
  ),
};
