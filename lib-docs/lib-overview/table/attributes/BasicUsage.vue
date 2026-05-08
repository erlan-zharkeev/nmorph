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

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = `
<script lang="ts" setup>
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
    alert(\`My name is \${data.name}!\`);
  };

  const sort = ref<NmorphTableSortType>({ date: "descending", name: "ascending" });
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
    return highlightRowOnHover.value
      ? "Disable row highlight"
      : "Enable row highlight";
  });
<\/script>
`;

const templateData = `
<template>
  <div class="table-basic-usage-overview">
    <div class="actions">
      <div class="actions__element">
        <NmorphButton text="Toggle design" @click="toggleDesignProp" />
      </div>
      <div class="actions__element">
        <NmorphButton
          :text="highlightRowOnHoverText"
          @click="toggleHighlightRow"
        />
      </div>
      <div class="actions__element">
        <p>Sort values: {{ sort }}</p>
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
          <NmorphTableCell
            v-for="(cellData, idx) in scope.rows"
            :row="idx"
          >
            <NmorphButton
              text="click me!"
              fill
              @click="clickHandler(cellData)"
              style-type="transparent"
            />
          </NmorphTableCell>
        </template>
      </NmorphTableColumn>
    </NmorphTable>
  </div>
</template>
`;

const cssData = `
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
`;
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

const clickHandler = (data: NmorphDataTableElRecordType) => {
  alert(`My name is ${data.name}!`);
};

const sort = ref<NmorphTableSortType>({ date: "descending", name: "ascending" });
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
  <div id="content-basic-usage">
    <Attribute :header="$t('overview.basic-usage')" :subtitle="$t('overview.table.basic-usage.subtitle')"
      :codeToCopy="code" info-name="table.basic-usage" info-type="warning">
      <template #overview>
        <div class="table-basic-usage-overview">
          <ClientOnly>
            <div class="actions">
              <div class="actions__element">
                <NmorphButton text="Toggle design" @click="toggleDesignProp" />
              </div>
              <div class="actions__element">
                <NmorphButton :text="$t(highlightRowOnHoverText)" @click="toggleHighlightRow" />
              </div>
              <div class="actions__element">
                <p>{{ $t("overview.sort-values") }} {{ sort }}</p>
              </div>
            </div>
            <NmorphTable :data="data" :bordered="bordered" :row-hover="highlightRowOnHover" :design="design"
              :sort="sort">
              <NmorphTableColumn prop="date" label="Date" alignment="left" width="100" />
              <NmorphTableColumn prop="name" label="Name" />
              <NmorphTableColumn prop="address" label="Address" />
              <NmorphTableColumn prop="operations" label="Operations">
                <template #default="{ scope }">
                  <NmorphTableCell v-for="(cellData, idx) in scope.rows" :row="idx">
                    <NmorphButton :text="$t(clickMeText)" fill @click="clickHandler(cellData)"
                      style-type="transparent" />
                  </NmorphTableCell>
                </template>
              </NmorphTableColumn>
            </NmorphTable>
          </ClientOnly>
        </div>
      </template>
      <template #code>
        <code-slot-data :template-data="templateData" :script-data="scriptData" :css-data="cssData" />
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
    align-items: center;
    flex-wrap: wrap;
  }

  .actions__element {
    margin-right: 8px;
    margin-bottom: 8px;
  }
}
</style>
