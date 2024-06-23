<script setup lang="ts">
import { NmorphIconSize } from "@nmorph/nmorph-ui-kit";

const attributesData = [
  {
    name: "size",
    description: "Set native button type",
    type: Object.values(NmorphIconSize).join(", "),
    default: "small",
  },
  {
    name: "width",
    description: "Button text",
    type: "String(css value)",
    default: "-",
  },
  {
    name: "height",
    description: "Enable/Disable loader inside button",
    type: "String(css value)",
    default: "-",
  },
];
const slotData = [
  {
    name: "default",
    description: "Customize button content",
  },
];
</script>
<template>
  <div class="docs-button-api-table">
    <api name="Icon" :attributes="attributesData" :slots="slotData" />
  </div>
</template>

<style lang="scss"></style>
