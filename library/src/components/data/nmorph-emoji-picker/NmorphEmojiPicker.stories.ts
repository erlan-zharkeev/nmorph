import type { Meta } from '@storybook/vue3';
import { NmorphEmojiPicker } from '@/components';
import { boolean, color, number, object, render, text, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Data',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const EmojiPicker: Story = {
  args: {
    language: 'en',
    dataSource: [],
    i18n: {},
    quickList: [],
    initialExpanded: true,
    width: '300px',
    height: '260px',
    columns: 8,
    cellSize: undefined,
    toggleSize: undefined,
    scrollbarSize: undefined,
    hoverBackground: undefined,
    activeBackground: undefined,
    focusRing: undefined,
    disabled: false,
    hideShadow: false,
  },
  argTypes: {
    language: text,
    dataSource: object,
    i18n: object,
    quickList: object,
    initialExpanded: boolean,
    width: object,
    height: object,
    columns: number,
    cellSize: object,
    toggleSize: object,
    scrollbarSize: object,
    hoverBackground: color,
    activeBackground: color,
    focusRing: color,
    disabled: boolean,
    hideShadow: boolean,
  },
  render: render({ NmorphEmojiPicker }, '<NmorphEmojiPicker v-bind="args" />'),
};
