<script setup lang="ts">
import { computed, ref, onMounted, nextTick, watch } from 'vue';
import type { CSSProperties } from 'vue';
import { useModifiers } from '@/utils';
import { NmorphDomElementType } from '@/types';

type NmorphBadgeSize = 'tiny' | 'extra-small' | 'base';
type NmorphBadgeType = 'default' | 'dot' | 'ribbon';
type NmorphBadgeRibbonCorner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface INmorphProps {
  value?: number | string;
  max?: number;
  type?: NmorphBadgeType;
  ribbonCorner?: NmorphBadgeRibbonCorner;
  isDot?: boolean;
  isTag?: boolean;
  hidden?: boolean;
  color?: string;
  size?: NmorphBadgeSize;
  offsetY?: number;
  offsetX?: number;
  zIndex?: number;
  disabled?: boolean;
  dotSize?: number | string;
}

type NmorphBadgeValueSlotProps = {
  value: INmorphProps['value'];
  displayValue: string | number | undefined;
};

const props = withDefaults(defineProps<INmorphProps>(), {
  value: undefined,
  max: 99,
  type: 'default',
  ribbonCorner: 'top-right',
  isDot: false,
  isTag: false,
  hidden: false,
  color: 'var(--nmorph-accent-color)',
  size: 'base',
  offsetX: 0,
  offsetY: 0,
  zIndex: 1,
  disabled: false,
  dotSize: undefined,
});

defineSlots<{
  default?: (props: Record<string, never>) => unknown;
  value?: (props: NmorphBadgeValueSlotProps) => unknown;
}>();

const resolvedType = computed<NmorphBadgeType>(() => (props.isDot ? 'dot' : props.type));
const isDotType = computed(() => resolvedType.value === 'dot');
const isRibbon = computed(() => resolvedType.value === 'ribbon' && !props.isTag);

const modifiers = computed(() =>
  useModifiers({
    'nmorph-badge': [
      `${props.hidden && 'hidden'}`,
      `${props.isTag && 'tag'}`,
      `${isRibbon.value && 'ribbon'}`,
      `${isRibbon.value && `ribbon-${props.ribbonCorner}`}`,
      props.size,
    ],
  })
);

const containerModifiers = computed(() =>
  useModifiers({
    'nmorph-badge__container': [
      `${props.hidden && 'hidden'}`,
      `${props.isTag && 'tag'}`,
      `${isRibbon.value && 'ribbon'}`,
      `${isRibbon.value && `ribbon-${props.ribbonCorner}`}`,
    ],
  })
);

const ribbonCornerModifiers = computed(() =>
  useModifiers({
    'nmorph-badge__ribbon-corner': [`${props.ribbonCorner}`],
  })
);

const displayValue = computed(() => {
  const isHaveMaxValue = typeof Number(props.value) === 'number' && Number(props.value) > props.max;
  return isHaveMaxValue ? `${props.max}+` : props.value;
});

const shouldShowBadge = computed(() => isDotType.value || props.value !== undefined);

const appliedOffset = computed(() => {
  const x = `${(badgeWidth?.value / 2 + props.offsetX) * -1}px`;
  const y = `${(badgeHeight?.value / 2 + props.offsetY) * -1}px`;
  return {
    x,
    y,
  };
});

