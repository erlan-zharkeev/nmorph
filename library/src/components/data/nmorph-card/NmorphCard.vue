<script setup lang="ts">
import { NmorphShadowType } from '@/types';
import { computed, useSlots } from 'vue';
import { styled, css } from '@vue-styled-components/core';
import { useModifiers, nmorphCombined, body3, title2 } from '@/utils';

interface INmorphProps {
  shadowType?: keyof typeof NmorphShadowType;
  combinedShadowBorderWidth?: number;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  shadowType: 'outset',
  combinedShadowBorderWidth: 0,
});

const slots = useSlots();

const modifiers = computed(() =>
  useModifiers({
    nmorph: [NmorphShadowType[props.shadowType]],
    'nmorph-card': [props.shadowType],
  })
);

const commonCSS = css`
  --card-padding: var(--indentation-04);

  display: flex;
  flex-direction: column;
  width: 100%;
  padding: var(--card-padding);
  border-radius: var(--default-border-radius);

  .nmorph-card__content {
    height: 100%;
  }

  .nmorph-card__header {
    ${title2()};
  }

  .nmorph-card__footer {
    ${body3()};
    height: fit-content;
    margin-top: 4px;
  }
`;

const StyledComponent = styled.div`
  ${commonCSS}

  &.nmorph--shadow-combined {
    ${nmorphCombined(Number((props) => props.combinedShadowBorderWidth))};
  }
`;
</script>

<template>
  <StyledComponent :class="modifiers" :props="{ combinedShadowBorderWidth: props.combinedShadowBorderWidth }">
    <div class="nmorph-card__header">
      <slot name="header" />
    </div>
    <div class="nmorph-card__content">
      <slot />
    </div>
    <div v-if="slots.footer" class="nmorph-card__footer">
      <slot name="footer" />
    </div>
  </StyledComponent>
</template>
