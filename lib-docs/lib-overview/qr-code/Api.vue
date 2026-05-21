<script setup lang="ts">
import type {
  IAttributesTableData,
  ISlotsTableData,
} from "~/types";
import ApiTable from "~/components/api-table/ApiTable.vue";

const attributesData: IAttributesTableData[] = [
  { name: "value", type: "String | Number", default: "''", description: "Value encoded into the QR code." },
  { name: "size", type: "Number | String", default: "160", description: "Rendered component size." },
  { name: "margin", type: "Number", default: "4", description: "Quiet-zone size in QR modules." },
  { name: "color", type: "String", default: "var(--nmorph-text-color)", description: "Dark module color." },
  { name: "background", type: "String", default: "var(--nmorph-main-color)", description: "Background color." },
  { name: "level", type: "'low' | 'medium' | 'quartile' | 'high'", default: "medium", description: "Error correction level." },
  { name: "min-version", type: "Number", default: "1", description: "Minimum QR version to use." },
  { name: "max-version", type: "Number", default: "40", description: "Maximum QR version to use." },
  { name: "title", type: "String", default: "''", description: "Accessible SVG title." },
];

const slotData: ISlotsTableData[] = [
  { name: "error", description: "Custom content shown when the value cannot be encoded." },
];
</script>

<template>
  <div class="docs-api-table">
    <api-table title="NmorphQRCode" name="qr-code" :attributes="attributesData" :slots="slotData" />
  </div>
</template>
