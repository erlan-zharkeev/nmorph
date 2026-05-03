<script setup lang="ts">
import { title4, useModifiers } from '@/utils';
import { computed, inject, provide, toRef } from 'vue';
import { NmorphComponentHeight } from '@/types';
import { NmorphValidationIcon, NmorphErrorBox } from './inner-components';
import { NmorphFormValidationDataType } from '@/components';
import { styled, css } from '@vue-styled-components/core';
import { nmorphFormItemInputDataKey } from '../../use-form-item-input';
import { NmorphFormItemInputDataType } from '../../types';

interface INmorphProps {
  id: string;
  name?: string;
  autocomplete?: string;
  height?: keyof typeof NmorphComponentHeight;
  label?: string;
  showValidationIcon?: boolean;
  staticErrorBoxSpace?: boolean;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  name: '',
  autocomplete: '',
  label: '',
  height: 'default',
  showValidationIcon: true,
  staticErrorBoxSpace: false,
});

const formData = inject<NmorphFormValidationDataType>('form-data');
const validationData = computed(() => formData?.fields[props.id]);

const ableToShowValidation = computed(() => validationData.value);
const showStatusIcon = computed(
  () => Boolean(ableToShowValidation.value) && Boolean(validationData?.value?.touched) && props.showValidationIcon
);
const ableToAddValidationModifiers = computed(() => ableToShowValidation.value && validationData.value?.touched);

provide<NmorphFormItemInputDataType>(nmorphFormItemInputDataKey, {
  id: toRef(props, 'id'),
  name: computed(() => props.name || props.id),
  autocomplete: computed(() => props.autocomplete || undefined),
});

const modifiers = computed(() =>
  useModifiers({
    'nmorph-form-item': [
      `${props.label && 'labeled'}`,
      `${ableToAddValidationModifiers.value && (validationData.value?.valid ? 'valid' : 'invalid')}`,
    ],
  })
);

const commonCSS = css`
  margin: var(--indentation-04) var(--indentation-00);

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
