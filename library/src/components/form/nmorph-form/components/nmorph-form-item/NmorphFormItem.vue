<script setup lang="ts">
import { title4, useModifiers } from '@/utils';
import { computed, inject } from 'vue';
import { NmorphComponentHeight } from '@/types';
import { NmorphValidationIcon, NmorphErrorBox } from './inner-components';
import { NmorphFormValidationDataType } from '@/components';
import { styled, css } from '@vue-styled-components/core';

interface INmorphProps {
  id: string;
  height?: keyof typeof NmorphComponentHeight;
  label?: string;
  showValidationIcon?: boolean;
  staticErrorBoxSpace?: boolean;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  label: '',
  height: 'default',
  showValidationIcon: true,
  staticErrorBoxSpace: false,
});

const formData = inject<NmorphFormValidationDataType>('form-data', undefined);
const validationData = computed(() => formData?.fields[props.id]);

const ableToShowValidation = computed(() => validationData.value);
const showStatusIcon = computed(
  () => Boolean(ableToShowValidation.value) && Boolean(validationData?.value?.touched) && props.showValidationIcon
);
const ableToAddValidationModifiers = computed(() => ableToShowValidation.value && validationData.value?.touched);

const modifiers = computed(() =>
  useModifiers({
    'nmorph-form-item': [
      `${props.label && 'labeled'}`,
      `${ableToAddValidationModifiers.value && (validationData.value?.valid ? 'valid' : 'invalid')}`,
    ],
  })
);

const commonCSS = css`
  margin: var(--indentation-02) var(--indentation-00);

  label {
    ${title4()}
  }

  .nmorph-form-item__content {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
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
      background: var(--nmorph-error-text-color);
    }
  }
`;

const StyledComponent = styled.div`
  ${commonCSS}
`;
</script>

<template>
  <StyledComponent :class="modifiers">
    <label v-if="props.label" :for="props.id">{{ props.label }}</label>
    <div class="nmorph-form-item__content">
      <slot />
      <NmorphValidationIcon
        v-if="props.showValidationIcon"
        :valid="Boolean(validationData?.valid)"
        :show="showStatusIcon"
      />
    </div>
    <NmorphErrorBox :errors="validationData?.errors" :height="props.height" :static-height="staticErrorBoxSpace" />
  </StyledComponent>
</template>
