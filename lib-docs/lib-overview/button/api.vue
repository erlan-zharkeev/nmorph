<script setup lang="ts">
import {
  NmorphButtonType,
  NmorphButtonStyle,
  NmorphComponentHeight,
  NmorphButtonShape,
} from "@nmorph/nmorph-ui-kit";
import ApiTable from "~/components/api-table/api-table.vue";
import { enumToString } from "~/utils";

const attributesData = [
  {
    name: "type",
    type: enumToString(NmorphButtonType),
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
    type: enumToString(NmorphButtonStyle),
    default: "default",
  },
  {
    name: "accent-bg-on-hover",
    type: "Boolean",
    default: "false",
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
    type: enumToString(NmorphButtonShape),
    default: "default",
  },
  {
    name: "height",
    type: enumToString(NmorphComponentHeight),
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
