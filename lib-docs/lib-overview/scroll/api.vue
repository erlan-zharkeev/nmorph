<script setup lang="ts">
import {
  NmorphOverflowProp,
  NmorphScrollBehavior,
} from "@nmorph/nmorph-ui-kit";
import ApiTable from "~/components/api-table/api-table.vue";
import { a11yPropsApi } from "~/utils/a11yPropsApi";

const attributesData = [
  {
    name: "height",
    type: "String",
    default: "auto",
  },
  {
    name: "max-height",
    type: "String",
    default: "none",
  },
  {
    name: "model-value",
    type: "{ x: number, y: number }",
    default: "{ x: 0, y: 0 }",
  },
  {
    name: "scroll-y-prop",
    type: Object.keys(NmorphOverflowProp).join(", "),
    default: "auto",
  },
  {
    name: "scroll-x-prop",
    type: Object.keys(NmorphOverflowProp).join(", "),
    default: "auto",
  },
  {
    name: "css-scroll-behavior",
    type: Object.keys(NmorphScrollBehavior).join(", "),
    default: "smooth",
  },
  {
    name: "scroll-end-delay",
    type: "Number",
    default: "50",
  },
  {
    name: "update-only-on-scroll-end",
    type: "Boolean",
    default: "false",
  },
  {
    name: "y-bar-width-in-px",
    type: "Number",
    default: "6",
  },
  {
    name: "x-bar-width-in-px",
    type: "Number",
    default: "6",
  },
  {
    name: "y-gap-in-px",
    type: "Number",
    default: "4",
  },
  {
    name: "x-gap-in-px",
    type: "Number",
    default: "4",
  },
  ...a11yPropsApi,
];

const slotData = [
  {
    name: "default",
  },
];

const variables = [
  {
    name: "thumb-color",
    default: "var(--thumb-color)",
  },
];
</script>

<template>
  <div class="docs-api-table">
    <api-table
      name="scroll"
      :attributes="attributesData"
      :slots="slotData"
      :variables="variables"
    />
  </div>
</template>
