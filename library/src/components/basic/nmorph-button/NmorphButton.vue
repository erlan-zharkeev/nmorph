<script setup lang="ts">
import { INmorphCommonInputProps, NmorphComponentHeight, NmorphDomElementType } from '@/types';
import { useModifiers } from '@/utils';
import { computed, ref, useSlots } from 'vue';
import {
  NmorphIcon,
  NmorphButtonStyle,
  NmorphButtonType,
  NmorphIconSize,
  NmorphButtonShape,
  NmorphIconLoading,
} from '@/components';

interface INmorphProps extends INmorphCommonInputProps {
  styleType?: keyof typeof NmorphButtonStyle;
  color?: string;
  loading?: boolean;
  ripple?: boolean;
  type?: keyof typeof NmorphButtonType;
  text?: string | number;
  accentBgOnHover?: boolean;
  shape?: keyof typeof NmorphButtonShape;
  fill?: boolean;
  tabindex?: number;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  type: 'button',
  fill: false,
  text: undefined,
  color: undefined,
  disabled: false,
  loading: false,
  styleType: 'default',
  height: 'basic',
  accentBgOnHover: false,
  ripple: true,
  shape: 'default',
  tabindex: 0,
});

const slots = useSlots();
const hasIconSlot = computed(() => Boolean(slots['icon']));
const hasIconOnlySlot = computed(() => Boolean(slots['icon-only']));

const modifiers = computed(() =>
  useModifiers({
    nmorph: [NmorphComponentHeight[props.height], `${props.fill && 'fill'}`],
    'nmorph-button': [
      props.styleType,
      props.shape,
      `${props.disabled && 'disabled'}`,
      `${props.accentBgOnHover && 'accent-bg-on-hover'}`,
      `${props.ripple && 'ripple'}`,
      `${hasIconOnlySlot.value && 'icon-only'}`,
      `${props.color && 'custom-color'}`,
    ],
  })
);

const buttonDOMElement = ref<NmorphDomElementType>(null);

const iconSizeMap = {
  thin: 'small',
  basic: 'medium',
  thick: 'large',
};

const loadingButtonSize = computed(() => iconSizeMap[props.height] as NmorphIconSize);
const buttonColorStyles = computed(() => {
  if (!props.color) return {};
  return {
    '--nmorph-button-color': props.color,
    '--transparent-button-color': props.color,
    '--nmorph-button-hover-color': `color-mix(in srgb, ${props.color} 75%, var(--nmorph-white-color))`,
  };
});

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
    >
      <NmorphIcon v-if="props.loading" :size="loadingButtonSize">
        <NmorphIconLoading />
      </NmorphIcon>
      <NmorphIcon v-else-if="hasIconOnlySlot">
        <slot name="icon-only" />
      </NmorphIcon>
      <template v-else>
        <NmorphIcon v-if="hasIconSlot">
          <slot name="icon" />
        </NmorphIcon>
        <slot />
        <span v-if="props.text !== undefined">{{ props.text }}</span>
        <slot name="append" />
      </template>
    </button>
  </div>
</template>

<style lang="scss">
.nmorph-button {
  display: inline-block;
  width: auto;

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
    height: var(--height);
    padding: var(--indentation-00) var(--indentation-04);
    color: var(--nmorph-button-color, var(--nmorph-text-color));
    line-height: 0;
    background: var(--nmorph-main-color);
    border: none;
    border-radius: var(--default-border-radius);
    box-shadow:
      var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
      calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
        var(--nmorph-light-shade-color);
    cursor: pointer;

    span {
      color: var(--nmorph-button-color, var(--nmorph-text-color));

      --color: var(--nmorph-button-color, var(--nmorph-text-color));
    }
  }

  .nmorph-button__content > .nmorph-icon {
    flex-shrink: 0;

    --color: var(--nmorph-button-color, var(--nmorph-text-color));
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
      --color: var(--nmorph-white-color);
    }

    .nmorph-button__content:not(:disabled, [loading='true']):hover span {
      color: var(--nmorph-white-color);
    }
  }

  &.nmorph-button--round {
    .nmorph-button__content {
      border-radius: var(--border-radius-200);
    }
  }

  &.nmorph-button--circle {
    width: var(--height);

    .nmorph-button__content {
      border-radius: var(--border-radius-circular);
    }
  }

  &.nmorph-button--transparent {
    padding: var(--indentation-00);

    .nmorph-button__content:not(:disabled, [loading='true']):hover {
      color: var(--nmorph-accent-color);
      background: transparent;
      box-shadow: none;
    }

    &.nmorph-button--custom-color .nmorph-button__content:not(:disabled, [loading='true']):hover {
      color: var(--nmorph-button-hover-color);
    }

    .nmorph-button__content:not(:disabled, [loading='true']):hover span {
      color: var(--nmorph-accent-color);
    }

    &.nmorph-button--custom-color .nmorph-button__content:not(:disabled, [loading='true']):hover span {
      color: var(--nmorph-button-hover-color);

      --color: var(--nmorph-button-hover-color);
    }

    .nmorph-button__content:not(:disabled, [loading='true']):hover .nmorph-icon {
      --color: var(--nmorph-accent-color);
    }

    &.nmorph-button--custom-color .nmorph-button__content:not(:disabled, [loading='true']):hover .nmorph-icon {
      --color: var(--nmorph-button-hover-color);
    }

    .nmorph-button__content {
      color: var(--nmorph-button-color, var(--transparent-button-color, var(--nmorph-text-color)));
      background: transparent;
      box-shadow: none;
    }

    .nmorph-button__content span {
      color: var(--nmorph-button-color, var(--transparent-button-color, var(--nmorph-text-color)));

      --color: var(--nmorph-button-color, var(--transparent-button-color, var(--nmorph-text-color)));
    }

    .nmorph-button__content .nmorph-icon {
      --color: var(--nmorph-button-color, var(--transparent-button-color, var(--nmorph-text-color)));
    }
  }

  &.nmorph-button--square {
    width: var(--height);
    height: var(--height);
  }

  &.nmorph-button--icon-only {
    width: var(--height);
    height: var(--height);

    .nmorph-button__content {
      padding: 0;
    }
  }

  &.nmorph-button.nmorph--thin-component {
    font-weight: 400;
    font-size: var(--font-size-extra-small);
    line-height: var(--line-height-regular);
  }

  &.nmorph-button--disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}
</style>
