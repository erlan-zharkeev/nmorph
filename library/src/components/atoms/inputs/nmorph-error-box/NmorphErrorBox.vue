<script setup lang="ts">
import { computed } from 'vue';
import { InputHeight } from '../inputs.enums';
import { createModifiers } from './../../../../utils';

interface IProps {
  errors: string[];
  height?: keyof typeof InputHeight;
}

const props = withDefaults(defineProps<IProps>(), {
  height: InputHeight.default,
});
const reversedErrors = computed(() => [...props.errors].reverse());

const modifiers = computed(() => createModifiers('nmorph-error-box', [props.height]));
</script>

<template>
  <div :class="modifiers">
    <transition-group name="error-animation" tag="div">
      <p v-for="error in reversedErrors" :key="error" class="nmorph-error-box__error">{{ error }}</p>
    </transition-group>
  </div>
</template>

<style lang="scss">
.nmorph-error-box {
  margin-top: $base-shadow-width;
  --height: $small-input-height;
  height: var(--height);
  overflow: hidden;
}

.nmorph-error-box--small {
  --height: 14px;
}
.nmorph-error-box--small .nmorph-error-box__error {
  @include caption-2(var(--error-color-01));
}

.nmorph-error-box__error {
  @include body-1(var(--error-color-01));
  text-align: left;
  margin: 0;
  margin-left: 12px;
}

.error-animation-enter-active,
.error-animation-leave-active {
  transition: opacity 0.5s ease;
}
.error-animation-enter,
.error-animation-leave-to {
  opacity: 0;
}
</style>
