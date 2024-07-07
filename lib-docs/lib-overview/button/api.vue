<script setup lang="ts">
import { NmorphButtonType, NmorphButtonStyle } from "@nmorph/nmorph-ui-kit";
import ApiTable from "~/components/api-table/api-table.vue";
const { t } = useI18n();

const attributesData = [
  {
    name: "type",
    description: t("description"),
    type: Object.values(NmorphButtonType).join(", "),
    default: "button",
  },
  {
    name: "text",
    description: "Button text",
    type: "String | Number",
    default: "-",
  },
  {
    name: "loading",
    description: "Enable/Disable loader inside button",
    type: "Boolean",
    default: "false",
  },
  {
    name: "style-type",
    description: "Change button style",
    type: Object.values(NmorphButtonStyle).join(", "),
    default: "default",
  },
  {
    name: "bg-transparent-on-hover",
    description: "Enable/Disable background color while hover",
    type: "Boolean",
    default: "false",
  },
  {
    name: "ripple",
    description: "Enable/Disable waves on click",
    type: "Boolean",
    default: "true",
  },
  {
    name: "fill",
    description: "Button fill container",
    type: "Boolean",
    default: "false",
  },
  {
    name: "disabled",
    description: "Disable the button",
    type: "Boolean",
    default: "false",
  },
  // TODO
  // {
  //   name: "height",
  //   description: "Change button height",
  //   type: Object.values(NmorphComponentHeight).join(", "),
  //   default: "default",
  // },
];
const slotData = [
  {
    name: "default",
    description: "Customize button content",
  },
  {
    name: "append",
    description: "Append you custom content",
  },
];
</script>
<template>
  <div class="docs-api-table">
    <api-table name="Button" :attributes="attributesData" :slots="slotData" />
  </div>
</template>

<style lang="scss"></style>
