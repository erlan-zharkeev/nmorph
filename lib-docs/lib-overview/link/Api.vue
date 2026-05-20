<script setup lang="ts">
import { NmorphColor, NmorphLinkTarget } from "@nmorph/nmorph-ui-kit";
import ApiTable from "~/components/api-table/ApiTable.vue";

const attributesData = [
  {
    name: "type",
    type: enumToString(NmorphColor),
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
    type: enumToString(NmorphLinkTarget),
    default: "self",
  },
  {
    name: "disabled",
    type: "Boolean",
    default: "false",
  },
  {
    name: "color",
    type: "String",
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
