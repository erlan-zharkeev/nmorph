<script setup lang="ts">
import { type IAttributesTableData, type ISlotsTableData } from "~/types";
import ApiTable from "~/components/api-table/api-table.vue";
import { NmorphComponentHeight, NmorphDivider } from "@nmorph/nmorph-ui-kit";

const attributesData: IAttributesTableData[] = [
  {
    name: "value",
    type: "Record<string, { value: string | string[] | number; rules: NmorphRulesType }>",
    default: "-",
    required: true,
  },
  {
    name: "validate-immediately",
    type: "Boolean",
    default: "false",
  },
];

const slotData: ISlotsTableData[] = [{ name: "default" }];
const events = [
  {
    name: "form-validator",
    type: "{ fields: Record<string, { touched: Ref<boolean, boolean>; valid: ComputedRef<boolean>; errors: Ref<string[], string[]>; validate: () => any;}>; }",
  },
];

const attributesDataFormItem: IAttributesTableData[] = [
  {
    name: "id",
    type: "String",
    default: "-",
    required: true,
  },
  {
    name: "height",
    type: enumToString(NmorphComponentHeight),
    default: "default",
  },
  {
    name: "label",
    type: "String",
    default: "-",
  },
  {
    name: "show-validation-icon",
    type: "Boolean",
    default: "true",
  },
  {
    name: "static-error-box-space",
    type: "Boolean",
    default: "false",
  },
  {
    name: "validate",
    type: "Boolean",
    default: "true",
  },
];
const slotDataFormItem: ISlotsTableData[] = [{ name: "default" }];
</script>

<template>
  <div class="docs-api-table">
    <api-table
      title="NmorphForm"
      name="form"
      :attributes="attributesData"
      :slots="slotData"
      :events="events"
    />
  </div>
  <NmorphDivider />
  <div class="docs-api-table">
    <api-table
      title="NmorphFormItem"
      name="form-item"
      :attributes="attributesDataFormItem"
      :slots="slotDataFormItem"
    />
  </div>
</template>

<style scoped>
.docs-api-table {
  margin: 16px 0;
}
</style>
