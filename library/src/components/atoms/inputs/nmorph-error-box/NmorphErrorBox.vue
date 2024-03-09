<script setup lang="ts">
import { computed } from 'vue';
import { createModifiers } from './../../../../utils';
import { ControlComponentHeight } from './../../../common-component.enums';

interface IProps {
  errors: string[];
  height?: keyof typeof ControlComponentHeight;
}

const props = withDefaults(defineProps<IProps>(), {
  height: ControlComponentHeight['default-height'],
});
const reversedErrors = computed(() => [...props.errors].reverse());

const modifiers = computed(() => createModifiers('nmorph-error-box', [props.height]));
</script>

<template>
  <div :class="modifiers">
    <transition-group name="list" tag="div">
      <p v-for="error in reversedErrors" :key="error" class="nmorph-error-box__error">{{ error }}</p>
    </transition-group>
  </div>
</template>

<style lang="scss">
.nmorph-error-box {
  --height: 24px;
  margin-top: $base-shadow-width;
  height: var(--height);
  overflow: hidden;
  @include body-1(var(--error-color-01));

  .nmorph-error-box__error {
    text-align: left;
    margin: 0;
    margin-left: 12px;
  }
}

.nmorph-error-box--small-height {
  --height: 14px;
  .nmorph-error-box__error {
    @include caption-2(var(--error-color-01));
  }
}
</style>
