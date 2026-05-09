<script setup lang="ts">
import { NmorphShadowType } from '@/types';
import { computed, useSlots } from 'vue';
import { useModifiers } from '@/utils';

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
</script>

<template>
  <div :class="modifiers" :style="{ '--nmorph-card-combined-border-width': `${props.combinedShadowBorderWidth}px` }">
    <div class="nmorph-card__header">
      <slot name="header" />
    </div>
    <div class="nmorph-card__content">
      <slot />
    </div>
    <div v-if="slots.footer" class="nmorph-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-card {
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
    font-weight: 600;
    font-size: var(--font-size-large);
    line-height: var(--line-height-loose);
  }

  .nmorph-card__footer {
    font-weight: 400;
    font-size: var(--font-size-extra-small);
    line-height: var(--line-height-regular);
    height: fit-content;
    margin-top: 4px;
  }

  &.nmorph--shadow-combined {
    border: var(--nmorph-card-combined-border-width) solid var(--nmorph-main-color);
    background: var(--nmorph-main-color);
    box-shadow:
      var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
      calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
        var(--nmorph-light-shade-color),
      inset var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
      inset calc(-1 * var(--base-shadow-width)) calc(-0.5 * var(--base-shadow-width)) var(--base-shadow-blur)
        var(--nmorph-light-shade-color);
  }
}
</style>
