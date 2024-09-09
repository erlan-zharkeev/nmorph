<script setup lang="ts">
import {
  type IAttributesTableData,
  type ISlotsTableData,
  type IVariablesTableData,
} from "~/types";
import ApiTable from "~/components/api-table/api-table.vue";
import { AvatarShapeType } from "@nmorph/nmorph-ui-kit";

const attributesData: IAttributesTableData[] = [
  {
    name: "size",
    type: "Number",
    default: "40",
  },
  {
    name: "shape",
    type: enumToString(AvatarShapeType),
    default: "circle",
  },
  {
    name: "src",
    type: "String",
    default: "-",
  },
  {
    name: "src-set",
    type: "String",
    default: "-",
  },
  {
    name: "alt",
    type: "String",
    default: "-",
  },
  {
    name: "fit",
    type: `<a class="docs-enum" target="_blank" href="https://developer.mozilla.org/ru/docs/Web/CSS/object-fit">object-fit</a>`,
    default: "cover",
  },
];

[];

const slotData: ISlotsTableData[] = [
  {
    name: "error",
  },
];

const variables: IVariablesTableData[] = [];
</script>

<template>
  <div class="docs-api-table">
    <api-table
      name="avatar"
      :attributes="attributesData"
      :slots="slotData"
      :variables="variables"
    />
  </div>
</template>