const containerStyle = computed(() => {
  if (props.isTag || isRibbon.value) {
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

const getCssSize = (value?: number | string) => (typeof value === 'number' ? `${value}px` : value);

const badge = ref<NmorphDomElementType>(null);

const badgeWidth = ref(0);
const badgeHeight = ref(0);

const styles = computed<CSSProperties>(() => ({
  '--nmorph-badge-color': props.color,
  ...(props.dotSize !== undefined && { '--dot-size': getCssSize(props.dotSize) }),
}));

const updateBadgeSize = async () => {
  await nextTick();
  if (!badge.value || props.isTag || isRibbon.value) return;
  badgeWidth.value = badge.value.clientWidth;
  badgeHeight.value = badge.value.clientHeight;
};

const ribbonFrameStyle = computed<CSSProperties>(() => ({
  zIndex: props.zIndex,
}));

onMounted(updateBadgeSize);

watch(() => [props.value, props.max, resolvedType.value, props.ribbonCorner, props.isTag, props.size], updateBadgeSize);
</script>

<template>
  <div v-if="!props.disabled && (!props.isTag || shouldShowBadge)" :class="modifiers" :style="styles">
    <slot v-if="!props.isTag" />
    <div v-if="shouldShowBadge && isRibbon" class="nmorph-badge__ribbon-frame" :style="ribbonFrameStyle">
      <div :class="ribbonCornerModifiers">
        <div ref="badge" :class="containerModifiers" :style="containerStyle">
          <div class="nmorph-badge__content">
            <slot name="value" :value="props.value" :display-value="displayValue"> {{ displayValue }} </slot>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="shouldShowBadge" ref="badge" :class="containerModifiers" :style="containerStyle">
      <div v-if="isDotType" class="nmorph-badge__dot" />
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
  --nmorph-badge-ribbon-height: 24px;
  --nmorph-badge-ribbon-corner-size: 62px;
  --nmorph-badge-ribbon-width: 116px;
  --nmorph-badge-ribbon-offset-x: 0px;
  --nmorph-badge-ribbon-offset-y: 0px;

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
    display: inline-flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
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

  .nmorph-badge__ribbon-frame {
    position: absolute;
    inset: 0;
    overflow: hidden;
    border-radius: var(--default-border-radius);
    pointer-events: none;
  }

  .nmorph-badge__ribbon-corner {
    position: absolute;
    width: var(--nmorph-badge-ribbon-corner-size);
    height: var(--nmorph-badge-ribbon-corner-size);
  }

  .nmorph-badge__container--ribbon {
    top: 50%;
    left: 50%;
    width: var(--nmorph-badge-ribbon-width);
    height: var(--nmorph-badge-ribbon-height);
    border-radius: 0;
    box-shadow: var(--nmorph-shadow-outset);

    .nmorph-badge__content {
      width: 100%;
      min-width: 0;
      padding: 0 var(--indentation-03);
      overflow: hidden;
      font-weight: 600;
      font-size: var(--font-size-extra-small);
      white-space: nowrap;
      text-overflow: ellipsis;
      transform: translateY(-1px);
    }
  }

  .nmorph-badge__ribbon-corner--top-left {
    top: var(--nmorph-badge-ribbon-offset-y);
    left: var(--nmorph-badge-ribbon-offset-x);

    .nmorph-badge__container--ribbon {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }

  .nmorph-badge__ribbon-corner--top-right {
    top: var(--nmorph-badge-ribbon-offset-y);
    right: var(--nmorph-badge-ribbon-offset-x);

    .nmorph-badge__container--ribbon {
      transform: translate(-50%, -50%) rotate(45deg);
    }
  }

  .nmorph-badge__ribbon-corner--bottom-left {
    bottom: var(--nmorph-badge-ribbon-offset-y);
    left: var(--nmorph-badge-ribbon-offset-x);

    .nmorph-badge__container--ribbon {
      transform: translate(-50%, -50%) rotate(45deg);
    }
  }

  .nmorph-badge__ribbon-corner--bottom-right {
    right: var(--nmorph-badge-ribbon-offset-x);
    bottom: var(--nmorph-badge-ribbon-offset-y);

    .nmorph-badge__container--ribbon {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }

  .nmorph-badge__dot {
    width: var(--dot-size);
    height: var(--dot-size);
    border-radius: var(--border-radius-circular);
  }

  &.nmorph-badge--tiny {
    --nmorph-badge-ribbon-height: 18px;
    --nmorph-badge-ribbon-corner-size: 50px;
    --nmorph-badge-ribbon-width: 92px;
  }

  &.nmorph-badge--extra-small {
    --nmorph-badge-ribbon-height: 20px;
    --nmorph-badge-ribbon-corner-size: 56px;
    --nmorph-badge-ribbon-width: 104px;
  }
}
</style>
