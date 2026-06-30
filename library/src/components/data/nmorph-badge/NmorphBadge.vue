<script setup lang="ts">
import { computed, ref, onMounted, nextTick, watch } from 'vue';
import type { CSSProperties } from 'vue';
import { createCssSizeVariables, createCssVariables, useModifiers } from '@/utils';
import { NmorphDomElementType } from '@/types';
import type { INmorphBadgeProps, INmorphBadgeSlots } from './types';

const props = withDefaults(defineProps<INmorphBadgeProps>(), {
  max: 99,
  type: 'default',
  ribbonCorner: 'top-right',
  ribbonTilt: true,
  hidden: false,
  hideOnFalsyValue: false,
  color: 'var(--nmorph-accent-color)',
  size: 'base',
  dotSize: undefined,
  ribbonSize: undefined,
  ribbonWidth: undefined,
  ribbonCornerSize: undefined,
  ribbonRadius: undefined,
  offsetX: 0,
  offsetY: 0,
  zIndex: 1,
  disabled: false,
});

const slots = defineSlots<INmorphBadgeSlots>();

const isDotType = computed(() => props.type === 'dot');
const isTagType = computed(() => props.type === 'tag');
const isRibbon = computed(() => props.type === 'ribbon');

const modifiers = computed(() =>
  useModifiers({
    'nmorph-badge': [
      props.hidden && 'hidden',
      isTagType.value && 'tag',
      isRibbon.value && 'ribbon',
      isRibbon.value && `ribbon-${props.ribbonCorner}`,
      props.size,
    ],
  })
);

const containerModifiers = computed(() =>
  useModifiers({
    'nmorph-badge__container': [
      isTagType.value && 'tag',
      isRibbon.value && 'ribbon',
      isRibbon.value && `ribbon-${props.ribbonCorner}`,
    ],
  })
);

const ribbonCornerModifiers = computed(() =>
  useModifiers({
    'nmorph-badge__ribbon-corner': [props.ribbonCorner, !props.ribbonTilt && 'flat'],
  })
);

const displayValue = computed(() => {
  const isHaveMaxValue = typeof Number(props.value) === 'number' && Number(props.value) > props.max;
  return isHaveMaxValue ? `${props.max}+` : props.value;
});

const hasValueSlot = computed(() => Boolean(slots.value));
const shouldHideOnFalsyValue = computed(() => props.hideOnFalsyValue && !props.value);
const shouldShowBadge = computed(
  () => (isDotType.value || props.value !== undefined || hasValueSlot.value) && !shouldHideOnFalsyValue.value
);
const shouldRenderBadge = computed(() => shouldShowBadge.value && !props.hidden);

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

const badge = ref<NmorphDomElementType>(null);

const badgeWidth = ref(0);
const badgeHeight = ref(0);

