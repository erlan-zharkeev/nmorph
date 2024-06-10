<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useModifiers } from '@/utils';
import { inject } from 'vue';
import { NmorphTableColumnPropertyInjectionType, NmorphTableIdInjectionType } from '../../types';

const columnProperty = inject<NmorphTableColumnPropertyInjectionType>('column-property');
const tableIdentifier = inject<NmorphTableIdInjectionType>('table-identifier');

interface INmorphProps {
  row: number;
}
const props = withDefaults(defineProps<INmorphProps>(), {});
const modifiers = computed(() =>
  useModifiers({
    'nmorph-table-cell': [],
  })
);
const targetId = computed(() => `#table-cell-${tableIdentifier}-${props.row}-${columnProperty}`);

const isMounted = ref(false);
onMounted(() => {
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
