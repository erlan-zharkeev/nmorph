<script setup lang="ts">
import { INmorphCommonInputProps, NmorphDomElementType } from '@/types';
import { toCssSize, useModifiers } from '@/utils';
import { computed, ref, watch } from 'vue';
import type { CSSProperties } from 'vue';
import { NmorphIcon, NmorphIconLoaderDots } from '@/components';
import { useFormItemInput, useFormItemModel } from '../nmorph-form/use-form-item-input';

type NmorphSwitchModelType = boolean | string | number;

interface INmorphProps extends Omit<INmorphCommonInputProps, 'height'> {
  modelValue?: NmorphSwitchModelType;
  loading?: boolean;
  activeValue?: NmorphSwitchModelType;
  inactiveValue?: NmorphSwitchModelType;
  width?: number | string;
  height?: number | string;
  offset?: number | string;
  thumbHeight?: number | string;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  modelValue: false,
  loading: false,
  disabled: false,
  activeValue: true,
  inactiveValue: false,
  width: undefined,
  height: undefined,
  offset: undefined,
  thumbHeight: undefined,
});

const { id, name, tabindex } = useFormItemInput(props);

const emit = defineEmits<INmorphEmit>();
const { modelValue, updateModelValue } = useFormItemModel<NmorphSwitchModelType>(
  props,
  (value) => emit('update:model-value', value),
  false
);

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
      props.disabled && 'disabled',
      initialValue.value ? 'on' : 'off',
      props.loading && 'loading',
      focus.value && 'focus',
    ],
  })
);

const initialValue = ref<boolean>(modelValue.value === props.activeValue);

const changeHandler = () => {
  if (props.disabled) return;
  initialValue.value = !initialValue.value;
  const value = initialValue.value ? props.activeValue : props.inactiveValue;
  updateModelValue(value);
};

interface INmorphEmit {
  (e: 'update:model-value', val: boolean | string | number): void;
}
const inputDOMRef = ref<NmorphDomElementType>(null);
defineExpose({ inputDOMRef });

const styles = computed<CSSProperties>(() => ({
  ...(props.width !== undefined && { '--width': toCssSize(props.width) }),
  ...(props.height !== undefined && { '--height': toCssSize(props.height) }),
  ...(props.offset !== undefined && { '--offset': toCssSize(props.offset) }),
  ...(props.thumbHeight !== undefined && { '--thumb-height': toCssSize(props.thumbHeight) }),
}));

watch(modelValue, (newValue) => {
  initialValue.value = newValue === props.activeValue;
});
</script>

<template>
  <div :class="modifiers" :style="styles">
    <div class="nmorph-switch__content" @click="changeHandler">
      <input
        :id="id"
        ref="inputDOMRef"
        :name="name"
        type="checkbox"
        :value="props.activeValue"
        :checked="initialValue"
        :disabled="props.disabled"
        :tabindex="tabindex"
        class="nmorph-native-input"
        @focus="focusHandler"
        @blur="blurHandler"
      />
      <div class="nmorph-switch__bg-content" :class="{ 'nmorph-switch__bg-content--enable': initialValue }">
        <slot v-if="initialValue" name="bg-on" />
        <slot v-else name="bg-off" />
      </div>
      <div class="nmorph-switch-thumb">
        <NmorphIcon v-if="props.loading" width="14px" height="14px">
          <NmorphIconLoaderDots />
        </NmorphIcon>
        <slot v-else-if="initialValue" name="thumb-on" />
        <slot v-else name="thumb-off" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-switch {
  --width: 40px;
  --height: 20px;
  --offset: 3px;
  --thumb-height: 14px;

  width: var(--width);
  height: var(--height);
  overflow: hidden;
  border-radius: var(--border-radius-999);
  cursor: pointer;

  .nmorph-switch__content {
    position: relative;
    height: 100%;
    font-weight: 400;
    font-size: var(--font-size-small);
    line-height: var(--line-height-regular);
    background: var(--nmorph-main-color);
    border-radius: var(--border-radius-999);
    box-shadow:
      inset var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
      inset calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
        var(--nmorph-light-shade-color);
  }

  .nmorph-switch__bg-content {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 8px;

    &.nmorph-switch__bg-content--enable {
      justify-content: flex-start;
      color: var(--nmorph-focus-text-color);
    }
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
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--thumb-height);
    height: var(--thumb-height);
    background: var(--nmorph-main-color);
    border-radius: var(--border-radius-999);
    box-shadow:
      var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
      calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
        var(--nmorph-light-shade-color);
    transition: left ease-in-out var(--transition-02);
  }

  &.nmorph-switch--disabled {
    cursor: not-allowed;
    opacity: 0.6;

    .nmorph-switch__input-content {
      pointer-events: none;
    }
  }

  &.nmorph-switch--on {
    .nmorph-switch__content {
      background: var(--nmorph-accent-color);
      box-shadow: none;
    }

    .nmorph-switch-thumb {
      left: calc(100% - var(--thumb-height) - var(--offset));
      box-shadow: none;
    }
  }

  &.nmorph-switch--loading {
    cursor: not-allowed;
    opacity: 0.6;

    .nmorph-switch__input-content {
      pointer-events: none;
    }
  }

  &.nmorph-switch--focus {
    outline: 2px solid var(--nmorph-accent-color);

    .nmorph-switch__content {
      scale: 0.95;
    }
  }
}
</style>
