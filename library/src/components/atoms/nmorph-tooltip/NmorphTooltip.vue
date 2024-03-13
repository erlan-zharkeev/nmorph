<script setup lang="ts">
import { createModifiers } from './../../../utils';
import { computed, ref, nextTick } from 'vue';

enum TooltipPosition {
  left = 'left',
  right = 'right',
  top = 'top',
  bottom = 'bottom',
}

type Placement = keyof typeof TooltipPosition;

interface IProps {
  disabled?: boolean;
  text?: string;
  position?: Placement;
}

const props = withDefaults(defineProps<IProps>(), {
  disabled: false,
  text: '',
  position: 'top',
});

const show = ref(false);
const placement = ref<Placement>(props.position);

const modifiers = computed(() =>
  createModifiers('nmorph-tooltip', [props.disabled ? 'disabled' : '', placement.value])
);

const tooltipDOMRef = ref<HTMLElement | null>(null);

const adjustPlacement = () => {
  nextTick(() => {
    if (tooltipDOMRef.value) {
      const tooltip = tooltipDOMRef.value.getBoundingClientRect();
      const { x, y, width, height } = tooltip;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      if (placement.value === 'right' && width < screenWidth - x) {
        placement.value = 'left';
      }
      if (placement.value === 'bottom' && height < screenHeight - y) {
        placement.value = 'top';
      }
      if (placement.value === 'left' && width < screenWidth + x) {
        placement.value = 'right';
      }
      if (placement.value === 'top' && height < screenHeight + y) {
        placement.value = 'bottom';
      }
    }
  });
};

const handleMouseEnter = () => {
  show.value = true;
  adjustPlacement();
};

const handleMouseLeave = () => {
  show.value = false;
};
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
      <transition-group name="opacity" tag="div">
        <div v-if="show" class="nmorph-tooltip__info-content">
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
  display: inline-block;
  --max-width: 120px;

  .nmorph-tooltip__content {
    position: relative;
  }

  .nmorph-tooltip__info-content {
    max-width: var(--max-width);
    position: absolute;
    padding: 8px;
    border-radius: var(--default-border-radius);
    @include nmorph-dark-shadow;
  }

  .nmorph-tooltip__shadow-content {
    @include body-1(var(--text-01));
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
    border-width: 8px 8px 0 8px;
    border-color: var(--main-bg) transparent transparent transparent;
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
    border-width: 8px 8px 8px 0;
    border-color: transparent var(--main-bg) transparent transparent;
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
    border-width: 0 8px 8px 8px;
    border-color: transparent transparent var(--main-bg) transparent;
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
    border-width: 8px 0 8px 8px;
    border-color: transparent transparent transparent var(--main-bg);
    transform: translateY(-50%);
  }
}
</style>
