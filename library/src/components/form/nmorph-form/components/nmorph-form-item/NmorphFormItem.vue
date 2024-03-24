<script setup lang="ts">
import { createModifiers } from '@/utils';
import { computed, inject } from 'vue';
import { ControlComponentHeight } from '@/types/common.enums';
import NmorphValidationIcon from './components/nmorph-validation-icon/NmorphValidationIcon.vue';
import NmorphErrorBox from './components/nmorph-error-box/NmorphErrorBox.vue';
import { FormValidationData } from '@/components/form/types';

interface IProps {
  id: string;
  height?: keyof typeof ControlComponentHeight;
  label?: string;
  showValidationIcon?: boolean;
  staticErrorBoxSpace?: boolean;
  validate?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  label: '',
  height: 'default',
  showValidationIcon: true,
  staticErrorBoxSpace: false,
  validate: true,
});

const formData = inject<FormValidationData>('form-data');
const validationData = computed(() => formData?.fields[props.id]);

const modifiers = computed(() =>
  createModifiers('nmorph-form-item', [
    props.label ? 'labeled' : '',
    validationData.value
      ? validationData.value.showValidation
        ? validationData.value.valid
          ? 'valid'
          : 'invalid'
        : ''
      : '',
  ])
);
</script>

<template>
  <div :class="modifiers">
    <label v-if="props.label">{{ props.label }}</label>
    <div class="nmorph-form-item__content">
      <slot name="default" />
      <NmorphValidationIcon
        v-if="showValidationIcon && validationData?.touched"
        :valid="validationData.valid"
        :show="validationData.showValidation"
      />
    </div>
    <NmorphErrorBox
      v-if="validationData && (props.staticErrorBoxSpace || validationData.showValidation)"
      :errors="validationData.errors"
      :height="props.height"
    />
  </div>
</template>

<style lang="scss">
.nmorph-form-item {
  margin: 4px 0;
  .nmorph-form-item__content {
    display: inline-flex;
    align-items: center;
    width: 100%;
    position: relative;
  }
}

.nmorph-form-item--labeled {
  .nmorph-form-item__content {
    margin-top: 4px;
  }
}
</style>
../../../types
