<script setup lang="ts">
import { NmorphComponentThickness, NmorphDatePicker } from "@nmorph/nmorph-ui-kit";

const value = ref(new Date());
const thicknesses = Object.keys(NmorphComponentThickness) as Array<
  keyof typeof NmorphComponentThickness
>;
</script>

<template>
  <div class="date-picker-thickness-overview">
    <ClientOnly>
      <NmorphDatePicker
        v-for="thickness in thicknesses"
        :key="thickness"
        :thickness="thickness"
        v-model="value"
      />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.date-picker-thickness-overview {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  .nmorph-date-picker {
    margin-right: 8px;
    margin-bottom: 8px;
  }
}
</style>
