<script setup lang="ts">
import { useModifiers } from '@/utils';
import { ComputedRef, computed } from 'vue';
import { NmorphIcon } from '@/components';

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
  width: v-bind(validateIconSize);
  margin-left: var(--indentation-03);
}

.nmorph-validation-icon--valid {
  .nmorph-validation-icon__content {
    --color: var(--success-color-00);
  }
}

.nmorph-validation-icon--invalid {
  .nmorph-validation-icon__content {
    --color: var(--error-text-color-00);
  }
}
</style>
