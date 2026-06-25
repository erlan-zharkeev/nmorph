<script setup lang="ts">
import {
  NmorphTextAlign,
  NmorphTypographyColor,
  NmorphTypographyVariant,
  NmorphTypographyWeight,
} from "@nmorph/nmorph-ui-kit";
import ApiTable from "~/components/api-table/ApiTable.vue";
import type { IAttributesTableData, ISlotsTableData } from "~/types";

const attributesData: IAttributesTableData[] = [
  {
    name: "as",
    type: `"span" | "p" | "div" | "label" | "strong" | "em" | "small" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"`,
    default: "span",
    description: "HTML tag used for the rendered text element.",
  },
  {
    name: "text",
    type: "String | Number",
    default: "undefined",
    description: "Text content used when the default slot is not provided.",
  },
  {
    name: "variant",
    type: optionsToString(NmorphTypographyVariant),
    default: "body",
    description: "Typography role that controls font size, line height, and default weight.",
  },
  {
    name: "weight",
    type: optionsToString(NmorphTypographyWeight),
    default: "undefined",
    description: "Optional font weight override.",
  },
  {
    name: "color",
    type: `${optionsToString(NmorphTypographyColor)} | CSS color`,
    default: "text",
    description: "Theme text color role or any CSS color value.",
  },
  {
    name: "align",
    type: optionsToString(NmorphTextAlign),
    default: "inherit",
    description: "Text alignment.",
  },
  {
    name: "selectable",
    type: "Boolean",
    default: "true",
    description: "Controls whether users can select the text.",
  },
  {
    name: "italic",
    type: "Boolean",
    default: "false",
    description: "Applies italic font style.",
  },
  {
    name: "no-line-height",
    type: "Boolean",
    default: "false",
    description: "Sets line-height to 0 for compact inline/icon layout cases.",
  },
  {
    name: "truncate",
    type: "Boolean",
    default: "false",
    description: "Truncates text to one line with ellipsis.",
  },
  {
    name: "nowrap",
    type: "Boolean",
    default: "false",
    description: "Prevents text wrapping.",
  },
  {
    name: "line-clamp",
    type: "Number",
    default: "undefined",
    description: "Clamps text to the provided number of lines.",
  },
];

const slotData: ISlotsTableData[] = [
  {
    name: "default",
    description: "Text content.",
  },
];
</script>

<template>
  <div class="docs-api-table">
    <api-table title="NmorphText" name="text" :attributes="attributesData" :slots="slotData" />
  </div>
</template>
