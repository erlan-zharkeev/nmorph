<script setup lang="ts">
import {
  type IAttributesTableData,
  type IEventsTableData,
  type ISlotsTableData,
  type IExposesTableData,
} from "~/types";
import ApiTable from "~/components/api-table/ApiTable.vue";

const guideAttributes: IAttributesTableData[] = [
  {
    name: "model-value",
    type: "Boolean",
    default: "false",
    description: "Controls whether the guide is currently visible.",
  },
  {
    name: "active-step",
    type: "String | Number",
    default: "undefined",
    description:
      "Controls the current step name when external step state is needed.",
  },
  {
    name: "steps",
    type: "INmorphGuideStepItem[]",
    default: "[]",
    description:
      "Shared step metadata and ordering. Each step is matched to a NmorphGuideStep by name.",
  },
  {
    name: "loop",
    type: "Boolean",
    default: "false",
    description:
      "Lets Back from the first step and Next from the last step wrap around instead of stopping.",
  },
  {
    name: "close-on-finish",
    type: "Boolean",
    default: "true",
    description: "Closes the guide when the last step is finished.",
  },
  {
    name: "show-close",
    type: "Boolean",
    default: "true",
    description: "Shows the close action inside the guide card.",
  },
  {
    name: "show-progress",
    type: "Boolean",
    default: "true",
    description: "Shows the current step index and total steps.",
  },
  {
    name: "bordered",
    type: "Boolean",
    default: "false",
    description:
      "Adds a visible border around the guide popup and hides the pointing triangle.",
  },
  {
    name: "back-text",
    type: "String",
    default: "Back",
    description: "Label for the Back button.",
  },
  {
    name: "next-text",
    type: "String",
    default: "Next",
    description: "Label for the Next button.",
  },
  {
    name: "finish-text",
    type: "String",
    default: "Finish",
    description: "Label for the last-step action.",
  },
  {
    name: "close-text",
    type: "String",
    default: "Close",
    description: "Label for the close action.",
  },
  {
    name: "z-index",
    type: "Number",
    default: "undefined",
    description: "Overrides the shared automatic z-index used by guide cards.",
  },
  {
    name: "teleport-to",
    type: "String | HTMLElement",
    default: "body",
    description:
      "Target used to teleport guide cards out of local layout stacking contexts.",
  },
  {
    name: "disabled-teleport",
    type: "Boolean",
    default: "false",
    description: "Renders guide cards inline instead of teleporting them.",
  },
  {
    name: "width",
    type: "Width",
    default: "undefined",
    description: "Guide card width forwarded to NmorphTooltip.",
  },
  {
    name: "max-width",
    type: "Max-width",
    default: "280px",
    description: "Guide card max width forwarded to NmorphTooltip.",
  },
];

const guideSlots: ISlotsTableData[] = [
  {
    name: "default",
    description:
      "Contains NmorphGuideStep wrappers and any surrounding layout.",
  },
];

const guideEvents: IEventsTableData[] = [
  {
    name: "update:model-value",
    type: "Boolean",
    description: "Emitted when guide visibility changes.",
  },
  {
    name: "update:active-step",
    type: "String | Number",
    description: "Emitted when the active step changes.",
  },
  {
    name: "change",
    type: "(step, index) => void",
    description: "Emitted after the active step changes.",
  },
  {
    name: "back",
    type: "(step, index) => void",
    description: "Emitted when the Back action is used.",
  },
  {
    name: "next",
    type: "(step, index) => void",
    description: "Emitted when the Next action is used.",
  },
  {
    name: "finish",
    type: "(step | null, index) => void",
    description: "Emitted when the guide finishes.",
  },
  {
    name: "close",
    type: "(step | null, index) => void",
    description: "Emitted when the guide closes.",
  },
];

const guideExposes: IExposesTableData[] = [
  {
    name: "back",
    type: "() => void",
    description: "Moves to the previous step.",
  },
  { name: "next", type: "() => void", description: "Moves to the next step." },
  { name: "finish", type: "() => void", description: "Finishes the guide." },
  { name: "close", type: "() => void", description: "Closes the guide." },
  {
    name: "goToStep",
    type: "(name: String | Number) => void",
    description: "Moves to a specific registered step.",
  },
];
</script>

<template>
  <div class="docs-api-table">
    <api-table
      title="NmorphGuide"
      name="guide"
      :attributes="guideAttributes"
      :slots="guideSlots"
      :events="guideEvents"
      :exposes="guideExposes"
    />
  </div>
</template>
