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

export const Breadcrumb: Story = {
  args: {
    separator: '/',
    firstTo: '',
    secondTo: '',
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
