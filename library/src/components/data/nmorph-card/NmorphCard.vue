<script setup lang="ts">
import { NmorphShadowType } from '@/types';
import { useModifiers } from '@/utils';
import { computed } from 'vue';

interface INmorphProps {
  shadowType?: keyof typeof NmorphShadowType;
  combinedShadowBorderWidth?: number;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  shadowType: 'outset',
  combinedShadowBorderWidth: 0,
});

const modifiers = computed(() =>
  useModifiers({
    nmorph: [NmorphShadowType[props.shadowType]],
    'nmorph-card': [props.shadowType],
  })
);

const combinedShadowBorderWidth = computed(() => `${props.combinedShadowBorderWidth}px`);
</script>

<template>
  <div :class="modifiers">
    <div class="nmorph-card__header">
      <slot name="header" />
    </div>
    <div class="nmorph-card__content">
      <slot />
    </div>
    <div class="nmorph-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/mixins' as *;

.nmorph--shadow-combined {
  @include nmorph-combined(v-bind(combinedShadowBorderWidth));
}
</style>

<style lang="scss">
@use '@/styles/mixins' as *;

.nmorph-card {
  --card-padding: var(--indentation-04);

  display: flex;
  flex-direction: column;
  width: 100%;
  padding: var(--card-padding);
  border-radius: var(--default-border-radius);

  .nmorph-card__header {
    @include title-2;
  }

  .nmorph-card__content {
    height: 100%;
  }

  .nmorph-card__footer {
    @include body-3;

    height: fit-content;
    margin-top: 4px;
  }
}
</style>
