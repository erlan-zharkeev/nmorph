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
import { styled, css } from '@vue-styled-components/core'

interface INmorphProps extends INmorphCommonInputProps {
  styleType?: keyof typeof NmorphButtonStyle;
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

const modifiers = computed(() =>
  useModifiers({
    nmorph: [NmorphComponentHeight[props.height], `${props.fill && 'fill'}`],
    'nmorph-button': [
      props.styleType,
      props.shape,
      `${props.disabled && 'disabled'}`,
      `${props.accentBgOnHover && 'accent-bg-on-hover'}`,
      `${props.ripple && 'ripple'}`,
      `${slots['icon'] && 'icon'}`,
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

defineExpose({ buttonDOMElement });

const commonCSS = css`
  display: inline-block;
  width: auto;

  .nmorph-button__content {
    width: 100%;
    height: var(--height);
    padding: var(--indentation-00) var(--indentation-04);
    line-height: 0;
    border: none;
    border-radius: var(--default-border-radius);
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    span {
      --color: var(--nmorph-white-color);
    }
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
      ${nmorphOutset()}
    }
  }

  &.nmorph-button--square {
    width: var(--height);
    height: var(--height);
  }

  &.nmorph-button--icon {
    width: var(--height);
    height: var(--height);
  }

  &.nmorph-button.nmorph--thin-component {
    ${body3()}
  }

  &.nmorph-button--disabled {
    ${disabled()}
  }
`

const StyledComponent = styled.div`
  ${commonCSS}
`
</script>

<template>
  <StyledComponent :class="modifiers">
    <button ref="buttonDOMElement" class="nmorph-button__content" :disabled="props.disabled" :loading="props.loading"
      :type="props.type" :tabindex="props.tabindex">
      <NmorphIcon v-if="slots['icon']">
        <slot name="icon" />
      </NmorphIcon>
      <div v-else>
        <slot />
        <span v-if="!props.loading && props.text !== undefined">{{ props.text }}</span>
        <NmorphIcon v-if="props.loading" :size="loadingButtonSize">
          <NmorphIconLoading />
        </NmorphIcon>
        <slot name="append" />
      </div>
    </button>
  </StyledComponent>
</template>
