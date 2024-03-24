<script setup lang="ts">
import { createModifiers } from '@/utils';
import { ComputedRef, computed } from 'vue';
import { NmorphIcon } from '@/components';

interface IProps {
  valid: boolean | ComputedRef<boolean>;
  show: boolean | ComputedRef<boolean>;
}

const props = withDefaults(defineProps<IProps>(), {
  show: true,
});

const modifiers = computed(() => createModifiers('nmorph-validation-icon', [props.valid ? 'valid' : 'invalid']));

const validationIcon = computed(() => (props.valid ? 'success' : 'error'));
const validateIconSize = '18px';
</script>

<template>
  <div :class="modifiers">
    <NmorphIcon
      v-if="show"
      class="nmorph-validation-icon__content"
      :name="validationIcon"
      :width="validateIconSize"
      :height="validateIconSize"
    />
  </div>
</template>

<style lang="scss">
.nmorph-validation-icon {
  .nmorph-validation-icon__content {
    margin-left: 8px;
  }
}
.nmorph-validation-icon--valid {
  .nmorph-validation-icon__content {
    --color: var(--success-color-00);
  }
}
.nmorph-validation-icon--invalid {
  .nmorph-validation-icon__content {
    --color: var(--error-color-00);
  }
}
</style>
