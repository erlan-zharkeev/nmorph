<script setup lang="ts">
import type {
  IAttributesTableData,
  IEventsTableData,
  ISlotsTableData,
} from "~/types";
import ApiTable from "~/components/api-table/ApiTable.vue";

const attributesData: IAttributesTableData[] = [
  { name: "model-value", type: "Boolean", default: "false", description: "Controls drawer visibility." },
  { name: "title", type: "String", default: "''", description: "Header title and dialog aria label." },
  { name: "placement", type: "'left' | 'right' | 'top' | 'bottom'", default: "right", description: "Side where the drawer appears." },
  { name: "size", type: "Number | String", default: "360px", description: "Width for side drawers or height for top/bottom drawers." },
  { name: "show-close", type: "Boolean", default: "true", description: "Shows the close button in the default header." },
  { name: "close-on-overlay", type: "Boolean", default: "true", description: "Closes the drawer after overlay click." },
  { name: "close-on-escape", type: "Boolean", default: "true", description: "Closes the drawer after Escape keydown." },
  { name: "z-index", type: "Number", default: "auto", description: "Overrides the shared automatic z-index." },
  { name: "teleport-to", type: "String | HTMLElement", default: "body", description: "Overlay teleport target." },
  { name: "disabled-teleport", type: "Boolean", default: "false", description: "Renders the overlay in place." },
  { name: "content-class", type: "String", default: "''", description: "Additional class for the content area." },
];

const slotData: ISlotsTableData[] = [
  { name: "default", description: "Drawer body content." },
  { name: "header", description: "Custom header content." },
  { name: "footer", description: "Optional footer content." },
];

const events: IEventsTableData[] = [
  { name: "on-close", type: "void", description: "Emitted before the drawer updates model-value to false." },
  { name: "update:model-value", type: "Boolean", description: "Emitted when visibility changes." },
];
</script>

<template>
  <div class="docs-api-table">
    <api-table title="NmorphDrawer" name="drawer" :attributes="attributesData" :slots="slotData" :events="events" />
  </div>
</template>
