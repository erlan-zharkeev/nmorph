<script setup lang="ts">
import { INmorphCommonInputProps, NmorphComponentHeight, NmorphDomElementType, NmorphIconList } from '@/types';
import { useModifiers } from '@/utils';
import { computed, ref } from 'vue';
import { NmorphIcon, NmorphButtonStyle, NmorphButtonType, NmorphIconSize, NmorphButtonShape } from '@/components';

interface INmorphProps extends INmorphCommonInputProps {
  styleType?: keyof typeof NmorphButtonStyle;
  loading?: boolean;
  ripple?: boolean;
  type?: keyof typeof NmorphButtonType;
  text?: string | number;
  accentBgOnHover?: boolean;
  shape?: keyof typeof NmorphButtonShape;
  icon?: keyof typeof NmorphIconList;
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
  icon: undefined,
});

const modifiers = computed(() =>
  useModifiers({
    nmorph: [NmorphComponentHeight[props.height], `${props.fill && 'fill'}`],
    'nmorph-button': [
      props.styleType,
      props.shape,
      `${props.disabled && 'disabled'}`,
      `${props.accentBgOnHover && 'accent-bg-on-hover'}`,
      `${props.ripple && 'ripple'}`,
      `${props.icon && 'icon'}`,
    ],
  })
);

const buttonDOMElement = ref<NmorphDomElementType>(null);

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

defineExpose({ buttonDOMElement });
</script>

<template>
  <div :class="modifiers">
    <button
      ref="buttonDOMElement"
      class="nmorph-button__content"
      :disabled="props.disabled"
      :loading="props.loading"
      :type="props.type"
      @click="emit('click')"
    >
      <NmorphIcon v-if="props.icon" :name="props.icon" />
      <div v-else>
        <slot />
        <span v-if="!props.loading && props.text !== undefined">{{ props.text }}</span>
        <NmorphIcon v-if="props.loading" name="loader" :size="loadingButtonSize" />
        <slot name="append" />
      </div>
    </button>
  </div>
</template>

<style lang="scss">
.nmorph-button {
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

    @include flex-full-center;
    @include nmorph-outset;

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
}

.nmorph-button--ripple {
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

.nmorph-button--accent-bg-on-hover {
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

.nmorph-button--disabled {
  @include disabled;
}

.nmorph-button--round {
  .nmorph-button__content {
    border-radius: var(--border-radius-200);
  }
}

.nmorph-button--circle {
  width: var(--height);

  .nmorph-button__content {
    border-radius: var(--border-radius-circular);
  }
}

.nmorph-button--transparent {
  padding: var(--indentation-00);

  .nmorph-button__content:not(:disabled, [loading='true']):hover {
    background: transparent;
    box-shadow: none;
  }

  .nmorph-button__content {
    background: transparent;
    box-shadow: none;
  }
}

@mixin square {
  width: var(--height);
  height: var(--height);
}

.nmorph-button--square {
  @include square;
}

.nmorph-button--icon {
  @include square;
}
</style>
