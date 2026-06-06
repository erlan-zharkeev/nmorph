<script setup lang="ts">
import { useModifiers } from '@/utils';
import { computed } from 'vue';
import { NmorphIcon, NmorphIconSuccess, NmorphIconError } from '@/components';
import type { INmorphValidationIconProps } from './types';

const props = withDefaults(defineProps<INmorphValidationIconProps>(), {
  show: true,
});

const modifiers = computed(() =>
  useModifiers({
    'nmorph-validation-icon': [props.valid ? 'valid' : 'invalid'],
  })
);

const validationIcon = computed(() => (props.valid ? NmorphIconSuccess : NmorphIconError));
const validateIconSize = '18px';
</script>

<template>
  <div :class="modifiers">
    <NmorphIcon
      v-if="show"
      class="nmorph-validation-icon__content"
      :width="validateIconSize"
      :height="validateIconSize"
    >
      <component :is="validationIcon" />
    </NmorphIcon>
  </div>
</template>

<style lang="scss">
.nmorph-validation-icon {
  width: 18px;
  margin-left: var(--indentation-03);

  &.nmorph-validation-icon--valid {
    .nmorph-validation-icon__content {
      --nmorph-private-icon-color: var(--nmorph-success-color);
    }
  }

  &.nmorph-validation-icon--invalid {
    .nmorph-validation-icon__content {
      --nmorph-private-icon-color: var(--nmorph-error-text-color);
    }
  }
}
</style>
