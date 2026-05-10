<script setup lang="ts">
import {
  NmorphTable,
  NmorphTableColumn,
  NmorphTableCell,
  NmorphButton,
  type NmorphElementDesignType,
  type NmorphTableSortType,
  type NmorphDataTableElRecordType,
} from "@nmorph/nmorph-ui-kit";

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

const clickHandler = (data: NmorphDataTableElRecordType) => {
  alert(`My name is ${data.name}!`);
};

const sort = ref<NmorphTableSortType>({
  date: "descending",
  name: "ascending",
});
const bordered = ref(false);
const design = ref<NmorphElementDesignType>("nmorph");
const highlightRowOnHover = ref(false);

const toggleDesignProp = () => {
  if (design.value === "nmorph") {
    bordered.value = true;
    design.value = "common";
  } else {
    bordered.value = false;
    design.value = "nmorph";
  }
};

const toggleHighlightRow = () => {
  highlightRowOnHover.value = !highlightRowOnHover.value;
};

const highlightRowOnHoverText = computed(() => {
  const translateKey = highlightRowOnHover.value
    ? "disable-row-highlight"
    : "enable-row-highlight";

  return `overview.table.basic-usage.${translateKey}`;
});

const clickMeText = `overview.table.basic-usage.click-me-text`;
</script>

<template>
  <div class="table-basic-usage-overview">
    <ClientOnly>
      <div class="actions">
        <div class="actions__element">
          <NmorphButton text="Toggle design" @click="toggleDesignProp" />
        </div>
        <div class="actions__element">
          <NmorphButton
            :text="$t(highlightRowOnHoverText)"
            @click="toggleHighlightRow"
          />
        </div>
        <div class="actions__element">
          <p>{{ $t("overview.sort-values") }} {{ sort }}</p>
        </div>
      </div>
      <NmorphTable
        :data="data"
        :bordered="bordered"
        :row-hover="highlightRowOnHover"
        :design="design"
        :sort="sort"
      >
        <NmorphTableColumn
          prop="date"
          label="Date"
          alignment="left"
          width="100"
        />
        <NmorphTableColumn prop="name" label="Name" />
        <NmorphTableColumn prop="address" label="Address" />
        <NmorphTableColumn prop="operations" label="Operations">
          <template #default="{ scope }">
            <NmorphTableCell v-for="(cellData, idx) in scope.rows" :row="idx">
              <NmorphButton
                :text="$t(clickMeText)"
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

<style lang="scss">
.table-basic-usage-overview {
  width: 100%;

  .actions {
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .actions__element {
    margin-right: 8px;
    margin-bottom: 8px;
  }
}
</style>
