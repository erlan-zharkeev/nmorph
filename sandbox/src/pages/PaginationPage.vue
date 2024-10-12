<template>
  <div class="wrapper">
    <NmorphCard>
      <NmorphTable
        :data="tableData"
        bordered
        :sort="defaultSort"
        design="common"
      >
        <NmorphTableColumn
          prop="date"
          label="Date"
          width="180"
          alignment="start"
        />
        <NmorphTableColumn prop="name" label="Name" width="180" />
        <NmorphTableColumn prop="address" label="Address" />
        <NmorphTableColumn prop="operations" label="Operations">
          <template #default="{ scope }">
            <NmorphTableCell v-for="(row, idx) in scope.rows" :row="idx">
              <NmorphButton :text="`fuck ${row.name}`" />
            </NmorphTableCell>
          </template>
        </NmorphTableColumn>
      </NmorphTable>
      <NmorphPagination
        :total-elements-quantity="tableData.length"
        :model-value="selectedPage"
        @update:model-value="selectedPageHandler"
        v-model:range="currentRange"
      />
    </NmorphCard>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import {
  NmorphCard,
  NmorphTableColumn,
  NmorphTable,
  NmorphButton,
  NmorphTableCell,
  NmorphPagination,
} from "./../../../library/src/components";

const data = computed(() =>
  tableData.slice(currentRange.value[0], currentRange.value[1])
);
const currentRange = ref([1, 1]);

const selectedPageHandler = (value: number) => {
  selectedPage.value = value;
};

const selectedPage = ref(1);

const defaultSort = { date: "descending", name: "ascending" };
const tableData = reactive([
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Anton",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "andress",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "barbara",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-06-03",
    name: "Poli",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "exes",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-10",
    name: "xmas",
    address: "No. 189, Grove St",
  },
  {
    date: "2023-05-01",
    name: "barbudas",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2023-05-01",
    name: "barbudas2",
    address: "No. 189, Grove St, Los Angeles",
  },
]);
</script>
<style lang="scss">
.divider {
  margin: 20px;
}

.wrapper {
  // background-color: var(--nmorph-main-color);
  height: 100vh;
  padding: 0;
}
</style>
