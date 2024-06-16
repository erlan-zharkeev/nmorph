<script setup lang="ts">
import { computed, inject, ref } from 'vue';
import { useModifiers } from '@/utils';
import { onMounted, provide } from 'vue';
import { NmorphDomElementType } from '@/types/common';
import {
  INmorphTableDataInjection,
  INmorphTableColumnProps,
  NmorphTableIdInjectionType,
  NmorphTableColumnPropertyInjectionType,
} from '@/components';

const data = inject<INmorphTableDataInjection>('table-data');
const tableIdentifier = inject<NmorphTableIdInjectionType>('table-identifier');

interface INmorphProps extends INmorphTableColumnProps {}
const props = withDefaults(defineProps<INmorphProps>(), {
  label: '',
  width: '',
  alignment: 'center',
});

const modifiers = computed(() =>
  useModifiers({
    'nmorph-table-column': [],
  })
);
const id = ref(0);

provide<NmorphTableColumnPropertyInjectionType>('column-property', props.prop);
provide('table-identifier', tableIdentifier) as unknown as NmorphTableIdInjectionType;

onMounted(() => {
  updateTableData();
});

const updateTableData = () => {
  if (!data?.columns.value) return;
  const { columns } = data;
  id.value = columns.value.length + 1;
  data.columns.value = [...columns.value, { ...props, id: id.value }];
};

const columnDOMEl = ref<NmorphDomElementType>(null);
</script>

<template>
  <div ref="columnDOMEl" :data-id="id" :class="modifiers">
    <slot :scope="{ columns: data?.columns.value, rows: data?.rows.value, tableId: tableIdentifier }" />
  </div>
</template>
