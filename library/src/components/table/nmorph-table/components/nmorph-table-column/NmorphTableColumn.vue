<script setup lang="ts">
import { computed, inject, ref } from 'vue';
import { useModifiers } from '@/utils';
import { NmorphTableColumnProps, NmorphTableDataInjection } from '@/components/table/types';
import { onMounted } from 'vue';
import { NmorphDomElement } from '@/types/common';

const data = inject<NmorphTableDataInjection>('table-data');
interface IProps extends NmorphTableColumnProps {}
const props = withDefaults(defineProps<IProps>(), {
  label: '',
  width: '',
  alignment: 'center',
});

const modifiers = computed(() =>
  useModifiers({
    nmorph: [],
    'nmorph-table-column': [],
  })
);
const id = ref(0);

onMounted(() => {
  if (!data?.columns.value) return;
  const { columns } = data;
  id.value = columns.value.length + 1;
  data.columns.value = [...columns.value, { ...props, id: id.value }];
});

const columnDOMEl = ref<NmorphDomElement>(null);
</script>

<template>
  <div ref="columnDOMEl" :data-id="id" :class="modifiers">
    <slot :scope="{ columns: data?.columns.value, rows: data?.rows.value }" />
  </div>
</template>

<style lang="scss">
.nmorph-table-column {
}
</style>
