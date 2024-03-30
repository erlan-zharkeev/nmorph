<script setup lang="ts">
import { ShadowType } from '@/types/common.enums';
import { getModifiers } from '@/utils';
import { computed } from 'vue';

interface IProps {
  shadowType?: keyof typeof ShadowType;
}

const props = withDefaults(defineProps<IProps>(), {
  shadowType: ShadowType.outset,
});

const modifiers = computed(() =>
  getModifiers({
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

  width: 100%;
  padding: var(--card-padding);
  border-radius: var(--default-border-radius);
  display: flex;
  flex-direction: column;

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
