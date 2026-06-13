import type { Meta } from '@storybook/vue3';
import { NmorphCallout } from '@/components';
import { color, render, select, text, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Feedback',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Callout: Story = {
  args: {
    type: 'info',
    title: '',
    content: '',
    as: 'div',
    href: undefined,
    target: undefined,
    rel: undefined,
    referrerpolicy: undefined,
    referrerPolicy: undefined,
    download: undefined,
    ariaLabel: undefined,
    color: undefined,
    padding: 'var(--indentation-03) var(--indentation-04)',
    borderRadius: 'var(--default-border-radius)',
    accentWidth: 'var(--indentation-02)',
    titleGap: 'var(--indentation-03)',
    titleFontSize: 'var(--nmorph-typography-title-small-font-size)',
    contentFontSize: 'var(--nmorph-typography-body-small-font-size)',
  },
  argTypes: {
    type: select(['info', 'warning', 'success', 'error']),
    title: text,
    content: text,
    as: text,
    href: text,
    target: text,
    rel: text,
    referrerpolicy: text,
    referrerPolicy: text,
    download: text,
    ariaLabel: text,
    color: color,
    padding: text,
    borderRadius: text,
    accentWidth: text,
    titleGap: text,
    titleFontSize: text,
    contentFontSize: text,
  },
  render: render({ NmorphCallout }, '<NmorphCallout v-bind="args" style="width: 360px;" />'),
};
