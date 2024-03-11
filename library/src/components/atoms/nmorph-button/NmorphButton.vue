<script setup lang="ts">
import NmorphLoader from './../nmorph-loader/NmorphLoader.vue';
import { createModifiers } from './../../../utils';
import { NmorphButtonType, NmorphButtonStyle } from './NmorphButton.enums';
import { computed } from 'vue';
import { ControlComponentHeight } from './../../common-component.enums';

interface IProps {
  type?: keyof typeof NmorphButtonType;
  width?: string;
  fill?: boolean;
  text?: string;
  disabled?: boolean;
  loading?: boolean;
  styleType?: keyof typeof NmorphButtonStyle;
  height?: keyof typeof ControlComponentHeight;
  bgTransparentOnHover?: boolean;
  ripple?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  type: NmorphButtonType.button,
  width: '',
  fill: false,
  text: '',
  disabled: false,
  loading: false,
  styleType: NmorphButtonStyle.default,
  height: ControlComponentHeight['thick'],
  bgTransparentOnHover: false,
  ripple: true,
});

const width = computed(() => (props.width ? props.width : props.fill ? '100%' : 'auto'));
const modifiers = computed(() =>
  createModifiers('nmorph-button', [
    props.styleType,
    props.height,
    props.bgTransparentOnHover ? 'bg-transparent-on-hover' : '',
    props.ripple ? 'ripple' : '',
  ])
);

export interface IEmit {
  (e: 'click'): void;
}

const loaderScale = computed(() => (props.height === ControlComponentHeight['thick'] ? 1 : 0.7));

const emit = defineEmits<IEmit>();
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
      <slot name="default" />
      <span v-if="!props.loading && props.text">{{ props.text }}</span>
      <NmorphLoader v-if="props.loading" :scale="loaderScale" />
      <slot name="append" />
    </button>
  </div>
</template>

<style lang="scss">
.nmorph-button {
  $hover-transition:
    var(--transition-02) ease-in-out background,
    var(--transition-02) ease-in-out color,
    var(--transition-02) ease-in-out box-shadow;
  --height: #{$thick-input-height};

  width: v-bind(width);
  display: inline-block;

  .nmorph-button__content {
    width: 100%;
    height: var(--height);
    border: none;
    cursor: pointer;
    border-radius: var(--default-border-radius);
    padding: 0 14px;
    transition: $hover-transition;
    @include flex-full-center;
    @include body-1(var(--text-01));
    @include nmorph-outset;
  }

  .nmorph-button__content:disabled {
    @include disabled;
  }

  .nmorph-button__content[loading='true'] {
    cursor: default;
  }

  .nmorph-button__content:not(:disabled):not([loading='true']):hover {
    background: var(--accent-color-01);
    color: var(--text-00);
    transition: $hover-transition;
    box-shadow: none;
    .nmorph-icon {
      --color: var(--text-00);
    }
  }
}

.nmorph-button--transparent {
  padding: 0;
  .nmorph-button__content {
    box-shadow: none;
    background: transparent;
  }
}

.nmorph-button--thin {
  --height: #{$thin-input-height};
  .nmorph-button__content {
    @include caption-1(var(--text-01));
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
