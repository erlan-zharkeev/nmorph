<script setup lang="ts">
import { INmorphCommonInputProps, NmorphComponentHeight } from '@/types/common';
import { useModifiers } from '@/utils';
import { computed } from 'vue';
import { NmorphIcon, NmorphButtonStyle, NmorphButtonType, NmorphIconSize } from '@/components';

interface INmorphProps extends INmorphCommonInputProps {
  type?: keyof typeof NmorphButtonType;
  text?: string | number;
  loading?: boolean;
  styleType?: keyof typeof NmorphButtonStyle;
  bgTransparentOnHover?: boolean;
  ripple?: boolean;
}

const props = withDefaults(defineProps<INmorphProps>(), {
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
  useModifiers({
    nmorph: [NmorphComponentHeight[props.height], `${props.fill && 'fill'}`],
    'nmorph-button': [
      props.styleType,
      `${props.disabled && 'disabled'}`,
      `${props.bgTransparentOnHover && 'bg-transparent-on-hover'}`,
      `${props.ripple && 'ripple'}`,
    ],
  })
);

interface INmorphEmit {
  (e: 'click'): void;
}

const emit = defineEmits<INmorphEmit>();

const iconSizeMap = {
  thin: 'small',
  default: 'medium',
  thick: 'large',
};

const loadingButtonSize = computed(() => iconSizeMap[props.height] as NmorphIconSize);
</script>

<template>
  <div :class="modifiers">
    <button
      class="nmorph-button__content"
      :disabled="props.disabled"
      :loading="props.loading"
      :type="props.type"
      @click="emit('click')"
    >
      <slot />
      <span v-if="!props.loading && props.text !== ''">{{ props.text }}</span>
      <NmorphIcon v-if="props.loading" name="loader" :size="loadingButtonSize" />
      <slot name="append" />
    </button>
  </div>
</template>

<style lang="scss">
.nmorph-button {
  display: inline-block;
  width: auto;

  .nmorph-button__content {
    line-height: 0;
    width: 100%;
    height: var(--height);
    padding: var(--indentation-00) var(--indentation-04);
    border: none;
    border-radius: var(--default-border-radius);
    cursor: pointer;
    transition:
      var(--transition-02) ease-in-out background,
      var(--transition-02) ease-in-out color,
      var(--transition-02) ease-in-out box-shadow;

    @include flex-full-center;
    @include nmorph-outset;
  }

  span {
    margin-top: 1px;
  }

  .nmorph-button__content:disabled {
    pointer-events: none;
  }

  .nmorph-button__content[loading='true'] {
    cursor: default;
  }

  .nmorph-button__content:not(:disabled, [loading='true']):hover {
    color: var(--text-color-00);
    background: var(--accent-color-00);
    box-shadow: none;
  }

  .nmorph-button__content:not(:disabled, [loading='true']):hover .nmorph-icon {
    --color: var(--text-color-00);
  }

  .nmorph-button__content:not(:disabled, [loading='true']):hover span {
    color: var(--text-color-00);
  }
}

.nmorph-button--transparent {
  padding: var(--indentation-00);

  .nmorph-button__content {
    background: transparent;
    box-shadow: none;
  }
}

.nmorph-button--ripple {
  .nmorph-button__content {
    position: relative;
    overflow: hidden;
  }

  .nmorph-button__content::after {
    background-image: radial-gradient(circle, var(--main-bg-color) 10%, transparent 10.01%);
    background-repeat: no-repeat;
    background-position: 50%;
    transform: scale(10, 10);
    opacity: 0;
    transition:
      transform 0.3s,
      opacity 1s;
    content: '';

    @include wh100;
    @include absolute-zero;
  }

  .nmorph-button__content:active::after {
    transform: scale(0, 0);
    opacity: 0.3;
    transition: 0s;
  }
}

.nmorph-button.nmorph--thin-component {
  @include body-3;
}

.nmorph-button--bg-transparent-on-hover {
  .nmorph-button__content:not(:disabled, [loading='true']):hover {
    background: inherit;
    box-shadow: none;

    .nmorph-icon {
      --color: var(--text-color-01);
    }
  }
}

.nmorph-button--disabled {
  @include disabled;
}
</style>
