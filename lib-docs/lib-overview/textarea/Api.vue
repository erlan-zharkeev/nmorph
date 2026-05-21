<script setup lang="ts">
import type {
  IAttributesTableData,
  IEventsTableData,
  IExposesTableData,
} from "~/types";
import ApiTable from "~/components/api-table/ApiTable.vue";

const attributesData: IAttributesTableData[] = [
  {
    name: "model-value",
    type: "String",
    default: "''",
    description: "Current textarea value.",
  },
  {
    name: "placeholder",
    type: "String",
    default: "''",
    description: "Placeholder shown when the value is empty.",
  },
  {
    name: "rows",
    type: "Number",
    default: "3",
    description: "Default native textarea rows count.",
  },
  {
    name: "min-rows",
    type: "Number",
    default: "2",
    description: "Minimum row count used by auto sizing.",
  },
  {
    name: "max-rows",
    type: "Number",
    default: "-",
    description: "Maximum row count used by auto sizing.",
  },
  {
    name: "resize",
    type: "'none' | 'both' | 'horizontal' | 'vertical'",
    default: "vertical",
    description: "Native resize mode.",
  },
  {
    name: "auto-size",
    type: "Boolean",
    default: "false",
    description: "Automatically grows the field to fit its content.",
  },
  {
    name: "height",
    type: "'thick' | 'basic' | 'thin'",
    default: "basic",
    description: "Nmorph input height preset.",
  },
  {
    name: "disabled",
    type: "Boolean",
    default: "false",
    description: "Disables user input.",
  },
  {
    name: "textarea-attrs",
    type: "Record<string, string | number | boolean | undefined>",
    default: "{}",
    description: "Additional attributes passed to the native textarea.",
  },
];

const events: IEventsTableData[] = [
  { name: "update:model-value", type: "String", description: "Emitted when the value changes." },
  { name: "focus", type: "void", description: "Emitted on focus." },
  { name: "blur", type: "void", description: "Emitted on blur." },
  { name: "on-enter", type: "void", description: "Emitted on Enter keyup." },
  { name: "keydown", type: "KeyboardEvent", description: "Emitted on keydown." },
];

const exposes: IExposesTableData[] = [
  { name: "textareaDOMRef", type: "HTMLElement | null", description: "Native textarea element ref." },
  { name: "focus", type: "() => void", description: "Focuses the textarea." },
  { name: "blur", type: "() => void", description: "Blurs the textarea." },
  { name: "select", type: "() => void", description: "Selects the textarea text." },
  { name: "resizeToContent", type: "() => Promise<void>", description: "Recalculates auto-size height." },
];
</script>

<template>
  <div class="docs-api-table">
    <api-table title="NmorphTextarea" name="textarea" :attributes="attributesData" :events="events" :exposes="exposes" />
  </div>
</template>
