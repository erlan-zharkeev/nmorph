<script setup lang="ts">
import { INmorphCommonInputProps, NmorphComponentHeight, NmorphDomElementType } from '@/types';
import { body3, disabled, nmorphOutset, useModifiers } from '@/utils';
import { computed, ref, useSlots } from 'vue';
import {
  NmorphIcon,
  NmorphButtonStyle,
  NmorphButtonType,
  NmorphIconSize,
  NmorphButtonShape,
  NmorphIconLoading,
} from '@/components';
import { styled, css } from '@vue-styled-components/core';

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
  height: 'default',
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
    ],
  })
);

const buttonDOMElement = ref<NmorphDomElementType>(null);

const iconSizeMap = {
  thin: 'small',
  default: 'medium',
  thick: 'large',
};

const loadingButtonSize = computed(() => iconSizeMap[props.height] as NmorphIconSize);
const transparentColorStyles = computed(() =>
  props.styleType === 'transparent' && props.color ? { '--transparent-button-color': props.color } : {}
);

defineExpose({ buttonDOMElement });

const commonCSS = css`
  display: inline-block;
  width: auto;

  &.nmorph--fill {
    width: 100%;
  }

  .nmorph-button__content {
    width: 100%;
    height: var(--height);
    padding: var(--indentation-00) var(--indentation-04);
    box-sizing: border-box;
    line-height: 0;
    border: none;
    border-radius: var(--default-border-radius);
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--indentation-02);
    ${nmorphOutset()}

    span {
      --color: var(--nmorph-white-color);
    }
  }

  .nmorph-button__content > .nmorph-icon {
    flex-shrink: 0;
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
      background-image: radial-gradient(circle, var(--nmorph-main-color) 10%, transparent 10.01%);
      background-repeat: no-repeat;
      background-position: 50%;
      transform: scale(10, 10);
      opacity: 0;
      transition:
        transform 0.3s,
        opacity 1s;
      content: '';

      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }

    .nmorph-button__content:active::after {
      transform: scale(0, 0);
      opacity: 0.3;
      transition: 0s;
    }
  }

  &.nmorph-button--accent-bg-on-hover {
    .nmorph-button__content:not(:disabled, [loading='true']):hover {
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
      background: transparent;
      box-shadow: none;
    }

    .nmorph-button__content {
      background: transparent;
      box-shadow: none;
      color: var(--transparent-button-color, var(--nmorph-text-color));
    }

    .nmorph-button__content .nmorph-icon {
      --color: var(--transparent-button-color, var(--nmorph-text-color));
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
    ${body3()}
  }

  &.nmorph-button--disabled {
    ${disabled()}
  }
`;

const StyledComponent = styled.div`
  ${commonCSS}
`;
</script>

<template>
  <StyledComponent :class="modifiers" :style="transparentColorStyles">
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
  </StyledComponent>
</template>
