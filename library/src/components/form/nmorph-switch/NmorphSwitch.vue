<script setup lang="ts">
import { INmorphCommonInputProps, NmorphDomElementType } from '@/types';
import { useModifiers } from '@/utils';
import { computed, ref, watch } from 'vue';
import { NmorphIcon, NmorphIconLoader } from '@/components';
import { useFormItemInput } from '../nmorph-form/use-form-item-input';

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

const { id, name, tabindex } = useFormItemInput(props);

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
      <input
        :id="id"
        ref="inputDOMRef"
        :name="name"
        type="checkbox"
        :value="initialValue"
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
          <NmorphIconLoader />
        </NmorphIcon>
        <slot v-else-if="initialValue" name="thumb-on" />
        <slot v-else name="thumb-off" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
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

    font-weight: 400;
    font-size: var(--font-size-small);
    line-height: var(--line-height-regular);

    background: var(--nmorph-main-color);
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
    align-items: center;
    justify-content: flex-end;
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
    width: var(--thumb-height);
    height: var(--thumb-height);
    border-radius: var(--border-radius-999);
    transition: left ease-in-out var(--transition-02);

    display: flex;
    justify-content: center;
    align-items: center;

    background: var(--nmorph-main-color);
    box-shadow:
      var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
      calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
        var(--nmorph-light-shade-color);
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
      left: calc(100% - 16px);
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
