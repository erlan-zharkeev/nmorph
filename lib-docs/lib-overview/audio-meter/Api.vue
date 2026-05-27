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
  },
  {
    name: "volume-db",
    type: "Number",
    default: "undefined",
  },
  {
    name: "variant",
    type: "'bars' | 'line' | 'ring'",
    default: "bars",
  },
  {
    name: "bars",
    type: "Number",
    default: "12",
  },
  {
    name: "warn-threshold",
    type: "Number",
    default: "0.7",
  },
  {
    name: "error-threshold",
    type: "Number",
    default: "0.9",
  },
  {
    name: "label",
    type: "String",
    default: "Audio level",
  },
];

const variables: IVariablesTableData[] = [
  { name: "nmorph-audio-meter-level" },
  { name: "nmorph-audio-meter-percent" },
];
</script>

<template>
  <div class="docs-api-table">
    <api-table title="NmorphAudioMeter" name="audio-meter" :attributes="attributesData" :variables="variables" />
  </div>
</template>
