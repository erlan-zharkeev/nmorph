<script setup lang="ts">
import { NmorphIconSize } from "@nmorph/nmorph-ui-kit";
import ApiTable from "~/components/api-table/api-table.vue";

const attributesData = [
  {
    name: "icon",
    type: `<a class="docs-enum" href="/components/icon">Icons</a>`,
    default: "-",
  },
  {
    name: "size",
    type: enumToString(NmorphIconSize),
    default: "small",
  },
  {
    name: "width",
    type: "String(css value)",
    default: "-",
  },
  {
    name: "height",
    type: "String(css value)",
    default: "-",
  },
  {
    name: "color",
    type: "String(css value/css variable)",
    default: "-",
  },
];

const slotData = [
  {
    name: "default",
  },
];

const variablesData = [
  {
    name: "color",
  },
];
</script>
<template>
  <div class="docs-api-table">
    <api-table
      name="icon"
      :variables="variablesData"
      :attributes="attributesData"
      :slots="slotData"
    />
  </div>
</template>
