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

export const Form: Story = {
  args: {
    value: formValue,
    validateImmediately: false,
    formItemId: 'email',
    formItemName: '',
    formItemAutocomplete: '',
    formItemThickness: 'basic',
    formItemLabel: '',
    showValidationIcon: true,
    staticErrorBoxSpace: false,
  },
  argTypes: {
    value: object,
    validateImmediately: boolean,
    formItemId: text,
    formItemName: text,
    formItemAutocomplete: text,
    formItemThickness: thickness,
    formItemLabel: text,
    showValidationIcon: boolean,
    staticErrorBoxSpace: boolean,
  },
  render: render(
    { NmorphForm, NmorphFormItem, NmorphTextInput },
    `<NmorphForm :value="args.value" :validate-immediately="args.validateImmediately" style="${wideStyle}">
      <NmorphFormItem :id="args.formItemId" :name="args.formItemName" :autocomplete="args.formItemAutocomplete" :thickness="args.formItemThickness" :label="args.formItemLabel" :show-validation-icon="args.showValidationIcon" :static-error-box-space="args.staticErrorBoxSpace">
        <NmorphTextInput :id="args.formItemId" />
      </NmorphFormItem>
    </NmorphForm>`
  ),
};
