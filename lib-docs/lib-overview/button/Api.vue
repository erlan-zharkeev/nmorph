<script setup lang="ts">
import {
  NmorphButtonType,
  NmorphButtonStyle,
  NmorphComponentHeight,
  NmorphButtonShape,
} from "@nmorph/nmorph-ui-kit";
import ApiTable from "~/components/api-table/ApiTable.vue";
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
    name: "color",
    type: "Color",
    default: "-",
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
    default: "basic",
  },
];

const slotData = [
  {
    name: "default",
  },
  {
    name: "icon",
  },
  {
    name: "append",
  },
  {
    name: "icon-only",
  },
];

const variables = [
  {
    name: "height",
    default: "30px",
  },
];

const exposes = [
  {
    name: "buttonDOMElement",
    type: `${docsLink(
      "HTMLElement",
      "https://developer.mozilla.org/ru/docs/Web/API/HTMLElement"
    )} | null`,
  },
];
</script>

<template>
  <div class="docs-api-table">
    <api-table title="NmorphButton" name="button" :attributes="attributesData" :slots="slotData" :variables="variables"
      :exposes="exposes" />
  </div>
</template>
