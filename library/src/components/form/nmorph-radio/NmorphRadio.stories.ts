import type { Meta } from '@storybook/vue3';
import { NmorphRadio } from '@/components';
import { boolean, number, render, select, text, thickness, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Form',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Radio: Story = {
  args: {
    disabled: false,
    label: '',
    design: 'nmorph',
    checked: false,
    tabindex: 0,
    value: '',
    thickness: undefined,
  },
  argTypes: {
    disabled: boolean,
    label: text,
    design: select(['plain', 'nmorph']),
    checked: boolean,
    tabindex: number,
    value: text,
    thickness,
  },
  render: render({ NmorphRadio }, '<NmorphRadio v-bind="args" />'),
};
