<script setup lang="ts">
import { NmorphComponentThickness } from '@/types';
import { useModifiers } from '@/utils';
import { computed } from 'vue';
import type { INmorphErrorBoxProps } from './types';

const props = withDefaults(defineProps<INmorphErrorBoxProps>(), {
  thickness: 'basic',
  errors: () => [],
  staticHeight: false,
});

const currentError = computed(() => {
  const arr = Array.isArray(props.errors) ? props.errors : props.errors.value;
  return arr.length ? arr[arr.length - 1] : '';
});

const modifiers = computed(() =>
  useModifiers({
    nmorph: [NmorphComponentThickness[props.thickness]],
    'nmorph-error-box': [props.staticHeight && 'static-height', !currentError.value && 'empty'],
  })
);
</script>

<template>
  <div :class="modifiers">
    <transition name="list" mode="out-in">
      <p v-if="currentError" :key="currentError" class="nmorph-error-box__error">{{ currentError }}</p>
    </transition>
  </div>
</template>

<style lang="scss">
.nmorph-error-box {
  display: flex;
  align-items: center;
  min-width: 0;
  overflow: hidden;

  &.nmorph--basic-component,
  &.nmorph--thin-component,
  &.nmorph--thick-component {
    height: auto;
    min-height: var(--nmorph-private-control-height);
  }

  .nmorph-error-box__error {
    flex: 1 1 auto;
    min-width: 0;
    margin: var(--indentation-02) var(--indentation-00);
    margin-left: var(--default-indentation-input);
    color: var(--nmorph-error-text-color);
    line-height: var(--nmorph-typography-body-line-height);
    text-align: left;
    overflow-wrap: anywhere;
  }

  &.nmorph-error-box--empty {
    &:not(.nmorph-error-box--static-height) {
      display: none;
    }
  }
}
</style>
