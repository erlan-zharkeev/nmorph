<script setup lang="ts">
import { ShadowType } from '@/types/common.enums';
import { createModifiers } from '@/utils';
import { computed } from 'vue';

interface IProps {
  shadowType?: keyof typeof ShadowType;
}

const props = withDefaults(defineProps<IProps>(), {
  shadowType: ShadowType.outset,
});

const modifiers = computed(() => createModifiers('nmorph-card', [props.shadowType]));
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
  --padding: 12px;

  width: 100%;
  padding: var(--padding);
  border-radius: var(--default-border-radius);
  display: flex;
  flex-direction: column;

  .nmorph-card__header {
    @include subtitle-2-stronger(var(--text-01));
  }

  .nmorph-card__content {
    height: 100%;
    @include body-1(var(--text-01));
  }

  .nmorph-card__footer {
    @include caption-1(var(--text-01));
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
