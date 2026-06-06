<script setup lang="ts">
import {
  type IAttributesTableData,
  type IVariablesTableData,
} from "~/types";
import ApiTable from "~/components/api-table/ApiTable.vue";

const attributesData: IAttributesTableData[] = [
  {
    name: "value",
    type: "Number",
    default: "undefined",
    description: "Normalized level between 0 and 1.",
  },
  {
    name: "volume-db",
    type: "Number",
    default: "undefined",
    description: "Volume level in decibels. Used when value is not provided.",
  },
  {
    name: "variant",
    type: "'bars' | 'line' | 'ring'",
    default: "bars",
    description: "Visual meter variant.",
  },
  {
    name: "bars",
    type: "Number",
    default: "12",
    description: "Number of bars rendered by the bars variant.",
  },
  {
    name: "warn-threshold",
    type: "Number",
    default: "0.7",
    description: "Level where the warning color starts.",
  },
  {
    name: "error-threshold",
    type: "Number",
    default: "0.9",
    description: "Level where the error color starts.",
  },
  {
    name: "label",
    type: "String",
    default: "Audio level",
    description: "Accessible label for the meter.",
  },
  {
    name: "color",
    type: "Color",
    default: "undefined",
    description: "Normal level color.",
  },
  {
    name: "warn-color",
    type: "Color",
    default: "undefined",
    description: "Color used at warn-threshold.",
  },
  {
    name: "error-color",
    type: "Color",
    default: "undefined",
    description: "Color used at error-threshold.",
  },
  {
    name: "track-color",
    type: "Color",
    default: "undefined",
    description: "Track color for line and ring variants.",
  },
];

const variables: IVariablesTableData[] = [
  {
    name: "nmorph-private-audio-meter-percent",
    description: "Resolved level percentage used by line and ring variants.",
  },
  {
    name: "nmorph-private-audio-meter-color",
    description: "Resolved active meter color.",
  },
  {
    name: "nmorph-private-audio-meter-warn-color",
    description: "Warning color used after warn-threshold.",
  },
  {
    name: "nmorph-private-audio-meter-error-color",
    description: "Error color used after error-threshold.",
  },
  {
    name: "nmorph-private-audio-meter-track-color",
    description: "Inactive track color for line and ring variants.",
  },
];
</script>

<template>
  <div class="docs-api-table">
    <api-table title="NmorphAudioMeter" name="audio-meter" :attributes="attributesData" :variables="variables" />
  </div>
</template>
