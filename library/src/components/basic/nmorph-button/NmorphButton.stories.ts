import type { Meta } from '@storybook/vue3';
import { NmorphButton, NmorphIconSearch } from '@/components';
import { boolean, color, commonInputArgTypes, object, render, select, text, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Basic',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Button: Story = {
  args: {
    type: 'button',
    fill: false,
    text: undefined,
    color: undefined,
    disabled: false,
    loading: false,
    design: 'nmorph',
    borderless: false,
    thickness: 'basic',
    accentBgOnHover: false,
    ripple: true,
    shape: 'default',
    tabindex: 0,
    toggle: false,
    modelValue: undefined,
    active: false,
    danger: false,
  },
  argTypes: {
    ...commonInputArgTypes,
    text: text,
    design: select(['nmorph', 'plain']),
    color: color,
    loading: boolean,
    ripple: boolean,
    type: select(['button', 'submit', 'reset']),
    fill: boolean,
    borderless: boolean,
    accentBgOnHover: boolean,
    shape: select(['default', 'round', 'circle', 'square']),
    toggle: boolean,
    modelValue: object,
    active: boolean,
    danger: boolean,
  },
  render: render(
    { NmorphButton, NmorphIconSearch },
    '<NmorphButton v-bind="args"><template #icon><NmorphIconSearch /></template></NmorphButton>'
  ),
};
