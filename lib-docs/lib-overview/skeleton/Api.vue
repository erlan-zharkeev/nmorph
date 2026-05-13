<script setup lang="ts">
import {
  type IAttributesTableData,
  type ISlotsTableData,
  type IVariablesTableData,
} from "~/types";
import ApiTable from "~/components/api-table/ApiTable.vue";
import { NmorphSkeletonItemPropsType } from "@nmorph/nmorph-ui-kit";

const attributesData: IAttributesTableData[] = [
  {
    name: "animated",
    type: "Boolean",
    default: "true",
  },
  {
    name: "loading",
    type: "Boolean",
    default: "true",
  },
  {
    name: "rows",
    type: "Number",
    default: "0",
  },
  {
    name: "loading-gradient",
    type: "String",
    default: "undefined",
  },
];

const itemAttributesData: IAttributesTableData[] = [
  {
    name: "variant",
    type: enumToString(NmorphSkeletonItemPropsType),
    default: "rect",
  },
  {
    name: "design",
    type: "nmorph, common",
    default: "nmorph",
  },
  {
    name: "width",
    type: docsLink(
      "Width",
      "https://developer.mozilla.org/ru/docs/Web/CSS/width"
    ),
    default: "auto",
  },
  {
    name: "height",
    type: docsLink(
      "Height",
      "https://developer.mozilla.org/ru/docs/Web/CSS/height"
    ),
    default: "auto",
  },
];

const slotData: ISlotsTableData[] = [{ name: "template" }, { name: "default" }];
const variables: IVariablesTableData[] = [{ name: "loading-gradient" }];
</script>

<template>
  <div class="docs-api-table">
    <api-table title="NmorphSkeleton" name="skeleton" :attributes="attributesData" :slots="slotData"
      :variables="variables" />
  </div>
  <NmorphDivider />
  <div class="docs-api-table">
    <api-table title="NmorphSkeletonItem" name="skeleton-item" :attributes="itemAttributesData"
      additional-id="skeleton-item" />
  </div>
</template>

<style scoped>
.docs-api-table {
  margin: 16px 0;
}
</style>
