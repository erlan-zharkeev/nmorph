<script setup lang="ts">
import { usePlacement } from '@/hooks';
import { NmorphDomElement, NmorphPlacement } from '@/types/common';
import { getModifiers } from '@/utils';
import { computed, ref } from 'vue';

interface ForceCoordinate {
  x?: string;
  y?: string;
}

interface IProps {
  disabled?: boolean;
  text?: string;
  position?: NmorphPlacement;
  forceShow?: boolean;
  forceCoordinate?: ForceCoordinate | null;
  blockPosition?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  disabled: false,
  text: '',
  position: 'top',
  forceShow: false,
  forceCoordinate: null,
  blockPosition: false,
});

const showTooltip = ref(props.forceShow);
const tooltipDOMRef = ref<NmorphDomElement>(null);

const { placement, adjustPlacement } = usePlacement({
  initialPlacement: props.position,
  targetDomElement: tooltipDOMRef,
  blockPosition: props.blockPosition,
});

const modifiers = computed(() =>
  getModifiers({
    'nmorph-tooltip': [placement.value, `${props.disabled && 'disabled'}`],
  })
);

const handleMouseEnter = () => {
  showTooltip.value = true;
  adjustPlacement();
};

const handleMouseLeave = () => {
  if (props.forceShow) return;
  showTooltip.value = false;
};

const width = computed(() => (props.forceCoordinate ? '100%' : 'auto'));
</script>

<template>
  <div :class="modifiers">
    <div
      ref="tooltipDOMRef"
      class="nmorph-tooltip__content"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <slot name="default" />
      <transition-group v-if="props.forceCoordinate" name="opacity" tag="div">
        <div
          v-if="showTooltip && props.text && !props.disabled"
          class="nmorph-tooltip__info-content"
          :style="{ left: forceCoordinate?.x, bottom: forceCoordinate?.y }"
        >
          <div class="nmorph-tooltip__shadow-content">
            <div class="nmorph-tooltip__triangle" />
            <span>{{ text }}</span>
          </div>
        </div>
      </transition-group>
      <transition-group v-else name="opacity" tag="div">
        <div v-if="showTooltip && !props.disabled" class="nmorph-tooltip__info-content">
          <div class="nmorph-tooltip__shadow-content">
            <div class="nmorph-tooltip__triangle" />
            <span v-if="props.text">{{ text }}</span>
            <slot v-else name="content" />
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-tooltip {
  --max-width: 120px;

  display: inline-block;
  width: v-bind(width);

  .nmorph-tooltip__content {
    position: relative;
  }

  .nmorph-tooltip__info-content {
    position: absolute;
    max-width: var(--max-width);
    padding: var(--indentation-03);
    border-radius: var(--default-border-radius);

    @include nmorph-dark-shadow;
  }

  span {
    white-space: nowrap;
  }

  .nmorph-tooltip__triangle {
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    content: '';
  }
}

.nmorph-tooltip--top {
  .nmorph-tooltip__info-content {
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
  }

  .nmorph-tooltip__triangle {
    top: 100%;
    left: 50%;
    border-color: var(--main-bg) transparent transparent transparent;
    border-width: 8px 8px 0;
    transform: translateX(-50%);
  }
}

.nmorph-tooltip--right {
  .nmorph-tooltip__info-content {
    top: 50%;
    left: calc(100% + 12px);
    transform: translateY(-50%);
  }

  .nmorph-tooltip__triangle {
    top: 50%;
    right: 100%;
    border-color: transparent var(--main-bg) transparent transparent;
    border-width: 8px 8px 8px 0;
    transform: translateY(-50%);
  }
}

.nmorph-tooltip--bottom {
  .nmorph-tooltip__info-content {
    top: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);
  }

  .nmorph-tooltip__triangle {
    bottom: 100%;
    left: 50%;
    border-color: transparent transparent var(--main-bg) transparent;
    border-width: 0 8px 8px;
    transform: translateX(-50%);
  }
}

.nmorph-tooltip--left {
  .nmorph-tooltip__info-content {
    top: 50%;
    right: calc(100% + 12px);
    transform: translateY(-50%);
  }

  .nmorph-tooltip__triangle {
    top: 50%;
    left: 100%;
    border-color: transparent transparent transparent var(--main-bg);
    border-width: 8px 0 8px 8px;
    transform: translateY(-50%);
  }
}
</style>
