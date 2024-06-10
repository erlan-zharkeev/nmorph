<script setup lang="ts">
import { computed, ref } from 'vue';
import { useModifiers } from '@/utils';
import { NmorphDomElementType } from '@/types/common';
import { onMounted } from 'vue';

interface INmorphProps {
  value?: number | string;
  max?: number;
  isDot?: boolean;
  hidden?: boolean;
  color?: string;
  offsetY?: number;
  offsetX?: number;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  value: '',
  max: 99,
  isDot: false,
  hidden: false,
  color: 'var(--accent-color-00)',
  offsetX: 0,
  offsetY: 0,
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
  const x = `-${badgeWidth?.value / 2 + props.offsetX}px`;
  const y = `-${badgeHeight?.value / 2 + props.offsetY}px`;
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
  <div :class="modifiers">
    <slot />
    <div ref="badge" :class="containerModifiers" :style="{ right: appliedOffset.x, top: appliedOffset.y }">
      <div v-if="props.isDot" class="nmorph-badge__dot" />
      <div v-else class="nmorph-badge__content">{{ displayValue }}</div>
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-badge {
  position: relative;
  display: inline-block;
  .nmorph-badge__container {
    background: v-bind(color);
    opacity: 1;
    border-radius: var(--default-border-radius);
    position: absolute;
  }
  .nmorph-badge__content {
    color: var(--lighter-color);
    padding: 2px 4px;
  }
  .nmorph-badge__container--hidden {
    opacity: 0;
  }
  .nmorph-badge__dot {
    width: 4px;
    height: 4px;
    border-radius: var(--border-radius-circular);
  }
}
</style>
