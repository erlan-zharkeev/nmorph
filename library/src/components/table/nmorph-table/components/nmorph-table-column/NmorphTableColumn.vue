<script setup lang="ts">
import { computed, inject, ref } from 'vue';
import { useModifiers } from '@/utils';
import { NmorphTableColumnProps, NmorphTableDataInjection } from '@/components/table/types';
import { onMounted, provide } from 'vue';
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
provide<string>('column-property', props.prop);

onMounted(() => {
  updateTableData();
});

const updateTableData = () => {
  if (!data?.columns.value) return;
  const { columns } = data;
  id.value = columns.value.length + 1;
  data.columns.value = [...columns.value, { ...props, id: id.value }];
};

const columnDOMEl = ref<NmorphDomElement>(null);
</script>

<template>
  <div ref="columnDOMEl" :data-id="id" :class="modifiers">
    <slot :scope="{ columns: data?.columns.value, rows: data?.rows.value }" />
  </div>
</template>
