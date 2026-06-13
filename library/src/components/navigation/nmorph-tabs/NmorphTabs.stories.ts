import type { Meta } from '@storybook/vue3';
import { NmorphTabPane, NmorphTabs } from '@/components';
import { boolean, object, render, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Navigation',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Tabs: Story = {
  args: {
    modelValue: 0,
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
