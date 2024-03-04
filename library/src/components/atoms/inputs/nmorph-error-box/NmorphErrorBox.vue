<script setup lang="ts">
import { computed } from 'vue';

interface IProps {
  errors: string[];
}

const props = withDefaults(defineProps<IProps>(), {});
const reversedErrors = computed(() => [...props.errors].reverse());
</script>

<template>
  <div class="nmorph-error-box">
    <transition-group name="error-animation" tag="div">
      <p v-for="error in reversedErrors" :key="error" class="nmorph-error-box__error">{{ error }}</p>
    </transition-group>
  </div>
</template>

<style lang="scss">
.nmorph-error-box {
  margin-top: 4px;
  --height: 24px;
  height: var(--height);
  overflow: hidden;
}

.nmorph-error-box__error {
  @include body-1(var(--error-color-01));
  text-align: left;
  margin: 0;
  margin-left: 8px;
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
