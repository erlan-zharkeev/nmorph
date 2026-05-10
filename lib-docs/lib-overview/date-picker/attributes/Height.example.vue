<script setup lang="ts">
import { NmorphComponentHeight, NmorphDatePicker } from "@nmorph/nmorph-ui-kit";

const value = ref(new Date());
const heights = Object.keys(NmorphComponentHeight) as Array<
  keyof typeof NmorphComponentHeight
>;
</script>

<template>
  <div class="date-picker-height-overview">
    <ClientOnly>
      <NmorphDatePicker
        v-for="height in heights"
        :key="height"
        :height="height"
        v-model="value"
      />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.date-picker-height-overview {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  .nmorph-date-picker {
    margin-right: 8px;
    margin-bottom: 8px;
  }
}
</style>
