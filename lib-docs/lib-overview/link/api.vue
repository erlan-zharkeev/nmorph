<script setup lang="ts">
import { NmorphColor, NmorphLinkTarget } from "@nmorph/nmorph-ui-kit";
import ApiTable from "~/components/api-table/api-table.vue";

const attributesData = [
  {
    name: "type",
    type: Object.keys(NmorphColor).join(", "),
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
    name: "icon-name",
    type: `<a class="docs-enum" href="/components/icon">Icons</a>`,
    default: "-",
  },
  {
    name: "target",
    type: Object.keys(NmorphLinkTarget).join(", "),
    default: "self",
  },
  {
    name: "disabled",
    type: "Boolean",
    default: "false",
  },
];

const slotData = [
  {
    name: "prepend",
  },
  {
    name: "default",
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
      name="link"
      :attributes="attributesData"
      :slots="slotData"
      :variables="variables"
    />
  </div>
</template>
