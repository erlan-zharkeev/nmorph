<script setup lang="ts">
import { useModifiers } from '@/utils';
import { ComputedRef, computed } from 'vue';
import { NmorphIcon, NmorphIconSuccess, NmorphIconError } from '@/components';
import { styled, css } from '@vue-styled-components/core'

interface INmorphProps {
  valid: boolean | ComputedRef<boolean>;
  show?: boolean | ComputedRef<boolean>;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  show: true,
});

const modifiers = computed(() =>
  useModifiers({
    'nmorph-validation-icon': [props.valid ? 'valid' : 'invalid'],
  })
);

const validationIcon = computed(() => (props.valid ? NmorphIconSuccess : NmorphIconError));
const validateIconSize = '18px';

const commonCSS = css`
  margin-left: var(--indentation-03);


  &.nmorph-validation-icon--valid {
    .nmorph-validation-icon__content {
      --color: var(--nmorph-success-color);
    }
  }

  &.nmorph-validation-icon--invalid {
    .nmorph-validation-icon__content {
      --color: var(--nmorph-error-text-color);
    }
  }
`

const StyledComponent = styled.div`
  ${commonCSS}
  width: ${props => props.validateIconSize};
`
</script>

<template>
  <StyledComponent :class="modifiers" :props="{ validateIconSize }">
    <NmorphIcon v-if="show" class="nmorph-validation-icon__content" :width="validateIconSize"
      :height="validateIconSize">
      <component :is="validationIcon" />
    </NmorphIcon>
  </StyledComponent>
</template>
