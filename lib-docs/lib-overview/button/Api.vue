<script setup lang="ts">
import {
  NmorphButtonType,
  NmorphComponentThickness,
  NmorphButtonShape,
  NmorphElementDesign,
} from "@nmorph/nmorph-ui-kit";
import ApiTable from "~/components/api-table/ApiTable.vue";
import { optionsToString } from "~/utils";

const attributesData = [
  {
    name: "type",
    type: optionsToString(NmorphButtonType),
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
    name: "toggle",
    type: "Boolean",
    default: "false",
  },
  {
    name: "model-value",
    type: "Boolean",
    default: "-",
  },
  {
    name: "active",
    type: "Boolean",
    default: "false",
  },
  {
    name: "danger",
    type: "Boolean",
    default: "false",
  },
  {
    name: "design",
    type: optionsToString(NmorphElementDesign),
    default: "nmorph",
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
    type: optionsToString(NmorphButtonShape),
    default: "default",
  },
  {
    name: "thickness",
    type: optionsToString(NmorphComponentThickness),
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
    name: "nmorph-private-control-height",
    default: "based on thickness",
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

const events = [{ name: "update:model-value", type: "Boolean" }];
</script>

<template>
  <div class="docs-api-table">
    <api-table title="NmorphButton" name="button" :attributes="attributesData" :slots="slotData" :variables="variables"
      :exposes="exposes" :events="events" />
  </div>
</template>
