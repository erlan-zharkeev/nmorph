import type { Meta } from '@storybook/vue3';
import { NmorphBreadcrumb, NmorphBreadcrumbItem } from '@/components';
import { boolean, render, text, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Navigation',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const BreadcrumbItem: Story = {
  args: {
    to: '',
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
