import type { Meta } from '@storybook/vue3';
import { NmorphTabPane, NmorphTabs } from '@/components';
import { boolean, render, text, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Navigation',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const TabPane: Story = {
  args: {
    name: 'story',
    label: '',
    content: '',
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
