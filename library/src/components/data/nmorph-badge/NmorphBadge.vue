<script setup lang="ts">
import { computed, ref, onMounted, nextTick, watch } from 'vue';
import type { CSSProperties } from 'vue';
import { useModifiers } from '@/utils';
import { NmorphDomElementType } from '@/types';

type NmorphBadgeSize = 'tiny' | 'extra-small' | 'base';
type NmorphBadgeType = 'default' | 'dot' | 'tag' | 'ribbon';
type NmorphBadgeRibbonCorner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface INmorphProps {
  value?: number | string;
  max?: number;
  type?: NmorphBadgeType;
  ribbonCorner?: NmorphBadgeRibbonCorner;
  /**
   * @deprecated Use `type="dot"` instead.
   */
  isDot?: boolean;
  /**
   * @deprecated Use `type="tag"` instead.
   */
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
});

defineSlots<{
  default?: (props: Record<string, never>) => unknown;
  value?: (props: NmorphBadgeValueSlotProps) => unknown;
}>();

const resolvedType = computed<NmorphBadgeType>(() => {
  if (props.type !== 'default') return props.type;
  if (props.isDot) return 'dot';
  if (props.isTag) return 'tag';
  return 'default';
});
const isDotType = computed(() => resolvedType.value === 'dot');
const isTagType = computed(() => resolvedType.value === 'tag');
const isRibbon = computed(() => resolvedType.value === 'ribbon');

const modifiers = computed(() =>
  useModifiers({
    'nmorph-badge': [
      `${props.hidden && 'hidden'}`,
      `${isTagType.value && 'tag'}`,
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
      `${isTagType.value && 'tag'}`,
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
  if (isTagType.value || isRibbon.value) {
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
  ...(props.offsetX !== 0 && { '--nmorph-badge-ribbon-offset-x': getCssSize(props.offsetX) }),
  ...(props.offsetY !== 0 && { '--nmorph-badge-ribbon-offset-y': getCssSize(props.offsetY) }),
}));

const updateBadgeSize = async () => {
  await nextTick();
  if (!badge.value || isTagType.value || isRibbon.value) return;
  badgeWidth.value = badge.value.clientWidth;
  badgeHeight.value = badge.value.clientHeight;
};

const ribbonFrameStyle = computed<CSSProperties>(() => ({
  zIndex: props.zIndex,
}));

onMounted(updateBadgeSize);

watch(() => [props.value, props.max, resolvedType.value, props.ribbonCorner, props.size], updateBadgeSize);
</script>

<template>
  <div v-if="!props.disabled && (!isTagType || shouldShowBadge)" :class="modifiers" :style="styles">
    <slot v-if="!isTagType" />
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
        <template v-if="isTagType">
          {{ displayValue }}
        </template>
        <slot v-else name="value" :value="props.value" :display-value="displayValue"> {{ displayValue }} </slot>
      </div>
    </div>
  </div>
  <slot v-else-if="!isTagType" />
</template>

<style lang="scss">
$nmorph-badge-dot-size-tiny: 3px;
$nmorph-badge-dot-size-extra-small: 4px;
$nmorph-badge-dot-size-base: 4px;

.nmorph-badge {
  position: relative;
  display: inline-block;
  height: fit-content;

  --nmorph-badge-dot-size: #{$nmorph-badge-dot-size-base};
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
      height: 100%;
      padding: 0 var(--indentation-03);
      overflow: hidden;
      font-weight: 600;
      font-size: var(--font-size-extra-small);
      line-height: 1;
      white-space: nowrap;
      text-overflow: ellipsis;
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
    width: var(--nmorph-badge-dot-size);
    height: var(--nmorph-badge-dot-size);
    border-radius: var(--border-radius-circular);
  }

  &.nmorph-badge--tiny {
    --nmorph-badge-dot-size: #{$nmorph-badge-dot-size-tiny};
    --nmorph-badge-ribbon-height: 18px;
    --nmorph-badge-ribbon-corner-size: 50px;
    --nmorph-badge-ribbon-width: 92px;
  }

  &.nmorph-badge--extra-small {
    --nmorph-badge-dot-size: #{$nmorph-badge-dot-size-extra-small};
    --nmorph-badge-ribbon-height: 20px;
    --nmorph-badge-ribbon-corner-size: 56px;
    --nmorph-badge-ribbon-width: 104px;
  }
}
</style>
