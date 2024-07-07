<script setup lang="ts">
import { NmorphComponentHeight } from '@/types';
import { useModifiers } from '@/utils';
import { Ref, computed } from 'vue';

interface INmorphProps {
  height?: keyof typeof NmorphComponentHeight;
  errors?: string[] | Ref<string[]>;
  staticHeight?: boolean;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  height: 'default',
  errors: () => [],
  staticHeight: false,
});

const reversedErrors = computed(() => {
  const arr = Array.isArray(props.errors) ? props.errors : props.errors.value;
  return arr.reverse();
});

const modifiers = computed(() =>
  useModifiers({
    nmorph: [NmorphComponentHeight[props.height]],
    'nmorph-error-box': [`${props.staticHeight && 'static-height'}`, `${reversedErrors.value.length === 0 && 'empty'}`],
  })
);
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
  display: block;
  margin-top: var(--indentation-02);
  overflow: hidden;

  .nmorph-error-box__error {
    margin: var(--indentation-00);
    margin-left: var(--default-indentation-input);
    color: var(--nmorph-error-text-color);
    text-align: left;
  }
}

.nmorph-error-box--empty {
  &:not(.nmorph-error-box--static-height) {
    display: none;
  }
}
</style>
