<template>
  <div class="wrapper">
    <NmorphCard>
      <NmorphTable :data="tableData" bordered :sort="defaultSort">
        <NmorphTableColumn prop="date" label="Date" width="180" alignment="start" />
        <NmorphTableColumn prop="name" label="Name" width="180" />
        <NmorphTableColumn prop="address" label="Address" />
        <NmorphTableColumn prop="operations" label="Operations">
          <template #default="{ scope }">
            <NmorphTableCell v-for="(row, idx) in scope.rows" :row="idx">
              <NmorphButton :text="`kill ${row.name}`" @click="testHandler"/>
            </NmorphTableCell>
          </template>
        </NmorphTableColumn>
      </NmorphTable>
    </NmorphCard>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { NmorphCard, NmorphTableColumn, NmorphTable, NmorphButton, NmorphTableCell } from './../../../library/src/components';

const testHandler = () => {
  console.log('test')
}

const defaultSort = { date: 'descending', name: 'ascending' }
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
    name: 'andress',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'barbara',
    address: 'No. 189, Grove St, Los Angeles',
  },
])

</script>
<style lang="scss">
.divider {
  margin: 20px;
}

.wrapper {
  background-color: var(--main-bg);
  height: 100vh;
  padding: 0;
}
</style>
