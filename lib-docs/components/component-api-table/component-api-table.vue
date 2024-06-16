<script setup lang="ts">
import { NmorphTable, NmorphTableColumn } from "@nmorph/nmorph-ui-kit";

interface IAttributesTableData {
  name: string;
  description: string;
  type: string;
  default: string;
}

interface ISlotsTableData {
  name: string;
  description: string;
}

interface IProps {
  name: string;
  attributes: IAttributesTableData[];
  slots: ISlotsTableData[];
}
const props = withDefaults(defineProps<IProps>(), {});
</script>

<template>
  <div class="docs-api-table" id="content-api">
    <div class="docs-api-table__attributes" id="content-attributes">
      <h2 class="nmorph-title-1">{{ props.name }} Api</h2>
      <h3 class="docs-api-table__title nmorph-title-2">
        {{ props.name }} {{ $t("attributes") }}
      </h3>
      <NmorphTable :data="props.attributes" bordered :row-hover="false">
        <NmorphTableColumn prop="name" label="Name" alignment="start" />
        <NmorphTableColumn
          prop="description"
          label="Description"
          alignment="center"
        />
        <NmorphTableColumn prop="type" label="Type" alignment="center" />
        <NmorphTableColumn prop="default" label="Default" alignment="center" />
      </NmorphTable>
    </div>
    <div class="docs-api-table__slots" id="content-slots">
      <h3 class="docs-api-table__title nmorph-title-2">
        {{ props.name }} {{ $t("attributes") }}
      </h3>
      <NmorphTable :data="props.slots" bordered :row-hover="false">
        <NmorphTableColumn prop="name" label="Name" alignment="start" />
        <NmorphTableColumn
          prop="description"
          label="Description"
          alignment="center"
        />
      </NmorphTable>
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-button {
  margin: 0 8px;
}

.docs-api-table__title {
  margin-bottom: 8px;
}

.docs-api-table {
  margin-top: 24px;
  border-top: solid 1px var(--accent-color-00);
  padding-top: 8px;
}

.docs-api-table__slots {
  margin-top: 16px;
}
</style>
