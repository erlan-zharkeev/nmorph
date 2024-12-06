<script setup lang="ts">
import { INmorphCommonInputProps, NmorphDomElementType } from '@/types';
import { useModifiers } from '@/utils';
import { computed, ref, watch } from 'vue';
import { NmorphIcon } from '@/components';

type NmorphSwitchModelType = boolean | string | number;

interface INmorphProps extends Omit<INmorphCommonInputProps, 'height'> {
  modelValue?: NmorphSwitchModelType;
  loading?: boolean;
  activeValue?: NmorphSwitchModelType;
  inactiveValue?: NmorphSwitchModelType;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  modelValue: false,
  loading: false,
  disabled: false,
  activeValue: true,
  inactiveValue: false,
});

const emit = defineEmits<INmorphEmit>();

const focus = ref(false);
const focusHandler = () => {
  focus.value = true;
};
const blurHandler = () => {
  focus.value = false;
};

const modifiers = computed(() =>
  useModifiers({
    'nmorph-switch': [
      `${props.disabled && 'disabled'}`,
      `${initialValue.value ? 'on' : 'off'}`,
      `${props.loading && 'loading'}`,
      `${focus.value && 'focus'}`,
    ],
  })
);

const initialValue = ref<boolean>(props.modelValue === props.activeValue);

const changeHandler = () => {
  if (props.disabled) return;
  initialValue.value = !initialValue.value;
  const value = initialValue.value ? props.activeValue : props.inactiveValue;
  emit('update:model-value', value);
};

interface INmorphEmit {
  (e: 'update:model-value', val: boolean | string | number): void;
}
const inputDOMRef = ref<NmorphDomElementType>(null);
defineExpose({ inputDOMRef });

watch(
  () => props.modelValue,
  (newValue) => {
    initialValue.value = newValue === props.activeValue;
  }
);
</script>

<template>
  <div :class="modifiers">
    <div class="nmorph-switch__content" @click="changeHandler">
      <input ref="inputDOMRef" type="checkbox" :value="initialValue" :disabled="props.disabled"
        class="nmorph-native-input" @focus="focusHandler" @blur="blurHandler" />
      <div class="nmorph-switch__bg-content" :class="{ 'nmorph-switch__bg-content--enable': initialValue }">
        <slot v-if="initialValue" name="bg-on" />
        <slot v-else name="bg-off" />
      </div>
      <div class="nmorph-switch-thumb">
        <NmorphIcon v-if="props.loading" name="loader" width="14px" height="14px" />
        <slot v-else-if="initialValue" name="thumb-on" />
        <slot v-else name="thumb-off" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use '@/styles/mixins' as *;

.nmorph-switch {
  --height: 20px;
  --offset: 3px;
  --thumb-height: 14px;

  width: 40px;
  height: var(--height);
  overflow: hidden;
  border-radius: var(--border-radius-999);
  cursor: pointer;

  .nmorph-switch__content {
    position: relative;
    height: 100%;
    border-radius: var(--border-radius-999);
    transition:
      background ease-in-out var(--transition-02),
      box-shadow ease-in-out var(--transition-02);

    @include body-4;
    @include nmorph-inset;
  }

  input {
    width: 100%;
    height: var(--height);
    opacity: 0;
  }

  .nmorph-switch-thumb {
    position: absolute;
    top: var(--offset);
    left: var(--offset);
    width: var(--thumb-height);
    height: var(--thumb-height);
    border-radius: var(--border-radius-999);
    transition:
      left ease-in-out var(--transition-02),
      box-shadow ease-in-out var(--transition-02);

    display: flex;
    justify-content: center;
    align-items: center;

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
    background: var(--nmorph-accent-color);
    box-shadow: none;
  }

  .nmorph-switch-thumb {
    left: calc(100% - 16px);
    box-shadow: none;
  }
}

.nmorph-switch--loading {
  @include nmorph-switch-disabled;
}

.nmorph-switch__bg-content {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  padding: 8px;
}

.nmorph-switch__bg-content--enable {
  justify-content: flex-start;
  color: var(--nmorph-focus-text-color);
}

.nmorph-switch--focus {
  @include focus-outline;

  .nmorph-switch__content {
    scale: 0.95;
  }
}
</style>
