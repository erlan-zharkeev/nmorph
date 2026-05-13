<script setup lang="ts">
import { type IAttributesTableData, type IEventsTableData } from "~/types";
import ApiTable from "~/components/api-table/ApiTable.vue";

const attributesData: IAttributesTableData[] = [
  {
    name: "loop",
    type: "Boolean",
    default: "true",
  },
];

const events: IEventsTableData[] = [
  {
    name: "change",
    type: "Number",
  },
];

const itemAttributesData: IAttributesTableData[] = [
  {
    name: "name",
    type: "String",
    default: "-",
    required: true,
  },
];
</script>

<template>
  <div class="docs-api-table">
    <api-table title="NmorphCarousel" name="carousel" :attributes="attributesData" :events="events" />
  </div>
  <div class="docs-api-table">
    <api-table title="NmorphCarouselItem" name="carousel-item" :attributes="itemAttributesData" />
  </div>
</template>

<style scoped>
.docs-api-table {
  margin: 16px 0;
}
</style>
