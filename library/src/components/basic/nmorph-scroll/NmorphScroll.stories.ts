import type { Meta } from '@storybook/vue3';
import { NmorphScroll } from '@/components';
import { boolean, number, object, render, scrollContentStyle, select, text, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Basic',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Scroll: Story = {
  args: {
    height: '100%',
    maxHeight: 'none',
    gap: undefined,
    modelValue: { x: 0, y: 0 },
    scrollYProp: 'auto',
    scrollXProp: 'auto',
    cssScrollBehavior: 'smooth',
    scrollEndDelay: 50,
    updateOnlyOnScrollEnd: false,
    yBarWidthInPx: 6,
    xBarWidthInPx: 6,
    yGapInPx: 0,
    xGapInPx: 0,
  },
  argTypes: {
    height: text,
    maxHeight: text,
    gap: object,
    modelValue: object,
    scrollYProp: select(['auto', 'hidden', 'scroll']),
    scrollXProp: select(['auto', 'hidden', 'scroll']),
    cssScrollBehavior: select(['auto', 'smooth', 'inherit', 'initial', 'unset']),
    scrollEndDelay: number,
    updateOnlyOnScrollEnd: boolean,
    yBarWidthInPx: number,
    xBarWidthInPx: number,
    yGapInPx: number,
    xGapInPx: number,
  },
  render: render(
    { NmorphScroll },
    `<NmorphScroll v-bind="args" v-model="modelValue">
      <div style="${scrollContentStyle}">Scrollable Nmorph content</div>
    </NmorphScroll>`
  ),
};
