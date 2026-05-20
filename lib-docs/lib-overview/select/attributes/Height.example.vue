<script setup lang="ts">
import { NmorphSelect, NmorphComponentHeight } from "@nmorph/nmorph-ui-kit";

const options = ref([
  { value: "one", label: "One" },
  { value: "two", label: "Two" },
  { value: "three", label: "Three" },
]);
const heights = Object.keys(NmorphComponentHeight) as Array<
  keyof typeof NmorphComponentHeight
>;
</script>

<template>
  <div class="select-height-overview">
    <ClientOnly>
      <NmorphSelect
        v-for="height in heights"
        :key="height"
        :height="height"
        :options="options"
      />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.select-height-overview {
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
