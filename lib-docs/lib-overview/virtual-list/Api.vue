<script setup lang="ts">
import type {
  IAttributesTableData,
  IEventsTableData,
  IExposesTableData,
  ISlotsTableData,
} from "~/types";
import ApiTable from "~/components/api-table/ApiTable.vue";

const attributesData: IAttributesTableData[] = [
  { name: "items", type: "unknown[]", default: "[]", description: "Items rendered by the virtual list." },
  { name: "height", type: "Number | String", default: "320px", description: "Scroll viewport height." },
  { name: "max-height", type: "Number | String", default: "none", description: "Maximum scroll viewport height." },
  { name: "item-height", type: "Number", default: "40", description: "Estimated or fixed item height in pixels." },
  { name: "overscan", type: "Number", default: "5", description: "Extra items rendered before and after the viewport." },
  { name: "dynamic", type: "Boolean", default: "false", description: "Measures item heights dynamically." },
  { name: "disabled", type: "Boolean", default: "false", description: "Disables virtualization and renders all items." },
  { name: "item-key", type: "String | Function", default: "-", description: "Field name or function used as item key." },
  { name: "item-tag", type: "String", default: "div", description: "HTML tag used for each rendered item wrapper." },
];

const slotData: ISlotsTableData[] = [
  { name: "default", description: "Item slot. Receives item and index." },
  { name: "empty", description: "Empty state slot." },
];

const events: IEventsTableData[] = [
  { name: "on-scroll", type: "Event", description: "Emitted when the viewport scrolls." },
];

const exposes: IExposesTableData[] = [
  { name: "containerRef", type: "HTMLElement | null", description: "Scroll viewport element ref." },
  { name: "refresh", type: "() => void", description: "Refreshes viewport measurements." },
  { name: "scrollToIndex", type: "(index: number) => void", description: "Scrolls to an item by index." },
];
</script>

<template>
  <div class="docs-api-table">
    <api-table
      title="NmorphVirtualList"
      name="virtual-list"
      :attributes="attributesData"
      :slots="slotData"
      :events="events"
      :exposes="exposes"
    />
  </div>
</template>
