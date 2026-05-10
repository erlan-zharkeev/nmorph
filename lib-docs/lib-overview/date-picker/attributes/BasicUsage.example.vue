<script setup lang="ts">
import { NmorphDatePicker } from "@nmorph/nmorph-ui-kit";

const date = ref(new Date());
const dates = ref([]);
const date1 = new Date(1989, 11, 18);
const date2 = new Date(1989, 11, 21);
const range = ref([date1, date2]);
</script>

<template>
  <div class="date-picker-basic-usage-overview">
    <ClientOnly>
      <div class="date-picker-basic-usage-overview__element">
        <NmorphDatePicker v-model="date" />
      </div>
      <div class="date-picker-basic-usage-overview__element">
        <NmorphDatePicker v-model="dates" type="dates" :initial-date="date" />
      </div>
      <div class="date-picker-basic-usage-overview__element">
        <NmorphDatePicker
          v-model="range"
          type="daterange"
          :initial-date="date1"
        />
      </div>
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.date-picker-basic-usage-overview {
  display: flex;
  flex-wrap: wrap;

  .date-picker-basic-usage-overview__element {
    margin-right: 12px;
    margin-bottom: 8px;
  }
}
</style>
