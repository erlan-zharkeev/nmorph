<script setup lang="ts">
import { CommonInputProps, NmorphComponentHeight } from '@/types/common.enums';
import { getModifiers } from '@/utils';
import { computed } from 'vue';
import { NmorphButtonType, NmorphButtonStyle } from './types';
import { NmorphIcon } from '@/components';
import { IconSize } from '../nmorph-icon/types';

interface IProps extends CommonInputProps {
  type?: keyof typeof NmorphButtonType;
  text?: string;
  loading?: boolean;
  styleType?: keyof typeof NmorphButtonStyle;
  bgTransparentOnHover?: boolean;
  ripple?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  type: 'button',
  fill: false,
  text: '',
  disabled: false,
  loading: false,
  styleType: 'default',
  height: 'default',
  bgTransparentOnHover: false,
  ripple: true,
});

const modifiers = computed(() =>
  getModifiers({
    nmorph: [NmorphComponentHeight[props.height], `${props.fill && 'fill'}`],
    'nmorph-button': [
      props.styleType,
      `${props.disabled && 'disabled'}`,
      `${props.bgTransparentOnHover && 'bg-transparent-on-hover'}`,
      `${props.ripple && 'ripple'}`,
    ],
  })
);

interface IEmit {
  (e: 'click'): void;
}

const emit = defineEmits<IEmit>();

const iconSizeMap = {
  thin: 'small',
  default: 'medium',
  thick: 'large',
};

const loadingButtonSize = computed(() => iconSizeMap[props.height] as IconSize);
</script>

<template>
  <div :class="modifiers">
    <button
      class="nmorph-button__content"
      :disabled="props.disabled"
      :loading="props.loading"
      :type="props.type"
      @click.stop="emit('click')"
    >
      <slot name="default" />
      <span v-if="!props.loading && props.text">{{ props.text }}</span>
      <NmorphIcon v-if="props.loading" name="loader" :size="loadingButtonSize" />
      <slot name="append" />
    </button>
  </div>
</template>

<style lang="scss">
.nmorph-button {
  width: auto;
  display: inline-block;

  .nmorph-button__content {
    width: 100%;
    height: var(--height);
    border: none;
    cursor: pointer;
    border-radius: var(--default-border-radius);
    padding: var(--indentation-00) var(--indentation-04);
    transition:
      var(--transition-02) ease-in-out background,
      var(--transition-02) ease-in-out color,
      var(--transition-02) ease-in-out box-shadow;
    @include flex-full-center;
    @include nmorph-outset;
  }

  .nmorph-button__content:disabled {
    pointer-events: none;
  }

  .nmorph-button__content[loading='true'] {
    cursor: default;
  }

  .nmorph-button__content:not(:disabled):not([loading='true']):hover {
    background: var(--accent-color-01);
    color: var(--text-00);
    box-shadow: none;
    span {
      color: var(--text-00);
    }
    .nmorph-icon {
      --color: var(--text-00);
    }
  }

  span {
    margin-top: 2px;
  }
}

.nmorph-button.nmorph--thin-component {
  @include body-3;
}

.nmorph-button--transparent {
  padding: var(--indentation-00);
  .nmorph-button__content {
    box-shadow: none;
    background: transparent;
  }
}

.nmorph-button--bg-transparent-on-hover {
  .nmorph-button__content:not(:disabled):not([loading='true']):hover {
    background: inherit;
    box-shadow: none;
    .nmorph-icon {
      --color: var(--text-01);
    }
  }
}

.nmorph-button--disabled {
  @include disabled;
}

.nmorph-button--ripple {
  .nmorph-button__content {
    position: relative;
    overflow: hidden;
  }

  .nmorph-button__content::after {
    content: '';
    @include wh100;
    @include absolute-zero;
    background-image: radial-gradient(circle, var(--main-bg) 10%, transparent 10.01%);
    background-repeat: no-repeat;
    background-position: 50%;
    transform: scale(10, 10);
    opacity: 0;
    transition:
      transform 0.3s,
      opacity 1s;
  }

  .nmorph-button__content:active::after {
    transform: scale(0, 0);
    opacity: 0.3;
    transition: 0s;
  }
}
</style>
