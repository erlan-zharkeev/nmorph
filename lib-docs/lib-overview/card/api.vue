<script setup lang="ts">
import {
  type IAttributesTableData,
  type ISlotsTableData,
  type IVariablesTableData,
} from "~/types";
import ApiTable from "~/components/api-table/api-table.vue";
import { NmorphShadowType } from "@nmorph/nmorph-ui-kit";

const attributesData: IAttributesTableData[] = [
  {
    name: "shadow-type",
    type: enumToString(NmorphShadowType),
    default: "outset",
  },
];

const slotData: ISlotsTableData[] = [{ name: "header" }, { name: "footer" }];

const variables: IVariablesTableData[] = [{ name: "card-padding" }];
</script>

<template>
  <div class="docs-api-table">
    <api-table
      name="card"
      :attributes="attributesData"
      :slots="slotData"
      :variables="variables"
    />
  </div>
</template>
