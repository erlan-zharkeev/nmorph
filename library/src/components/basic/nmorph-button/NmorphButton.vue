<script setup lang="ts">
import { NmorphComponentThickness, NmorphDomElementType } from '@/types';
import { useModifiers } from '@/utils';
import { computed, ref, useSlots } from 'vue';
import { NmorphIcon, NmorphIconSize, NmorphIconLoader } from '@/components';
import type { INmorphButtonEmit, INmorphButtonProps } from './types';

const props = withDefaults(defineProps<INmorphButtonProps>(), {
  type: 'button',
  fill: false,
  text: undefined,
  color: undefined,
  disabled: false,
  loading: false,
  design: 'nmorph',
  thickness: 'basic',
  accentBgOnHover: false,
  ripple: true,
  shape: 'default',
  tabindex: 0,
  toggle: false,
  modelValue: undefined,
  active: false,
  danger: false,
});

const emit = defineEmits<INmorphButtonEmit>();
const slots = useSlots();
const hasIconSlot = computed(() => Boolean(slots['icon']));
const hasIconOnlySlot = computed(() => Boolean(slots['icon-only']));
const active = computed(() => props.active || Boolean(props.modelValue));

const modifiers = computed(() =>
  useModifiers({
    nmorph: [NmorphComponentThickness[props.thickness], props.fill && 'fill'],
    'nmorph-button': [
      props.design,
      props.shape,
      props.disabled && 'disabled',
      props.accentBgOnHover && 'accent-bg-on-hover',
      props.ripple && 'ripple',
      hasIconOnlySlot.value && 'icon-only',
      props.color && 'custom-color',
      active.value && 'active',
      props.danger && 'danger',
    ],
  })
);

const buttonDOMElement = ref<NmorphDomElementType>(null);

const iconSizeMap = {
  thin: 'small',
  basic: 'medium',
  thick: 'large',
};

const loadingButtonSize = computed(() => iconSizeMap[props.thickness] as NmorphIconSize);
const buttonColorStyles = computed(() => {
  if (!props.color) return {};
  return {
    '--nmorph-private-button-color': props.color,
    '--nmorph-private-button-plain-color': props.color,
    '--nmorph-private-button-hover-color': `color-mix(in srgb, ${props.color} 75%, var(--nmorph-white-color))`,
  };
});

const toggleClickHandler = () => {
  if (!props.toggle || props.disabled || props.loading) return;
  emit('update:model-value', !Boolean(props.modelValue));
};

defineExpose({ buttonDOMElement });
</script>

<template>
  <div :class="modifiers" :style="buttonColorStyles">
    <button
      ref="buttonDOMElement"
      class="nmorph-button__content"
      :disabled="props.disabled"
      :loading="props.loading"
      :type="props.type"
      :tabindex="props.tabindex"
      :aria-pressed="props.toggle ? active : undefined"
      @click="toggleClickHandler"
    >
      <NmorphIcon v-if="props.loading" :size="loadingButtonSize">
        <NmorphIconLoader />
      </NmorphIcon>
      <NmorphIcon v-else-if="hasIconOnlySlot">
        <slot name="icon-only" />
      </NmorphIcon>
      <template v-else>
        <NmorphIcon v-if="hasIconSlot">
          <slot name="icon" />
        </NmorphIcon>
        <slot />
        <span v-if="props.text !== undefined" class="nmorph-button__label">{{ props.text }}</span>
        <slot name="append" />
      </template>
    </button>
  </div>
</template>

