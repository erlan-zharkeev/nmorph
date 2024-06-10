<script setup lang="ts">
import { NmorphShadowType } from '@/types/common';
import { useModifiers } from '@/utils';
import { computed } from 'vue';

interface INmorphProps {
  shadowType?: keyof typeof NmorphShadowType;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  shadowType: NmorphShadowType.outset,
});

const modifiers = computed(() =>
  useModifiers({
    'nmorph-card': [props.shadowType],
  })
);
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

<style lang="scss">
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
  }
}

.nmorph-card--inset {
  @include nmorph-inset;
}

.nmorph-card--outset {
  @include nmorph-outset;
}

.nmorph-card--combined {
  @include nmorph-combined;
}
</style>
