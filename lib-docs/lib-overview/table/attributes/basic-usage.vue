<script setup lang="ts">
import {
  NmorphTable,
  NmorphTableColumn,
  NmorphTableCell,
  NmorphButton,
} from "@nmorph/nmorph-ui-kit";

const scriptData = "";
const templateData = "";
const cssData = "";
const code = [scriptData, templateData, cssData];

interface ITableCell {
  date: string;
  name: string;
  address: string;
}

const data = ref<ITableCell[]>([
  {
    date: "2023-10-10",
    name: "Alice",
    address: "123 Maple Ave, New York",
  },
  {
    date: "2023-10-09",
    name: "Bob",
    address: "456 Elm St, Chicago",
  },
  {
    date: "2023-10-08",
    name: "Charlie",
    address: "789 Pine St, San Francisco",
  },
  {
    date: "2023-10-07",
    name: "Diana",
    address: "321 Oak St, Seattle",
  },
  {
    date: "2023-10-06",
    name: "Ethan",
    address: "654 Birch Rd, Austin",
  },
  {
    date: "2023-10-05",
    name: "Fiona",
    address: "987 Cedar Blvd, Miami",
  },
  {
    date: "2023-10-04",
    name: "George",
    address: "147 Spruce St, Denver",
  },
]);

const clickHandler = (data: ITableCell) => {
  alert(`My name is ${data.name}!`);
};

const sort = { date: "descending", name: "ascending" };
const bordered = ref(false);
const design = ref("nmorph");

const toggleDesignProp = () => {
  if (design.value === "nmorph") {
    bordered.value = true;
    design.value = "common";
  } else {
    bordered.value = false;
    design.value = "nmorph";
  }
};
</script>

<template>
  <div id="content-basic-usage">
    <attribute
      header="Basic usage"
      :subtitle="$t('overview.table.basic-usage.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="table-basic-usage-overview">
          <ClientOnly>
            <div class="actions">
              <div class="actions__element">
                <NmorphButton text="Toggle design" @click="toggleDesignProp" />
              </div>
              <div class="actions__element">
                <NmorphButton
                  text="Toggle highlight row on hover"
                  @click="toggleDesignProp"
                />
              </div>
            </div>
            <NmorphTable
              :data="data"
              :bordered="bordered"
              :design="design"
              :sort="sort"
            >
              <NmorphTableColumn
                prop="date"
                label="Date"
                alignment="start"
                width="100"
              />
              <NmorphTableColumn prop="name" label="Name" />
              <NmorphTableColumn prop="address" label="Address" />
              <NmorphTableColumn prop="operations" label="Operations">
                <template #default="{ scope }">
                  <NmorphTableCell
                    v-for="(cellData, idx) in scope.rows"
                    :row="idx"
                  >
                    <NmorphButton
                      :text="`click me!`"
                      fill
                      @click="clickHandler(cellData)"
                      style-type="transparent"
                    />
                  </NmorphTableCell>
                </template>
              </NmorphTableColumn>
            </NmorphTable>
          </ClientOnly>
        </div>
      </template>
      <template #code>
        <code-example v-if="templateData" lang="html">{{
          templateData
        }}</code-example>
        <code-example v-if="scriptData" lang="javascript">{{
          scriptData
        }}</code-example>
        <code-example v-if="cssData" lang="css">{{ cssData }}</code-example>
      </template>
    </attribute>
  </div>
</template>

<style lang="scss">
.table-basic-usage-overview {
  width: 100%;
  .actions {
    margin-bottom: 16px;
    display: flex;
  }
  .actions__element {
    margin-right: 8px;
  }
}
</style>
