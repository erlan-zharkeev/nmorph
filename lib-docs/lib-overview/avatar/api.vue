<script setup lang="ts">
import {
  type IAttributesTableData,
  type ISlotsTableData,
  type IVariablesTableData,
} from "~/types";
import ApiTable from "~/components/api-table/api-table.vue";
import { AvatarShapeType } from "@nmorph/nmorph-ui-kit";

const attributesData: IAttributesTableData[] = [
  {
    name: "src",
    type: "String",
    default: "-",
    required: true,
  },
  {
    name: "size",
    type: "Number",
    default: "40",
  },
  {
    name: "shape",
    type: enumToString(AvatarShapeType),
    default: "circle",
  },
  {
    name: "frame-border",
    type: "Number",
    default: "2",
  },
  {
    name: "image-padding",
    type: "Number",
    default: "4",
  },
  {
    name: "src-set",
    type: "String",
    default: "-",
  },
  {
    name: "alt",
    type: "String",
    default: "-",
  },
  {
    name: "fit",
    type: docsLink(
      "Object-fit",
      "https://developer.mozilla.org/ru/docs/Web/CSS/object-fit"
    ),
    default: "cover",
  },
];

[];

const slotData: ISlotsTableData[] = [
  {
    name: "error",
  },
];

const variables: IVariablesTableData[] = [];

const events = [
  {
    name: "error",
    type: docsLink(
      "Event",
      "https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event"
    ),
  },
  {
    name: "load",
    type: docsLink(
      "Event",
      "https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event"
    ),
  },
];
</script>

<template>
  <div class="docs-api-table">
    <api-table
      title="NmorphAvatar"
      name="avatar"
      :attributes="attributesData"
      :slots="slotData"
      :variables="variables"
      :events="events"
    />
  </div>
</template>
