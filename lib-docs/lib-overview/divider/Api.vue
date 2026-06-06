<script setup lang="ts">
import {
  type IAttributesTableData,
  type ISlotsTableData,
  type IVariablesTableData,
} from "~/types";
import ApiTable from "~/components/api-table/ApiTable.vue";
import { NmorphElementDesign } from "@nmorph/nmorph-ui-kit";

const attributesData: IAttributesTableData[] = [
  {
    name: "direction",
    type: "vertical | horizontal",
    default: "horizontal",
  },
  {
    name: "design",
    type: optionsToString(NmorphElementDesign),
    default: "nmorph",
  },
];

const slotData: ISlotsTableData[] = [];
const variables: IVariablesTableData[] = [];
</script>

<template>
  <div class="docs-api-table">
    <api-table title="NmorphDivider" name="divider" :attributes="attributesData" :slots="slotData"
      :variables="variables" />
  </div>
</template>
