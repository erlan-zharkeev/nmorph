<script setup lang="ts">
import { ControlComponentHeight } from '@/types/common.enums';
import { createModifiers } from '@/utils';
import { Ref, computed } from 'vue';

interface IProps {
  height?: keyof typeof ControlComponentHeight;
  errors: string[] | Ref<string[]>;
}

const props = withDefaults(defineProps<IProps>(), {
  height: 'thick',
  errors: () => [],
});

const reversedErrors = computed(() => {
  const arr = Array.isArray(props.errors) ? props.errors : props.errors.value;
  return arr.reverse();
});

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

  margin-top: var(--indentation-02);
  height: var(--height);
  overflow: hidden;
  @include body-1(var(--error-color-00));

  .nmorph-error-box__error {
    text-align: left;
    margin: 0;
    margin-left: var(--default-indentation-input);
  }
}

.nmorph-error-box--thin {
  --height: 14px;
  .nmorph-error-box__error {
    @include caption-2(var(--error-color-00));
  }
}
</style>
