<script setup lang="ts">
import { computed, ref, inject, watch, type Ref } from 'vue';
import { body2, disabled, focusOutline, nmorphInset, nmorphOutset, useModifiers } from '@/utils';
import {
  INmorphCheckboxOption,
  NmorphCheckboxGroupChangeCheckboxValueHandlerInjectionType,
  NmorphCheckboxGroupSelectedValueInjectionType,
  NmorphComponentHeight,
  NmorphDomElementType,
} from '@/types';
import { styled, css } from '@vue-styled-components/core';

const groupSelectedValue = inject<NmorphCheckboxGroupSelectedValueInjectionType>(
  'checkbox-group-selected-value',
  undefined
);

const changeValue = inject<NmorphCheckboxGroupChangeCheckboxValueHandlerInjectionType>(
  'change-checkbox-value-handler',
  undefined
);
const groupHeight = inject<Ref<keyof typeof NmorphComponentHeight> | undefined>('checkbox-group-height', undefined);

const props = withDefaults(defineProps<INmorphCheckboxOption>(), {
  id: '',
  disabled: false,
  modelValue: false,
  label: '',
  design: 'checkbox',
});

interface INmorphEmit {
  (e: 'update:model-value', val: boolean): void;
}

watch(
  () => props.modelValue,
  (updatedValue) => {
    initialValue.value = updatedValue;
  }
);

const inputDOMRef = ref<NmorphDomElementType>(null);
defineExpose({ inputDOMRef });

const hasGroup = groupSelectedValue !== undefined;
const initialValue = hasGroup ? ref(groupSelectedValue.value) : ref(props.modelValue);

const checked = computed(() => (hasGroup ? groupSelectedValue.value.includes(props.id) : props.modelValue));
const height = computed(() => props.height || groupHeight?.value || 'thin');

const emit = defineEmits<INmorphEmit>();

const handleChange = () => {
  if (props.disabled) return;
  if (!hasGroup) {
    initialValue.value = !initialValue.value;
    emit('update:model-value', initialValue.value);
    return;
  }
  if (changeValue && Array.isArray(initialValue.value)) changeValue(props.id, initialValue.value);
};

const modifiers = computed(() =>
  useModifiers({
    nmorph: [NmorphComponentHeight[height.value]],
    'nmorph-checkbox': [
      `${checked.value && 'checked'}`,
      `${props.disabled && 'disabled'}`,
      `${props.design === 'button' && 'button'}`,
    ],
  })
);

const commonCSS = css`
  --size: var(--height);

  display: inline-flex;
  align-items: center;
  cursor: pointer;

  .nmorph-checkbox__content {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nmorph-checkbox__input-wrapper {
    position: relative;
    width: var(--size);
    height: var(--size);
  }

  input {
    opacity: 0;

    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  input:focus-visible {
    opacity: 1;
    scale: 0.95;
    ${focusOutline()}
  }

  .nmorph-checkbox__fake {
    border-radius: var(--default-border-radius);

    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    ${nmorphInset()}
  }

  .nmorph-checkbox__label,
  .nmorph-checkbox__fake span {
    ${body2()}
  }

  .nmorph-checkbox__fake-checked {
    width: 50%;
    height: 50%;
    background: var(--nmorph-accent-color);
    border-radius: var(--border-radius-20);

    position: absolute;
    top: 50%;
    left: 50%;
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
      align-items: center;
      height: var(--size);
      padding: var(--indentation-03);
      border-radius: var(--default-border-radius);
      ${nmorphOutset()}
    }
  }

  &.nmorph-checkbox--checked {
    .nmorph-checkbox__fake {
      ${nmorphInset()}
    }
  }

  &.nmorph-checkbox--disabled {
    ${disabled()}
  }
`;

const StyledComponent = styled.label`
  ${commonCSS}
`;
</script>

<template>
  <StyledComponent :class="modifiers">
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
        <slot name="label" />
      </div>
    </div>
  </StyledComponent>
</template>
