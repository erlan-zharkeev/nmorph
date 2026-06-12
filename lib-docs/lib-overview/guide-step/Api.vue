<script setup lang="ts">
import {
  type IAttributesTableData,
  type ISlotsTableData,
} from "~/types";
import ApiTable from "~/components/api-table/ApiTable.vue";

const attributesData: IAttributesTableData[] = [
  {
    name: "name",
    type: "String | Number",
    required: true,
    default: "-",
    description: "Unique step name used to connect the wrapper to guide state.",
  },
  {
    name: "title",
    type: "String",
    default: "-",
    description:
      "Fallback title for this step when it is not supplied through NmorphGuide steps.",
  },
  {
    name: "text",
    type: "String",
    default: "-",
    description: "Fallback body text for this step.",
  },
  {
    name: "image-src",
    type: "String",
    default: "-",
    description: "Fallback image URL for the guide card.",
  },
  {
    name: "image-alt",
    type: "String",
    default: "-",
    description: "Alt text for the guide image.",
  },
  {
    name: "position",
    type: "top | bottom | right | left",
    default: "bottom",
    description: "Tooltip placement for this step.",
  },
  {
    name: "order",
    type: "Number",
    default: "undefined",
    description:
      "Fallback ordering when NmorphGuide steps does not define the order.",
  },
  {
    name: "disabled",
    type: "Boolean",
    default: "false",
    description:
      "Removes this wrapper from guide navigation while preserving the target slot.",
  },
];

const slots: ISlotsTableData[] = [
  {
    name: "default",
    description: "Target element that receives the active guide card.",
  },
  {
    name: "content",
    description:
      "Replaces the default guide card. Receives step, index, total, isFirst, isLast, back, next, close, and finish.",
  },
];
</script>

<template>
  <div class="docs-api-table">
    <api-table
      title="NmorphGuideStep"
      name="guide-step"
      :attributes="attributesData"
      :slots="slots"
    />
  </div>
</template>
