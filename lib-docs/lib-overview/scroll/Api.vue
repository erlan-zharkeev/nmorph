<script setup lang="ts">
import {
  NmorphOverflowProp,
  NmorphScrollBehavior,
} from "@nmorph/nmorph-ui-kit";
import ApiTable from "~/components/api-table/ApiTable.vue";

const attributesData = [
  {
    name: "height",
    type: "Height",
    default: "100%",
  },
  {
    name: "max-height",
    type: "Max-height",
    default: "none",
  },
  {
    name: "model-value",
    type: "{ x: Number, y: Number }",
    default: "{ x: 0, y: 0 }",
  },
  {
    name: "scroll-y-prop",
    type: enumToString(NmorphOverflowProp),
    default: "auto",
  },
  {
    name: "scroll-x-prop",
    type: enumToString(NmorphOverflowProp),
    default: "auto",
  },
  {
    name: "css-scroll-behavior",
    type: enumToString(NmorphScrollBehavior),
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
    default: "0",
  },
  {
    name: "x-gap-in-px",
    type: "Number",
    default: "0",
  },
];

const slotData = [
  {
    name: "default",
  },
];

const variables = [
  {
    name: "thumb-color",
    default: "var(--nmorph-scroll-thumb-color, var(--nmorph-text-color))",
  },
];

const exposes = [
  {
    name: "scrollDOMContainer",
    type: `${docsLink(
      "HTMLElement",
      "https://developer.mozilla.org/ru/docs/Web/API/HTMLElement"
    )} | null`,
  },
  {
    name: "moveTo",
    type: "({ x: Number, y: Number }) => void",
  },
];

const events = [
  {
    name: "update:model-value",
    type: "{ x: Number, y: Number }",
  },
  {
    name: "on-scroll-end",
    type: "void",
  },
  {
    name: "on-scroll",
    type: docsLink(
      "Event",
      "https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event"
    ),
  },
];
</script>

<template>
  <div class="docs-api-table">
    <api-table title="NmorphScroll" name="scroll" :attributes="attributesData" :slots="slotData" :variables="variables"
      :exposes="exposes" :events="events" />
  </div>
</template>
