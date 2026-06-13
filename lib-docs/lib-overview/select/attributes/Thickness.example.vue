<script setup lang="ts">
import { NmorphSelect, NmorphComponentThickness } from "@nmorph/nmorph-ui-kit";

const options = ref([
  { value: "one", label: "One" },
  { value: "two", label: "Two" },
  { value: "three", label: "Three" },
]);
const thicknesses = Object.keys(NmorphComponentThickness) as Array<
  keyof typeof NmorphComponentThickness
>;
</script>

<template>
  <div class="select-thickness-overview">
    <NmorphSelect
      v-for="thickness in thicknesses"
      :key="thickness"
      :thickness="thickness"
      :options="options"
    />
  </div>
</template>

<style lang="scss">
.select-thickness-overview {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  .nmorph-select {
    --base-width: 150px;
    margin-right: 8px;
    margin-bottom: 8px;
  }
}
</style>
