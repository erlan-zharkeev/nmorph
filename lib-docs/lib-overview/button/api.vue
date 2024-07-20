<script setup lang="ts">
import {
  NmorphButtonType,
  NmorphButtonStyle,
  NmorphComponentHeight,
  NmorphButtonShape,
} from "@nmorph/nmorph-ui-kit";
import ApiTable from "~/components/api-table/api-table.vue";

const attributesData = [
  {
    name: "type",
    type: Object.keys(NmorphButtonType).join(", "),
    default: "button",
  },
  {
    name: "text",
    type: "String | Number",
    default: "-",
  },
  {
    name: "loading",
    type: "Boolean",
    default: "false",
  },
  {
    name: "style-type",
    type: Object.keys(NmorphButtonStyle).join(", "),
    default: "default",
  },
  {
    name: "bg-transparent-on-hover",
    type: "Boolean",
    default: "true",
  },
  {
    name: "ripple",
    type: "Boolean",
    default: "true",
  },
  {
    name: "fill",
    type: "Boolean",
    default: "false",
  },
  {
    name: "disabled",
    type: "Boolean",
    default: "false",
  },
  {
    name: "shape",
    type: Object.keys(NmorphButtonShape).join(", "),
    default: "default",
  },
  {
    name: "height",
    type: Object.keys(NmorphComponentHeight).join(", "),
    default: "default",
  },
  {
    name: "icon",
    type: `<a class="docs-enum" href="/components/icon">Icons</a>`,
    default: "-",
  },
];

const slotData = [
  {
    name: "default",
  },
  {
    name: "append",
  },
];

const variables = [
  {
    name: "height",
    default: "30px",
  },
];
</script>

<template>
  <div class="docs-api-table">
    <api-table
      name="button"
      :attributes="attributesData"
      :slots="slotData"
      :variables="variables"
    />
  </div>
</template>
