<script setup lang="ts">
import { computed, ref, inject, watch, type Ref } from 'vue';
import { useModifiers } from '@/utils';
import {
  INmorphCheckboxOption,
  NmorphCheckboxGroupChangeCheckboxValueHandlerInjectionType,
  NmorphCheckboxGroupSelectedValueInjectionType,
  NmorphDomElementType,
  NmorphSelectionControlThickness,
  NmorphSelectionControlThicknessType,
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
const groupThickness = inject<Ref<NmorphSelectionControlThicknessType> | undefined>(
  'checkbox-group-thickness',
  undefined
);

const props = withDefaults(defineProps<INmorphCheckboxOption>(), {
  id: '',
  disabled: false,
  modelValue: false,
  label: '',
  design: 'nmorph',
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
const resolvedDesign = computed(() => props.design || 'nmorph');
const requestedThickness = computed(() => props.thickness || groupThickness?.value || 'basic');
const thickness = computed(() => {
  if (resolvedDesign.value !== 'plain' && requestedThickness.value === 'extra-thin') return 'basic';
  return requestedThickness.value;
});

const handleChange = () => {
  if (props.disabled) return;
  if (!hasGroup) {
    initialValue.value = !initialValue.value;
    updateModelValue(initialValue.value);
    return;
  }
  if (changeValue) changeValue(props.id);
};

const modifiers = computed(() =>
  useModifiers({
    nmorph: [NmorphSelectionControlThickness[thickness.value]],
    'nmorph-checkbox': [checked.value && 'checked', props.disabled && 'disabled', resolvedDesign.value],
  })
);
</script>

<template>
  <label :class="modifiers">
    <div v-if="props.design === 'plain'" class="nmorph-checkbox__content">
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
    <div v-if="props.design === 'nmorph'" class="nmorph-checkbox__content">
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
  --nmorph-private-selection-control-size: var(--nmorph-private-control-height);
  --nmorph-private-selection-control-font-size: var(--nmorph-private-control-font-size);
  --nmorph-private-selection-control-line-height: var(--nmorph-private-control-line-height);
  --nmorph-private-selection-control-font-weight: var(--nmorph-private-control-font-weight);
  --nmorph-private-selection-control-inline-padding: var(--indentation-03);

  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  cursor: pointer;

  &.nmorph {
    height: auto;
    min-height: var(--nmorph-private-selection-control-size);
  }

  .nmorph-checkbox__content {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: var(--nmorph-private-selection-control-size);
  }

  .nmorph-checkbox__input-wrapper {
    position: relative;
    width: var(--nmorph-private-selection-control-size);
    height: var(--nmorph-private-selection-control-size);
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
    display: inline-flex;
    align-items: center;
    font-weight: var(--nmorph-private-selection-control-font-weight);
    font-size: var(--nmorph-private-selection-control-font-size);
    line-height: var(--nmorph-private-selection-control-line-height);
    transform: translateY(var(--nmorph-private-control-text-offset-y));
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
    white-space: nowrap;
  }

  &.nmorph-checkbox--nmorph {
    .nmorph-checkbox__fake {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      width: auto;
      min-width: var(--nmorph-private-selection-control-size);
      height: var(--nmorph-private-selection-control-size);
      padding: 0 var(--nmorph-private-selection-control-inline-padding);
      background: var(--nmorph-main-color);
      border-radius: var(--default-border-radius);
      box-shadow:
        var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
        calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
          var(--nmorph-light-shade-color);
    }
  }

  &.nmorph--extra-thin-component {
    --nmorph-private-selection-control-inline-padding: var(--indentation-02);
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

  &.nmorph-checkbox--plain {
    .nmorph-checkbox__fake {
      border: var(--nmorph-plain-border);
      box-shadow: none;
    }
  }

  &.nmorph-checkbox--disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}
</style>
