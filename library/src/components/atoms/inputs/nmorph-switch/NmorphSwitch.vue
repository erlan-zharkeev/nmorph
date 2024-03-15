<script setup lang="ts">
import { CommonInputProps } from './../../../common-component.enums';
import { createModifiers } from './../../../../utils';
import { computed, ref } from 'vue';
import NmorphIcon from './../../nmorph-icon/NmorphIcon.vue';

interface IProps extends CommonInputProps {
  modelValue?: boolean;
  loading?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  modelValue: false,
  loading: true,
});

const modifiers = computed(() =>
  createModifiers('nmorph-switch', [
    props.disabled ? 'disabled' : '',
    props.modelValue ? 'on' : 'off',
    props.loading ? 'loading' : '',
  ])
);

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void;
}>();

const initialValue = ref(props.modelValue);

const changeHandler = () => {
  if (!props.disabled) return;
  initialValue.value = !initialValue.value;
  emit('update:modelValue', initialValue.value);
};
</script>

<template>
  <div :class="modifiers">
    <div class="nmorph-switch__content" @click="changeHandler">
      <input type="checkbox" :value="initialValue" :disabled="props.disabled" />
      <div class="nmorph-switch-thumb">
        <NmorphIcon v-if="props.loading" name="loader" width="16px" height="16px" />
        <slot v-else-if="props.modelValue" name="thumb-on" />
        <slot v-else name="thumb-off" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-switch {
  --height: 20px;
  --offset: 2px;
  --thumb-height: 16px;
  $transition: left ease-in-out var(--transition-02);
  $bg-transition: background ease-in-out var(--transition-02);
  $box-shadow-transition: box-shadow ease-in-out var(--transition-02);

  border-radius: var(--border-radius-circular);
  cursor: pointer;
  width: 40px;
  height: var(--height);
  overflow: hidden;
  @include body-1-strong(var(--text-01));

  .nmorph-switch__content {
    border-radius: var(--border-radius-circular);
    height: 100%;
    position: relative;
    transition: $bg-transition, $box-shadow-transition;
    @include nmorph-inset;
  }

  input {
    width: 100%;
    height: var(--height);
    opacity: 0;
    visibility: hidden;
  }

  .nmorph-switch-thumb {
    position: absolute;
    top: var(--offset);
    left: var(--offset);
    width: var(--thumb-height);
    height: var(--thumb-height);
    border-radius: var(--border-radius-circular);
    transition: $transition, $box-shadow-transition;
    @include flex-full-center;
    @include nmorph-outset;
  }
}

@mixin nmorph-switch-disabled {
  @include disabled;

  .nmorph-switch__input-content {
    pointer-events: none;
  }
}

.nmorph-switch--disabled {
  @include nmorph-switch-disabled;
}

.nmorph-switch--on {
  .nmorph-switch__content {
    background: var(--accent-color-01);
    box-shadow: none;
  }
  .nmorph-switch-thumb {
    left: calc(100% - 16px - 2px);
    box-shadow: none;
  }
}

.nmorph-switch--loading {
  @include nmorph-switch-disabled;
}
</style>
