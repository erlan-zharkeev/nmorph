<script setup lang="ts">
import { getModifiers } from '@/utils';
import { computed, inject } from 'vue';
import { NmorphComponentHeight } from '@/types/common.enums';
import { FormValidationData } from '@/components/form/types';
import { NmorphValidationIcon, NmorphErrorBox } from './components';

interface IProps {
  id: string;
  height?: keyof typeof NmorphComponentHeight;
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

const ableToShowValidation = computed(() => props.validate && validationData.value);
const showStatusIcon = computed(
  () => Boolean(ableToShowValidation.value) && Boolean(validationData?.value?.touched) && props.showValidationIcon
);
const ableToAddValidationModifiers = computed(() => ableToShowValidation.value && validationData.value?.touched);

const modifiers = computed(() =>
  getModifiers({
    'nmorph-form-item': [
      `${props.label && 'labeled'}`,
      `${ableToAddValidationModifiers.value && (validationData.value?.valid ? 'valid' : 'invalid')}`,
    ],
  })
);
</script>

<template>
  <div :class="modifiers">
    <label v-if="props.label">{{ props.label }}</label>
    <div class="nmorph-form-item__content">
      <slot name="default" />
      <NmorphValidationIcon :valid="Boolean(validationData?.valid)" :show="showStatusIcon" />
    </div>
    <NmorphErrorBox :errors="validationData?.errors" :height="props.height" :static-height="staticErrorBoxSpace" />
  </div>
</template>

<style lang="scss">
.nmorph-form-item {
  margin: var(--indentation-03) var(--indentation-00);

  label {
    @include title-3;
  }

  .nmorph-form-item__content {
    display: flex;
    align-items: center;
    width: 100%;
    position: relative;
  }
}

.nmorph-form-item--labeled {
  .nmorph-form-item__content {
    margin-top: var(--indentation-02);
  }
}

.nmorph-form-item--valid {
  .nmorph-native-input:focus {
    background: var(--success-color-00);
  }
}

.nmorph-form-item--invalid {
  .nmorph-native-input:focus {
    background: var(--error-color-00);
  }
}
</style>