<style lang="scss">
.nmorph-button {
  display: inline-block;
  width: auto;
  height: auto;
  min-height: var(--nmorph-private-control-height);

  &.nmorph--basic-component,
  &.nmorph--thin-component,
  &.nmorph--thick-component {
    height: auto;
  }

  &.nmorph--fill {
    width: 100%;
  }

  .nmorph-button__content {
    display: flex;
    gap: var(--indentation-02);
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    height: auto;
    min-height: var(--nmorph-private-control-height);
    padding: var(--indentation-00) var(--indentation-04);
    color: var(--nmorph-private-button-color, var(--nmorph-text-color));
    line-height: var(--nmorph-private-control-line-height, var(--line-height-regular));
    background: var(--nmorph-main-color);
    border: none;
    border-radius: var(--default-border-radius);
    box-shadow:
      var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
      calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
        var(--nmorph-light-shade-color);
    cursor: pointer;

    span {
      color: var(--nmorph-private-button-color, var(--nmorph-text-color));

      --nmorph-private-icon-color: var(--nmorph-private-button-color, var(--nmorph-text-color));
    }
  }

  .nmorph-button__label {
    display: inline-block;
    min-width: 0;
    white-space: normal;
    text-align: center;
    overflow-wrap: anywhere;
    transform: translateY(var(--nmorph-private-control-text-offset-y));
  }

  .nmorph-button__content > .nmorph-icon {
    flex-shrink: 0;

    --nmorph-private-icon-color: var(--nmorph-private-button-color, var(--nmorph-text-color));
  }

  .nmorph-button__content:disabled {
    pointer-events: none;
  }

  .nmorph-button__content[loading='true'] {
    cursor: default;
  }

  &.nmorph-button--ripple {
    .nmorph-button__content {
      position: relative;
      overflow: hidden;
    }

    .nmorph-button__content::after {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: radial-gradient(circle, var(--nmorph-main-color) 10%, transparent 10.01%);
      background-repeat: no-repeat;
      background-position: 50%;
      transform: scale(10, 10);
      opacity: 0;
      transition:
        transform 0.3s,
        opacity 1s;
      content: '';
    }

    .nmorph-button__content:active::after {
      transform: scale(0, 0);
      opacity: 0.3;
      transition: 0s;
    }
  }

  &.nmorph-button--accent-bg-on-hover {
    .nmorph-button__content:not(:disabled, [loading='true']):hover {
      color: var(--nmorph-white-color);
      background: var(--nmorph-accent-color);
      box-shadow: none;
    }

    .nmorph-button__content:not(:disabled, [loading='true']):hover .nmorph-icon {
      --nmorph-private-icon-color: var(--nmorph-white-color);
    }

    .nmorph-button__content:not(:disabled, [loading='true']):hover span {
      color: var(--nmorph-white-color);
    }
  }

  &.nmorph-button--active {
    .nmorph-button__content {
      color: var(--nmorph-focus-text-color);
      background: var(--nmorph-accent-color);
      box-shadow: var(--nmorph-shadow-inset);
    }

    .nmorph-button__content span,
    .nmorph-button__content .nmorph-icon {
      color: var(--nmorph-focus-text-color);

      --nmorph-private-icon-color: var(--nmorph-focus-text-color);
    }
  }

  &.nmorph-button--danger {
    .nmorph-button__content {
      color: var(--nmorph-error-text-color);

      --nmorph-private-button-color: var(--nmorph-error-text-color);
    }
  }

  &.nmorph-button--round {
    .nmorph-button__content {
      border-radius: var(--border-radius-200);
    }
  }

  &.nmorph-button--circle {
    width: var(--nmorph-private-control-height);
    height: var(--nmorph-private-control-height);
    min-height: var(--nmorph-private-control-height);

    .nmorph-button__content {
      height: var(--nmorph-private-control-height);
      min-height: var(--nmorph-private-control-height);
      border-radius: var(--border-radius-circular);
    }
  }

  &.nmorph-button--plain {
    padding: var(--indentation-00);

    .nmorph-button__content:not(:disabled, [loading='true']):hover {
      color: var(--nmorph-accent-color);
      background: transparent;
      border-color: var(--nmorph-accent-color);
      box-shadow: none;
    }

    &.nmorph-button--custom-color .nmorph-button__content:not(:disabled, [loading='true']):hover {
      color: var(--nmorph-private-button-hover-color);
      border-color: var(--nmorph-private-button-hover-color);
    }

    .nmorph-button__content:not(:disabled, [loading='true']):hover span {
      color: var(--nmorph-accent-color);
    }

    &.nmorph-button--custom-color .nmorph-button__content:not(:disabled, [loading='true']):hover span {
      color: var(--nmorph-private-button-hover-color);

      --nmorph-private-icon-color: var(--nmorph-private-button-hover-color);
    }

    .nmorph-button__content:not(:disabled, [loading='true']):hover .nmorph-icon {
      --nmorph-private-icon-color: var(--nmorph-accent-color);
    }

    &.nmorph-button--custom-color .nmorph-button__content:not(:disabled, [loading='true']):hover .nmorph-icon {
      --nmorph-private-icon-color: var(--nmorph-private-button-hover-color);
    }

    .nmorph-button__content {
      color: var(--nmorph-private-button-color, var(--nmorph-private-button-plain-color, var(--nmorph-text-color)));
      background: transparent;
      border: var(--nmorph-plain-border);
      border-color: var(
        --nmorph-private-button-color,
        var(--nmorph-private-button-plain-color, var(--nmorph-text-color))
      );
      box-shadow: none;
    }

    .nmorph-button__content span {
      color: var(--nmorph-private-button-color, var(--nmorph-private-button-plain-color, var(--nmorph-text-color)));

      --nmorph-private-icon-color: var(
        --nmorph-private-button-color,
        var(--nmorph-private-button-plain-color, var(--nmorph-text-color))
      );
    }

    .nmorph-button__content .nmorph-icon {
      --nmorph-private-icon-color: var(
        --nmorph-private-button-color,
        var(--nmorph-private-button-plain-color, var(--nmorph-text-color))
      );
    }
  }

  &.nmorph-button--square {
    width: var(--nmorph-private-control-height);
    height: var(--nmorph-private-control-height);
    min-height: var(--nmorph-private-control-height);

    .nmorph-button__content {
      height: var(--nmorph-private-control-height);
      min-height: var(--nmorph-private-control-height);
    }
  }

  &.nmorph-button--icon-only {
    width: var(--nmorph-private-control-height);
    height: var(--nmorph-private-control-height);
    min-height: var(--nmorph-private-control-height);

    .nmorph-button__content {
      height: var(--nmorph-private-control-height);
      min-height: var(--nmorph-private-control-height);
      padding: 0;
      line-height: 0;
    }
  }

  &.nmorph-button--disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}
</style>
