<script setup lang="ts">
import { NmorphIconSize } from "@nmorph/nmorph-ui-kit";
import ApiTable from "~/components/api-table/ApiTable.vue";

const attributesData = [
  {
    name: "icon",
    type: docsLink("Icons", "/elements/icon#content-icon-list", "_self"),
    default: "-",
  },
  {
    name: "size",
    type: enumToString(NmorphIconSize),
    default: "small",
  },
  {
    name: "width",
    type: docsLink(
      "Width",
      "https://developer.mozilla.org/ru/docs/Web/CSS/width",
    ),
    default: "-",
  },
  {
    name: "height",
    type: docsLink(
      "Height",
      "https://developer.mozilla.org/ru/docs/Web/CSS/height",
    ),
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
      title="NmorphIcon"
      name="icon"
      :variables="variablesData"
      :attributes="attributesData"
      :slots="slotData"
    />
  </div>
</template>
