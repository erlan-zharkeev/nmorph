<script setup lang="ts">
import { type IAttributesTableData, type ISlotsTableData } from "~/types";
import ApiTable from "~/components/api-table/api-table.vue";
import { NmorphDivider } from "@nmorph/nmorph-ui-kit";

const tabsAttributesData: IAttributesTableData[] = [
  {
    name: "model-value",
    type: "String | Number",
    default: "0",
  },
  {
    name: "stretch",
    type: "Boolean",
    default: "false",
  },
  {
    name: "panes",
    type: `Array<${docsLink(
      "INmorphTabPaneProps",
      "/components/tabs#content-tab-pane-attributes",
      "_self"
    )}>`,
    default: "[]",
  },
];
const tabsSlotData: ISlotsTableData[] = [{ name: "default" }];
const tabsEvents = [
  { name: "update:model-value", type: "(value: String | Number) => void" },
  { name: "tab-change", type: "String | Number" },
];

const tabAttributesData: IAttributesTableData[] = [
  {
    name: "label",
    type: "String",
    default: "-",
  },
  {
    name: "name",
    type: "String",
    default: "-",
    required: true,
  },
  {
    name: "disabled",
    type: "Boolean",
    default: "false",
  },
];
const tabSlotData: ISlotsTableData[] = [{ name: "default" }, { name: "label" }];
</script>

<template>
  <div class="docs-api-table">
    <api-table
      title="NmorphTabs"
      name="tabs"
      :attributes="tabsAttributesData"
      :slots="tabsSlotData"
      :events="tabsEvents"
    />
    <NmorphDivider />
    <div class="docs-api-table">
      <api-table
        title="NmorphTabPane"
        name="tab-pane"
        :attributes="tabAttributesData"
        additional-id="tab-pane"
        :slots="tabSlotData"
      />
    </div>
  </div>
</template>

<style scoped>
.docs-api-table {
  margin: 16px 0;
}
</style>
