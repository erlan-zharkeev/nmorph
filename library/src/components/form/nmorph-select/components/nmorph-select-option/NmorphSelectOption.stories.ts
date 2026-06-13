import type { Meta } from '@storybook/vue3';
import { NmorphSelect, NmorphSelectOption } from '@/components';
import { boolean, color, render, text, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Form',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const SelectOption: Story = {
  args: {
    value: 'story',
    label: '',
    disabled: false,
    focused: false,
    hoverBackground: undefined,
    hoverColor: undefined,
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
