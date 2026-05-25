<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useModifiers } from '@/utils';
import { inject, nextTick } from 'vue';
import { NmorphTableColumnPropertyInjectionType, NmorphTableIdInjectionType } from '@/components';
import type { INmorphTableCellProps } from './types';

const columnProperty = inject<NmorphTableColumnPropertyInjectionType>('column-property');
const tableIdentifier = inject<NmorphTableIdInjectionType>('table-identifier');

const props = withDefaults(defineProps<INmorphTableCellProps>(), {});
const modifiers = computed(() =>
  useModifiers({
    'nmorph-table-cell': [],
  })
);
const targetId = computed(() => `#table-cell-${tableIdentifier}-${props.row}-${columnProperty}`);

const isMounted = ref(false);
onMounted(async () => {
  await nextTick();
  const targetElement = document.querySelector(targetId.value);
  if (targetElement) targetElement.innerHTML = '';
  isMounted.value = true;
});
</script>

<template>
  <div v-if="isMounted" :class="modifiers">
    <teleport :to="targetId">
      <slot />
    </teleport>
  </div>
</template>
