<script setup lang="ts">
import NmorphLoader from './../nmorph-loader/NmorphLoader.vue';
import { createModifiers } from './../../../utils';
import { NmorphButtonType, NmorphButtonStyle } from './NmorphButton.enums';
import { computed } from 'vue';

interface IProps {
  type?: keyof typeof NmorphButtonType;
  width?: string;
  fill?: boolean;
  text?: string;
  disabled?: boolean;
  loading?: boolean;
  styleType?: keyof typeof NmorphButtonStyle;
}

const props = withDefaults(defineProps<IProps>(), {
  type: NmorphButtonType.button,
  width: '',
  fill: false,
  text: '',
  disabled: false,
  loading: false,
  styleType: NmorphButtonStyle.default,
});

const width = computed(() => (props.width ? props.width : props.fill ? '100%' : 'auto'));
const modifiers = computed(() => createModifiers('nmorph-button-wrapper', [props.styleType]));

export interface IEmit {
  (e: 'button-click'): void;
}

const emit = defineEmits<IEmit>();
</script>

<template>
  <div :class="modifiers">
    <button
      class="nmorph-button"
      :disabled="props.disabled"
      :loading="props.loading"
      :type="props.type"
      @click="emit('button-click')"
    >
      <slot name="default" />
      <div v-if="!props.loading && props.text" class="nmorph-button__main-content">
        <span>{{ props.text }}</span>
      </div>
      <NmorphLoader v-if="props.loading" />
      <slot name="append" />
    </button>
  </div>
</template>

<style lang="scss">
$hover-transition:
  var(--transition-03) ease-in-out background,
  var(--transition-03) ease-in-out color,
  var(--transition-04) ease-in-out box-shadow;

.nmorph-button-wrapper {
  padding: $nmorph-wrapper-padding;
  width: v-bind(width);
  display: inline-block;
}

.nmorph-button-wrapper--transparent {
  padding: 0;
}

.nmorph-button-wrapper--transparent .nmorph-button {
  box-shadow: none;
  background: transparent;
}

.nmorph-button {
  --height: 32px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: var(--height);
  border: none;
  cursor: pointer;
  border-radius: var(--border-radius-40);
  @include body-1(var(--text-01));
  @include nmorph-outset;
  padding: 0 14px;
  transition: $hover-transition;
}

.nmorph-button:not(:disabled):not([loading='true']):hover {
  background: var(--accent-color-01);
  color: var(--text-00);
  transition: $hover-transition;
  box-shadow: none;
  svg {
    fill: var(--text-00);
  }
}

.nmorph-button:disabled {
  @include disabled;
}

.nmorph-button[loading='true'] {
  cursor: default;
}
</style>
