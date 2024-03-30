<script setup lang="ts">
import { NmorphComponentHeight } from '@/types/common.enums';
import { getModifiers } from '@/utils';
import { Ref, computed } from 'vue';

interface IProps {
  height?: keyof typeof NmorphComponentHeight;
  errors?: string[] | Ref<string[]>;
  staticHeight?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  height: 'default',
  errors: () => [],
  staticHeight: false,
});

const reversedErrors = computed(() => {
  const arr = Array.isArray(props.errors) ? props.errors : props.errors.value;
  return arr.reverse();
});

const modifiers = computed(() =>
  getModifiers({
    'nmorph-error-box': [
      props.height,
      `${props.staticHeight && 'static-height'}`,
      `${reversedErrors.value.length === 0 && 'empty'}`,
    ],
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
  --height: 24px;

  margin-top: var(--indentation-02);
  height: var(--height);
  overflow: hidden;
  display: block;

  .nmorph-error-box__error {
    text-align: left;
    margin: var(--indentation-00);
    margin-left: var(--default-indentation-input);
    color: var(--error-color-00);
  }
}

.nmorph-error-box--empty {
  &:not(.nmorph-error-box--static-height) {
    display: none;
  }
}

.nmorph-error-box--thin {
  --height: 14px;
  .nmorph-error-box__error {
    @include body-3;
  }
}
</style>
