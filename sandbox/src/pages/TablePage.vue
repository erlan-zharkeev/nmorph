<template>
  <div class="wrapper">
    <NmorphCard>
      <!-- <NmorphTable :data="tableData" bordered :sort="defaultSort">
        <NmorphTableColumn
          prop="date"
          label="Date"
          width="180"
          alignment="left"
        />
        <NmorphTableColumn prop="name" label="Name" width="180" />
        <NmorphTableColumn prop="address" label="Address" />
        <NmorphTableColumn prop="operations" label="Operations">
          <template #default="{ scope }">
            <NmorphTableCell v-for="(row, idx) in scope.rows" :row="idx">
              <NmorphButton :text="`kill ${row.name}`" @click="testHandler" />
            </NmorphTableCell>
          </template>
        </NmorphTableColumn>
      </NmorphTable> -->
      <NmorphTable :data="attributesData" bordered :row-hover="false">
        <NmorphTableColumn prop="name" :label="$t('name')" alignment="left" />
        <NmorphTableColumn
          prop="description"
          :label="$t('description')"
          alignment="center"
        />
        <NmorphTableColumn prop="type" :label="$t('type')" alignment="center">
          <template #default="{ scope }">
            <NmorphTableCell
              v-for="(row, idx) in scope.rows"
              :key="idx"
              :row="idx"
            >
              <p v-html="row.type" />
            </NmorphTableCell>
          </template>
          <!-- <template #default="{ scope }">
            <p v-for="(row, idx) in scope.rows" :key="idx">{{ row.type }}</p>
          </template> -->
          <!-- <template #default="{ scope }">
            <NmorphTableCell v-for="(row, idx) in scope.rows" :row="idx">
              <p>{{ row.type }}</p>
            </NmorphTableCell>
          </template> -->
        </NmorphTableColumn>
        <NmorphTableColumn
          prop="default"
          :label="$t('default')"
          alignment="center"
        />
      </NmorphTable>
    </NmorphCard>
  </div>
</template>
<!-- njXP5T/tcN_-U2y -->
<script lang="ts" setup>
import { reactive } from "vue";
import {
  NmorphCard,
  NmorphTableColumn,
  NmorphTable,
  NmorphButton,
  NmorphTableCell,
  INmorphTableColumnProps,
} from "./../../../library/src/components";

const attributesData = [
  {
    name: "type",
    description: "asdf",
    type: "k",
    default: "button",
  },
  {
    name: "text",
    description: "Button text",
    type: "String | Number",
    default: "-",
  },
  {
    name: "loading",
    description: "Enable/Disable loader inside button",
    type: "Boolean",
    default: "false",
  },
  {
    name: "bg-transparent-on-hover",
    description: "Enable/Disable background color while hover",
    type: "Boolean",
    default: "true",
  },
  {
    name: "ripple",
    description: "Enable/Disable waves on click",
    type: "Boolean",
    default: "true",
  },
  {
    name: "fill",
    description: "Button fill container",
    type: "Boolean",
    default: "false",
  },
  {
    name: "disabled",
    description: "Disable the button",
    type: "Boolean",
    default: "false",
  },
  {
    name: "icon",
    description: "Set icon from icon list",
    type: `<a class="docs-enum" href="/components/icon">Icons</a>`,
    default: "-",
  },
];

const testHandler = () => {
  console.log("test");
};

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
