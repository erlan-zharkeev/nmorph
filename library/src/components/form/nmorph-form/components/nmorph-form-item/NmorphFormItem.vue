<script setup lang="ts">
import { useModifiers } from '@/utils';
import { computed, inject, provide, toRef, unref } from 'vue';

import { NmorphValidationIcon, NmorphErrorBox } from './inner-components';
import type { NmorphAvailableFormValueType, NmorphFormValidationDataType } from '@/components';
import { nmorphFormItemInputDataKey } from '../../use-form-item-input';
import type { NmorphFormItemInputDataType } from '../../types';
import type { INmorphFormItemProps } from './types';

const props = withDefaults(defineProps<INmorphFormItemProps>(), {
  name: '',
  autocomplete: '',
  label: '',
  thickness: 'basic',
  showValidationIcon: true,
  staticErrorBoxSpace: false,
});

const formData = inject<NmorphFormValidationDataType>('form-data');
const validationData = computed(() => formData?.fields[props.id]);
const fieldData = computed(() => formData?.formValue[props.id]);
const fieldValue = computed(() => fieldData.value?.value);
const fieldRules = computed(() => fieldData.value?.rules || []);
const fieldErrors = computed(() => unref(validationData.value?.errors) || []);
const fieldValid = computed(() => unref(validationData.value?.valid) ?? true);
const fieldTouched = computed(() => unref(validationData.value?.touched) ?? false);

const ableToShowValidation = computed(() => validationData.value);
const showStatusIcon = computed(
  () => Boolean(ableToShowValidation.value) && Boolean(validationData?.value?.touched) && props.showValidationIcon
);
const ableToAddValidationModifiers = computed(() => ableToShowValidation.value && validationData.value?.touched);

provide<NmorphFormItemInputDataType>(nmorphFormItemInputDataKey, {
  id: toRef(props, 'id'),
  name: computed(() => props.name || props.id),
  autocomplete: computed(() => props.autocomplete || undefined),
  value: fieldValue,
  rules: fieldRules,
  errors: fieldErrors,
  valid: fieldValid,
  touched: fieldTouched,
  updateValue: (value: NmorphAvailableFormValueType) => formData?.updateFieldValue(props.id, value),
  validate: (value?: NmorphAvailableFormValueType) => {
    formData?.validateField(props.id, value);
  },
});

const modifiers = computed(() =>
  useModifiers({
    'nmorph-form-item': [
      props.label && 'labeled',
      ableToAddValidationModifiers.value && (validationData.value?.valid ? 'valid' : 'invalid'),
    ],
  })
);
</script>

<template>
  <div :class="modifiers">
    <label v-if="props.label" :for="props.id">{{ props.label }}</label>
    <div class="nmorph-form-item__content">
      <slot />
      <NmorphValidationIcon
        v-if="props.showValidationIcon"
        :valid="Boolean(validationData?.valid)"
        :show="showStatusIcon"
      />
    </div>
    <NmorphErrorBox
      :errors="validationData?.errors"
      :thickness="props.thickness"
      :static-height="staticErrorBoxSpace"
    />
  </div>
</template>

<style lang="scss">
.nmorph-form-item {
  min-width: 0;
  max-width: 100%;
  margin: var(--indentation-04) var(--indentation-00);

  label {
    font-weight: var(--nmorph-typography-label-font-weight);
    font-size: var(--nmorph-typography-label-font-size);
    line-height: var(--nmorph-typography-label-line-height);
  }

  .nmorph-form-item__content {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    min-width: 0;
    max-width: 100%;
  }

  &.nmorph-form-item--labeled {
    .nmorph-form-item__content {
      margin-top: var(--indentation-02);
    }
  }

  &.nmorph-form-item--valid {
    .nmorph-native-input:focus {
      background: var(--nmorph-success-color);
    }
  }

  &.nmorph-form-item--invalid {
    .nmorph-native-input:focus {
      background: var(--nmorph-error-color);
    }
  }
}
</style>