const styles = computed<CSSProperties>(() => ({
  ...createCssVariables({
    '--nmorph-private-badge-color': props.color,
  }),
  ...createCssSizeVariables({
    '--nmorph-private-badge-dot-size': props.dotSize,
    '--nmorph-private-badge-ribbon-offset-x': props.offsetX !== 0 && props.offsetX,
    '--nmorph-private-badge-ribbon-offset-y': props.offsetY !== 0 && props.offsetY,
    '--nmorph-private-badge-ribbon-height': props.ribbonSize,
    '--nmorph-private-badge-ribbon-width': props.ribbonWidth,
    '--nmorph-private-badge-ribbon-corner-size': props.ribbonCornerSize,
    '--nmorph-private-badge-ribbon-radius': props.ribbonRadius,
  }),
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

watch(
  () => [
    props.value,
    props.max,
    props.type,
    props.ribbonCorner,
    props.ribbonTilt,
    props.size,
    props.hidden,
    props.hideOnFalsyValue,
  ],
  updateBadgeSize
);
</script>

<template>
  <div v-if="!props.disabled && (!isTagType || shouldRenderBadge)" :class="modifiers" :style="styles">
    <slot v-if="!isTagType" />
    <div v-if="shouldRenderBadge && isRibbon" class="nmorph-badge__ribbon-frame" :style="ribbonFrameStyle">
      <div :class="ribbonCornerModifiers">
        <div ref="badge" :class="containerModifiers" :style="containerStyle">
          <div class="nmorph-badge__content" :class="hasValueSlot && 'nmorph-badge__content--custom'">
            <slot name="value" :value="props.value" :display-value="displayValue"> {{ displayValue }} </slot>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="shouldRenderBadge" ref="badge" :class="containerModifiers" :style="containerStyle">
      <div v-if="isDotType" class="nmorph-badge__dot" />
      <div v-else class="nmorph-badge__content" :class="hasValueSlot && 'nmorph-badge__content--custom'">
        <slot name="value" :value="props.value" :display-value="displayValue"> {{ displayValue }} </slot>
      </div>
    </div>
  </div>
  <slot v-else-if="!isTagType" />
</template>

<style lang="scss">
$nmorph-badge-dot-size-tiny: 3px;
$nmorph-badge-dot-size-extra-small: 4px;
$nmorph-badge-dot-size-base: 4px;
$nmorph-badge-dot-size-medium: 5px;
$nmorph-badge-dot-size-large: 6px;
$nmorph-badge-dot-size-extra-large: 8px;

.nmorph-badge {
  position: relative;
  display: inline-block;
  height: fit-content;

  --nmorph-private-badge-dot-size: #{$nmorph-badge-dot-size-base};
  --nmorph-private-badge-ribbon-height: 24px;
  --nmorph-private-badge-ribbon-corner-size: 62px;
  --nmorph-private-badge-ribbon-width: 116px;
  --nmorph-private-badge-ribbon-radius: var(--border-radius-40);
  --nmorph-private-badge-ribbon-offset-x: 0px;
  --nmorph-private-badge-ribbon-offset-y: 0px;

  .nmorph-badge__container {
    position: absolute;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background: var(--nmorph-private-badge-color);
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

  .nmorph-badge__container--tag .nmorph-badge__content--custom {
    min-height: calc(1em * var(--line-height-regular) + 4px);
    padding: 2px;

    > .nmorph-icon {
      flex: 0 0 auto;
    }
  }

  .nmorph-badge__content {
    --nmorph-private-badge-content-color: var(--nmorph-light-shade-color);

    display: inline-flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    min-width: calc(1em * var(--line-height-regular) + 4px);
    padding: 2px 4px;
    color: var(--nmorph-private-badge-content-color);
    font-size: var(--nmorph-typography-body-large-font-size);
    line-height: var(--nmorph-typography-body-large-line-height);
    text-align: center;
  }

  .nmorph-badge__content .nmorph-icon {
    --nmorph-private-icon-color: var(--nmorph-private-badge-content-color);
  }

  &.nmorph-badge--tiny .nmorph-badge__content {
    font-size: var(--nmorph-typography-caption-font-size);
  }

  &.nmorph-badge--extra-small .nmorph-badge__content {
    font-size: var(--nmorph-typography-body-small-font-size);
  }

  &.nmorph-badge--medium .nmorph-badge__content {
    font-size: var(--nmorph-typography-title-small-font-size);
  }

  &.nmorph-badge--large .nmorph-badge__content {
    font-size: var(--nmorph-typography-title-font-size);
  }

  &.nmorph-badge--extra-large .nmorph-badge__content {
    font-size: var(--nmorph-typography-title-large-font-size);
  }

  .nmorph-badge__container--hidden {
    display: none;
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
    width: var(--nmorph-private-badge-ribbon-corner-size);
    height: var(--nmorph-private-badge-ribbon-corner-size);
  }

  .nmorph-badge__container--ribbon {
    top: 50%;
    left: 50%;
    width: var(--nmorph-private-badge-ribbon-width);
    height: var(--nmorph-private-badge-ribbon-height);
    border-radius: 0;
    box-shadow: var(--nmorph-shadow-outset);

    .nmorph-badge__content {
      width: 100%;
      min-width: 0;
      height: 100%;
      padding: 0 var(--indentation-03);
      overflow: hidden;
      font-weight: var(--font-weight-semibold);
      font-size: var(--nmorph-typography-label-font-size);
      line-height: 1;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .nmorph-badge__ribbon-corner--top-left {
    top: var(--nmorph-private-badge-ribbon-offset-y);
    left: var(--nmorph-private-badge-ribbon-offset-x);

    .nmorph-badge__container--ribbon {
      border-bottom-right-radius: var(--nmorph-private-badge-ribbon-radius);
      border-bottom-left-radius: var(--nmorph-private-badge-ribbon-radius);
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }

  .nmorph-badge__ribbon-corner--top-right {
    top: var(--nmorph-private-badge-ribbon-offset-y);
    right: var(--nmorph-private-badge-ribbon-offset-x);

    .nmorph-badge__container--ribbon {
      border-bottom-right-radius: var(--nmorph-private-badge-ribbon-radius);
      border-bottom-left-radius: var(--nmorph-private-badge-ribbon-radius);
      transform: translate(-50%, -50%) rotate(45deg);
    }
  }

  .nmorph-badge__ribbon-corner--bottom-left {
    bottom: var(--nmorph-private-badge-ribbon-offset-y);
    left: var(--nmorph-private-badge-ribbon-offset-x);

    .nmorph-badge__container--ribbon {
      border-top-left-radius: var(--nmorph-private-badge-ribbon-radius);
      border-top-right-radius: var(--nmorph-private-badge-ribbon-radius);
      transform: translate(-50%, -50%) rotate(45deg);
    }
  }

  .nmorph-badge__ribbon-corner--bottom-right {
    right: var(--nmorph-private-badge-ribbon-offset-x);
    bottom: var(--nmorph-private-badge-ribbon-offset-y);

    .nmorph-badge__container--ribbon {
      border-top-left-radius: var(--nmorph-private-badge-ribbon-radius);
      border-top-right-radius: var(--nmorph-private-badge-ribbon-radius);
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }

  .nmorph-badge__ribbon-corner--flat {
    width: var(--nmorph-private-badge-ribbon-width);
    height: var(--nmorph-private-badge-ribbon-height);

    .nmorph-badge__container--ribbon {
      position: relative;
      top: auto;
      left: auto;
      border-radius: 0;
      transform: none;
    }
  }

  &.nmorph-badge--tiny .nmorph-badge__container--ribbon .nmorph-badge__content {
    font-weight: var(--font-weight-regular);
    font-size: var(--nmorph-typography-caption-font-size);
  }

  &.nmorph-badge--medium .nmorph-badge__container--ribbon .nmorph-badge__content {
    font-size: var(--nmorph-typography-title-small-font-size);
  }

  &.nmorph-badge--large .nmorph-badge__container--ribbon .nmorph-badge__content {
    font-size: var(--nmorph-typography-title-font-size);
  }

  &.nmorph-badge--extra-large .nmorph-badge__container--ribbon .nmorph-badge__content {
    font-size: var(--nmorph-typography-title-large-font-size);
  }

  .nmorph-badge__dot {
    width: var(--nmorph-private-badge-dot-size);
    height: var(--nmorph-private-badge-dot-size);
    border-radius: var(--border-radius-circular);
  }

  &.nmorph-badge--tiny {
    --nmorph-private-badge-dot-size: #{$nmorph-badge-dot-size-tiny};
    --nmorph-private-badge-ribbon-height: 18px;
    --nmorph-private-badge-ribbon-corner-size: 50px;
    --nmorph-private-badge-ribbon-width: 92px;
  }

  &.nmorph-badge--extra-small {
    --nmorph-private-badge-dot-size: #{$nmorph-badge-dot-size-extra-small};
    --nmorph-private-badge-ribbon-height: 20px;
    --nmorph-private-badge-ribbon-corner-size: 56px;
    --nmorph-private-badge-ribbon-width: 104px;
  }

  &.nmorph-badge--medium {
    --nmorph-private-badge-dot-size: #{$nmorph-badge-dot-size-medium};
    --nmorph-private-badge-ribbon-height: 28px;
    --nmorph-private-badge-ribbon-corner-size: 68px;
    --nmorph-private-badge-ribbon-width: 128px;
  }

  &.nmorph-badge--large {
    --nmorph-private-badge-dot-size: #{$nmorph-badge-dot-size-large};
    --nmorph-private-badge-ribbon-height: 32px;
    --nmorph-private-badge-ribbon-corner-size: 76px;
    --nmorph-private-badge-ribbon-width: 144px;
  }

  &.nmorph-badge--extra-large {
    --nmorph-private-badge-dot-size: #{$nmorph-badge-dot-size-extra-large};
    --nmorph-private-badge-ribbon-height: 36px;
    --nmorph-private-badge-ribbon-corner-size: 84px;
    --nmorph-private-badge-ribbon-width: 160px;
  }
}
</style>
