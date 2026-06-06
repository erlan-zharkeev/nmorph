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
  return arr.length ? [arr[arr.length - 1]] : [];
});

const modifiers = computed(() =>
  useModifiers({
    nmorph: [NmorphComponentThickness[props.thickness]],
    'nmorph-error-box': [props.staticHeight && 'static-height', currentError.value.length === 0 && 'empty'],
  })
);
</script>

<template>
  <div :class="modifiers">
    <transition-group name="list" tag="div">
      <p v-for="error in currentError" :key="error" class="nmorph-error-box__error">{{ error }}</p>
    </transition-group>
  </div>
</template>

<style lang="scss">
.nmorph-error-box {
  display: flex;
  align-items: center;
  overflow: hidden;

  .nmorph-error-box__error {
    margin: var(--indentation-00);
    margin-left: var(--default-indentation-input);
    color: var(--nmorph-error-text-color);
    text-align: left;
  }

  &.nmorph-error-box--empty {
    &:not(.nmorph-error-box--static-height) {
      display: none;
    }
  }
}
</style>
