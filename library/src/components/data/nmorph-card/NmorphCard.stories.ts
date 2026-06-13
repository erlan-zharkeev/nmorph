import type { Meta } from '@storybook/vue3';
import { NmorphCard } from '@/components';
import { boolean, cardStyle, design, number, object, render, select, text, type Story } from '#storybook/story-utils';

const meta: Meta = {
  title: 'Nmorph/Data',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Card: Story = {
  args: {
    design: 'nmorph',
    shadowType: 'outset',
    combinedShadowBorderWidth: 0,
    cardPadding: undefined,
    padding: undefined,
    radius: undefined,
    contentPadding: undefined,
    contentClass: '',
    paper: 0,
    fill: true,
    tag: 'div',
  },
  argTypes: {
    design,
    shadowType: select(['inset', 'outset', 'combined', 'not-defined']),
    combinedShadowBorderWidth: number,
    cardPadding: object,
    padding: object,
    radius: object,
    contentPadding: object,
    contentClass: text,
    paper: number,
    fill: boolean,
    tag: text,
  },
  render: render(
    { NmorphCard },
    `<NmorphCard v-bind="args" style="${cardStyle}">
      <template #header>Card header</template>
      Card content
      <template #footer>Card footer</template>
    </NmorphCard>`
  ),
};
