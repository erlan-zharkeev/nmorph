<script setup lang="ts">
import { NmorphColor, NmorphLinkTarget } from "@nmorph/nmorph-ui-kit";
import ApiTable from "~/components/api-table/ApiTable.vue";

const attributesData = [
  {
    name: "type",
    type: optionsToString(NmorphColor),
    default: "accent",
  },
  {
    name: "href",
    type: "String",
    default: "-",
  },
  {
    name: "underline",
    type: "Boolean",
    default: "false",
  },
  {
    name: "target",
    type: optionsToString(NmorphLinkTarget),
    default: "self",
  },
  {
    name: "rel",
    type: "String",
    default: "undefined",
  },
  {
    name: "referrerpolicy",
    type: "String",
    default: "undefined",
  },
  {
    name: "download",
    type: "String | Boolean",
    default: "undefined",
  },
  {
    name: "aria-label",
    type: "String",
    default: "undefined",
  },
  {
    name: "title",
    type: "String",
    default: "undefined",
  },
  {
    name: "disabled",
    type: "Boolean",
    default: "false",
  },
  {
    name: "color",
    type: "Color",
    default: "undefined",
  },
  {
    name: "icon-name",
    type: "String",
    default: "undefined",
  },
];

const slotData = [
  {
    name: "prepend",
  },
  {
    name: "default",
  },
  {
    name: "icon",
  },
];

const variables = [
  {
    name: "link-color",
    default: "var(--nmorph-accent-color)",
  },
];
</script>

<template>
  <div class="docs-api-table">
    <api-table
      title="NmorphLink"
      name="link"
      :attributes="attributesData"
      :slots="slotData"
      :variables="variables"
    />
  </div>
</template>
