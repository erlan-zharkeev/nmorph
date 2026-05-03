<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useModifiers } from '@/utils';
import { NmorphDomElementType } from '@/types';
import { styled, css } from '@vue-styled-components/core'

interface INmorphProps {
  value?: number | string;
  max?: number;
  isDot?: boolean;
  isTag?: boolean;
  hidden?: boolean;
  color?: string;
  offsetY?: number;
  offsetX?: number;
  disabled?: boolean;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  max: 99,
  isDot: false,
  isTag: false,
  hidden: false,
  color: 'var(--nmorph-accent-color)',
  offsetX: 0,
  offsetY: 0,
  disabled: false,
});

const modifiers = computed(() =>
  useModifiers({
    'nmorph-badge': [`${props.hidden && 'hidden'}`, `${props.isTag && 'tag'}`],
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
  if (props.isTag) return undefined;
  return {
    right: appliedOffset.value.x,
    top: appliedOffset.value.y,
  };
});

const badge = ref<NmorphDomElementType>(null);

const badgeWidth = ref(0);
const badgeHeight = ref(0);

onMounted(() => {
  if (!badge.value || props.isTag) return;
  badgeWidth.value = badge.value.clientWidth;
  badgeHeight.value = badge.value.clientHeight;
});

const commonCSS = css`
  position: relative;
  display: inline-block;
  height: fit-content;

  --dot-size: 4px;

  .nmorph-badge__container {
    position: absolute;
    display: inline-flex;
    align-items: center;
    justify-content: center;
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
`

const StyledComponent = styled.div`
  ${commonCSS}
  .nmorph-badge__container {
    background: ${props => props.color}
  }
`
</script>

<template>
  <StyledComponent v-if="!props.disabled && (!props.isTag || shouldShowBadge)" :class="modifiers" :props="{ color: props.color }">
    <slot v-if="!props.isTag" />
    <div v-if="shouldShowBadge" ref="badge" :class="containerModifiers" :style="containerStyle">
      <div v-if="props.isDot" class="nmorph-badge__dot" />
      <div v-else class="nmorph-badge__content">
        <template v-if="props.isTag">
          {{ displayValue }}
        </template>
        <slot v-else name="value"> {{ displayValue }} </slot>
      </div>
    </div>
  </StyledComponent>
  <slot v-else-if="!props.isTag" />
</template>
