<script setup lang="ts">
import { computed, ref } from 'vue';
import { useModifiers } from '@/utils';
import { NmorphDomElementType } from '@/types';
import { onMounted } from 'vue';

interface INmorphProps {
  value: number | string;
  max?: number;
  isDot?: boolean;
  hidden?: boolean;
  color?: string;
  offsetY?: number;
  offsetX?: number;
  disabled?: boolean;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  value: '',
  max: 99,
  isDot: false,
  hidden: false,
  color: 'var(--nmorph-accent-color)',
  offsetX: 0,
  offsetY: 0,
  disabled: false,
});

const modifiers = computed(() =>
  useModifiers({
    'nmorph-badge': [`${props.hidden && 'hidden'}`],
  })
);

const containerModifiers = computed(() =>
  useModifiers({
    'nmorph-badge__container': [`${props.hidden && 'hidden'}`],
  })
);

const displayValue = computed(() => {
  const isHaveMaxValue = typeof Number(props.value) === 'number' && Number(props.value) > props.max;
  return isHaveMaxValue ? `${props.max}+` : props.value;
});

const appliedOffset = computed(() => {
  const x = `${(badgeWidth?.value / 2 + props.offsetX) * -1}px`;
  const y = `${(badgeHeight?.value / 2 + props.offsetY) * -1}px`;
  return {
    x,
    y,
  };
});

const badge = ref<NmorphDomElementType>(null);

const badgeWidth = ref(0);
const badgeHeight = ref(0);

onMounted(() => {
  if (!badge.value) return;
  badgeWidth.value = badge.value.clientWidth;
  badgeHeight.value = badge.value.clientHeight;
});
</script>

<template>
  <div v-if="!props.disabled" :class="modifiers">
    <slot />
    <div ref="badge" :class="containerModifiers" :style="{ right: appliedOffset.x, top: appliedOffset.y }">
      <div v-if="props.isDot" class="nmorph-badge__dot" />
      <div v-else class="nmorph-badge__content">
        <slot name="value"> {{ displayValue }} </slot>
      </div>
    </div>
  </div>
  <slot v-else />
</template>

<style lang="scss">
.nmorph-badge {
  position: relative;
  display: inline-block;
  --dot-size: 4px;

  .nmorph-badge__container {
    position: absolute;
    background: v-bind(color);
    border-radius: var(--default-border-radius);
    opacity: 1;
  }

  .nmorph-badge__content {
    padding: 2px 4px;
    color: var(--nmorph-light-shade-color);
  }

  .nmorph-badge__container--hidden {
    opacity: 0;
  }

  .nmorph-badge__dot {
    width: var(--dot-size);
    height: var(--dot-size);
    border-radius: var(--border-radius-circular);
  }
}
</style>
