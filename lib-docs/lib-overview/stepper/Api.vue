<script setup lang="ts">
import { type IAttributesTableData, type IEventsTableData, type ISlotsTableData, type IExposesTableData } from "~/types";
import ApiTable from "~/components/api-table/ApiTable.vue";

const stepperAttributes: IAttributesTableData[] = [
  {
    name: "model-value",
    type: "Number",
    default: "0",
    description: "Controlled active slide index.",
  },
  {
    name: "count",
    type: "Number",
    default: "0",
    description: "Total number of slides available for step navigation.",
  },
  {
    name: "disabled",
    type: "Boolean",
    default: "false",
    description: "Disables wheel, swipe, keyboard, and slot action navigation.",
  },
  {
    name: "loop",
    type: "Boolean",
    default: "false",
    description: "Wraps previous and next navigation at the first and last slide.",
  },
  {
    name: "wheel",
    type: "Boolean",
    default: "true",
    description: "Enables one-step mouse wheel navigation over the component.",
  },
  {
    name: "swipe",
    type: "Boolean",
    default: "true",
    description: "Enables one-step horizontal pointer and touch swipe navigation.",
  },
  {
    name: "aria-label",
    type: "String",
    default: "Stepper",
    description: "Accessible label for the stepper root.",
  },
];

const stepperSlots: ISlotsTableData[] = [
  {
    name: "default",
    description: "Slide content rendered inside the transform track. Each direct slide receives 100% width.",
  },
  {
    name: "indicator",
    description: "Optional controls slot. Receives index, count, goTo, next, and previous.",
  },
];

const stepperEvents: IEventsTableData[] = [
  {
    name: "update:model-value",
    type: "Number",
    description: "Emitted when the active slide index changes.",
  },
  {
    name: "change",
    type: "{ index: number; previousIndex: number; direction: 'previous' | 'next' }",
    description: "Emitted with navigation details after the active slide changes.",
  },
];

const stepperExposes: IExposesTableData[] = [
  { name: "goTo", type: "(index: Number) => void", description: "Moves to a specific slide." },
  { name: "next", type: "() => void", description: "Moves to the next slide." },
  { name: "previous", type: "() => void", description: "Moves to the previous slide." },
];
</script>

<template>
  <div class="docs-api-table">
    <api-table
      title="NmorphStepper"
      name="stepper"
      :attributes="stepperAttributes"
      :slots="stepperSlots"
      :events="stepperEvents"
      :exposes="stepperExposes"
    />
  </div>
</template>
