<script setup lang="ts">
import { computed, ref, onMounted, nextTick, watch } from 'vue';
import { useModifiers } from '@/utils';
import { NmorphDomElementType } from '@/types';

type NmorphBadgeSize = 'tiny' | 'extra-small' | 'base';

interface INmorphProps {
  value?: number | string;
  max?: number;
  isDot?: boolean;
  isTag?: boolean;
  hidden?: boolean;
  color?: string;
  size?: NmorphBadgeSize;
  offsetY?: number;
  offsetX?: number;
  zIndex?: number;
  disabled?: boolean;
}

type NmorphBadgeValueSlotProps = {
  value: INmorphProps['value'];
  displayValue: string | number | undefined;
};

const props = withDefaults(defineProps<INmorphProps>(), {
  value: undefined,
  max: 99,
  isDot: false,
  isTag: false,
  hidden: false,
  color: 'var(--nmorph-accent-color)',
  size: 'base',
  offsetX: 0,
  offsetY: 0,
  zIndex: 1,
  disabled: false,
});

defineSlots<{
  default?: (props: Record<string, never>) => unknown;
  value?: (props: NmorphBadgeValueSlotProps) => unknown;
}>();

const modifiers = computed(() =>
  useModifiers({
    'nmorph-badge': [`${props.hidden && 'hidden'}`, `${props.isTag && 'tag'}`, props.size],
  })
);

const containerModifiers = computed(() =>
  useModifiers({
    'nmorph-badge__container': [`${props.hidden && 'hidden'}`, `${props.isTag && 'tag'}`],
  })
);

const displayValue = computed(() => {
  const isHaveMaxValue = typeof Number(props.value) === 'number' && Number(props.value) > props.max;
  return isHaveMaxValue ? `${props.max}+` : props.value;
});

const shouldShowBadge = computed(() => props.isDot || props.value !== undefined);

const appliedOffset = computed(() => {
  const x = `${(badgeWidth?.value / 2 + props.offsetX) * -1}px`;
  const y = `${(badgeHeight?.value / 2 + props.offsetY) * -1}px`;
  return {
    x,
    y,
  };
});

const containerStyle = computed(() => {
  if (props.isTag) {
    return {
      zIndex: props.zIndex,
    };
  }
  return {
    right: appliedOffset.value.x,
    top: appliedOffset.value.y,
    zIndex: props.zIndex,
  };
});

const badge = ref<NmorphDomElementType>(null);

const badgeWidth = ref(0);
const badgeHeight = ref(0);

const updateBadgeSize = async () => {
  await nextTick();
  if (!badge.value || props.isTag) return;
  badgeWidth.value = badge.value.clientWidth;
  badgeHeight.value = badge.value.clientHeight;
};

onMounted(updateBadgeSize);

watch(() => [props.value, props.max, props.isDot, props.isTag, props.size], updateBadgeSize);
</script>

<template>
  <div
    v-if="!props.disabled && (!props.isTag || shouldShowBadge)"
    :class="modifiers"
    :style="{ '--nmorph-badge-color': props.color }"
  >
    <slot v-if="!props.isTag" />
    <div v-if="shouldShowBadge" ref="badge" :class="containerModifiers" :style="containerStyle">
      <div v-if="props.isDot" class="nmorph-badge__dot" />
      <div v-else class="nmorph-badge__content">
        <template v-if="props.isTag">
          {{ displayValue }}
        </template>
        <slot v-else name="value" :value="props.value" :display-value="displayValue"> {{ displayValue }} </slot>
      </div>
    </div>
  </div>
  <slot v-else-if="!props.isTag" />
</template>

<style lang="scss">
.nmorph-badge {
  position: relative;
  display: inline-block;
  height: fit-content;

  --dot-size: 4px;

  .nmorph-badge__container {
    position: absolute;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background: var(--nmorph-badge-color);
    border-radius: var(--default-border-radius);
    opacity: 1;
  }

  &.nmorph-badge--tag {
    position: static;
    display: inline-flex;
  }

  .nmorph-badge__container--tag {
    position: static;
  }

  .nmorph-badge__content {
    box-sizing: border-box;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    min-width: calc(1em * var(--line-height-regular) + 4px);
    padding: 2px 4px;
    color: var(--nmorph-light-shade-color);
    font-size: var(--font-size-base);
    line-height: var(--line-height-regular);
    text-align: center;
  }

  &.nmorph-badge--tiny .nmorph-badge__content {
    font-size: var(--font-size-tiny);
  }

  &.nmorph-badge--extra-small .nmorph-badge__content {
    font-size: var(--font-size-extra-small);
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
