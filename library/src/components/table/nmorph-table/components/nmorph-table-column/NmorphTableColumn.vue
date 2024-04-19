<script setup lang="ts">
import { computed, inject } from 'vue';
import { useModifiers } from '@/utils';
import { NmorphTableColumnProps, NmorphTableDataInjection } from '@/components/table/types';
import { onMounted } from 'vue';

const data = inject<NmorphTableDataInjection>('table-data');
const props = withDefaults(defineProps<NmorphTableColumnProps>(), {
  label: '',
  width: 0,
  alignment: 'center',
});

const modifiers = computed(() =>
  useModifiers({
    nmorph: [],
    'nmorph-table-column': [],
  })
);

const columnWidth = computed(() => props.width ?? '');

onMounted(() => {
  if (!data?.columns.value) return;
  const { columns } = data;
  const columnData = props;
  data.columns.value = [...columns.value, { ...columnData, width: columnWidth.value }];
});
</script>

<template>
  <div :class="modifiers">
    <slot :scope="{ columns: data?.columns.value, rows: data?.rows.value }" />
  </div>
</template>
<style lang="scss">
.nmorph-table-column {
}
</style>
