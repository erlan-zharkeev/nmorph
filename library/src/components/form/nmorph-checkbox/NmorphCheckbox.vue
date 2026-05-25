<script setup lang="ts">
import { computed, ref, inject, watch, type Ref } from 'vue';
import { useModifiers } from '@/utils';
import {
  INmorphCheckboxOption,
  NmorphCheckboxGroupChangeCheckboxValueHandlerInjectionType,
  NmorphCheckboxGroupSelectedValueInjectionType,
  NmorphDomElementType,
  NmorphSelectionControlHeight,
  NmorphSelectionControlHeightType,
} from '@/types';
import { useFormItemModel } from '../nmorph-form/use-form-item-input';
import type { INmorphCheckboxEmit } from './types';

const groupSelectedValue = inject<NmorphCheckboxGroupSelectedValueInjectionType>(
  'checkbox-group-selected-value',
  undefined
);

const changeValue = inject<NmorphCheckboxGroupChangeCheckboxValueHandlerInjectionType>(
  'change-checkbox-value-handler',
  undefined
);
const groupHeight = inject<Ref<NmorphSelectionControlHeightType> | undefined>('checkbox-group-height', undefined);

const props = withDefaults(defineProps<INmorphCheckboxOption>(), {
  id: '',
  disabled: false,
  modelValue: false,
  label: '',
  design: 'button',
});

const emit = defineEmits<INmorphCheckboxEmit>();
const { modelValue, updateModelValue } = useFormItemModel<boolean>(
  props,
  (value) => emit('update:model-value', value),
  false
);

watch(modelValue, (updatedValue) => {
  initialValue.value = updatedValue;
});

const inputDOMRef = ref<NmorphDomElementType>(null);
defineExpose({ inputDOMRef });

const hasGroup = groupSelectedValue !== undefined;
const initialValue = hasGroup ? ref(groupSelectedValue.value) : ref(modelValue.value);

const checked = computed(() => (hasGroup ? groupSelectedValue.value.includes(props.id) : modelValue.value));
const height = computed(() => props.height || groupHeight?.value || 'thin');

const handleChange = () => {
  if (props.disabled) return;
  if (!hasGroup) {
    initialValue.value = !initialValue.value;
    updateModelValue(initialValue.value);
    return;
  }
  if (changeValue && Array.isArray(initialValue.value)) changeValue(props.id, initialValue.value);
};

const modifiers = computed(() =>
  useModifiers({
    nmorph: [NmorphSelectionControlHeight[height.value]],
    'nmorph-checkbox': [
      checked.value && 'checked',
      props.disabled && 'disabled',
      props.design === 'button' && 'button',
    ],
  })
);
</script>

<template>
  <label :class="modifiers">
    <div v-if="props.design === 'checkbox'" class="nmorph-checkbox__content">
      <div class="nmorph-checkbox__input-wrapper">
        <input
          ref="inputDOMRef"
          type="checkbox"
          :disabled="props.disabled"
          :checked="checked"
          class="nmorph-native-input"
          @change="handleChange"
        />
        <div class="nmorph-checkbox__fake" />
        <div v-if="checked" class="nmorph-checkbox__fake-checked" />
      </div>
      <div v-if="props.label" class="nmorph-checkbox__label">
        <span>{{ props.label }}</span>
      </div>
      <div v-else class="nmorph-checkbox__label">
        <slot />
      </div>
    </div>
    <div v-if="props.design === 'button'" class="nmorph-checkbox__content">
      <input ref="inputDOMRef" type="checkbox" :disabled="props.disabled" :checked="checked" @change="handleChange" />
      <div v-if="props.label" class="nmorph-checkbox__fake">
        <span>{{ props.label }}</span>
      </div>
      <div v-else class="nmorph-checkbox__fake">
        <slot name="label">
          <slot />
        </slot>
      </div>
    </div>
  </label>
</template>

<style lang="scss">
.nmorph-checkbox {
  --size: var(--height);
  --nmorph-selection-control-font-size: var(--font-size-small);
  --nmorph-selection-control-line-height: var(--line-height-regular);
  --nmorph-selection-control-inline-padding: var(--indentation-03);

  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  cursor: pointer;

  &.nmorph {
    height: auto;
    min-height: var(--size);
  }

  .nmorph-checkbox__content {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: var(--size);
  }

  .nmorph-checkbox__input-wrapper {
    position: relative;
    width: var(--size);
    height: var(--size);
  }

  input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  input:focus-visible {
    outline: 2px solid var(--nmorph-accent-color);
    opacity: 1;
    scale: 0.95;
  }

  .nmorph-checkbox__fake {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--nmorph-main-color);
    border-radius: var(--default-border-radius);
    box-shadow:
      inset var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
      inset calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
        var(--nmorph-light-shade-color);
  }

  .nmorph-checkbox__label,
  .nmorph-checkbox__fake span {
    font-weight: 400;
    font-size: var(--nmorph-selection-control-font-size);
    line-height: var(--nmorph-selection-control-line-height);
  }

  .nmorph-checkbox__fake-checked {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50%;
    height: 50%;
    background: var(--nmorph-accent-color);
    border-radius: var(--border-radius-20);
    transform: translate(-50%, -50%);
  }

  .nmorph-checkbox__label {
    margin-left: var(--indentation-02);
    line-height: 1;
  }

  .nmorph-checkbox__fake span {
    line-height: 0.8;
  }

  &.nmorph-checkbox--button {
    .nmorph-checkbox__fake {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: auto;
      min-width: var(--size);
      height: var(--size);
      padding: var(--nmorph-selection-control-inline-padding);
      background: var(--nmorph-main-color);
      border-radius: var(--default-border-radius);
      box-shadow:
        var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
        calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
          var(--nmorph-light-shade-color);
    }
  }

  &.nmorph--extra-thin-component {
    --nmorph-selection-control-font-size: var(--font-size-tiny);
    --nmorph-selection-control-line-height: var(--line-height-line);
    --nmorph-selection-control-inline-padding: var(--indentation-02);
  }

  &.nmorph--thin-component {
    --nmorph-selection-control-font-size: var(--font-size-extra-small);
  }

  &.nmorph--basic-component {
    --nmorph-selection-control-font-size: var(--font-size-small);
  }

  &.nmorph--thick-component {
    --nmorph-selection-control-font-size: var(--font-size-base);
  }

  &.nmorph-checkbox--checked {
    .nmorph-checkbox__fake {
      background: var(--nmorph-main-color);
      box-shadow:
        inset var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
        inset calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
          var(--nmorph-light-shade-color);
    }
  }

  &.nmorph-checkbox--disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}
</style>
