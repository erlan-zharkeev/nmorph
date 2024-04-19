<script setup lang="ts">
import { computed } from 'vue';
import { useModifiers } from '@/utils';
import { NmorphTable, NmorphTableColumn } from '@/components';

const tableData = reactive([
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Anton',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'barbara',
    address: 'No. 189, Grove St, Los Angeles',
  },
]);

interface IProps {}

const props = withDefaults(defineProps<IProps>(), {});
const emit = defineEmits<IEmit>();

interface IEmit {}

const modifiers = computed(() =>
  useModifiers({
    nmorph: [],
    'nmorph-calendar': [],
  })
);
</script>
<template>
  <div :class="modifiers">
    <NmorphTable :data="tableData" bordered :sort="defaultSort">
      <!-- <NmorphTableColumn prop="date" label="Date" width="180"/>
      <NmorphTableColumn prop="name" label="Name" width="180" />
      <NmorphTableColumn prop="address" label="Address"  /> -->
    </NmorphTable>
  </div>
</template>

<style lang="scss">
// .nmorph-calendar
</style>
