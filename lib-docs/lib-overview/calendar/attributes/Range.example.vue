<script setup lang="ts">
import { NmorphCalendar } from "@nmorph/nmorph-ui-kit";

const date1 = new Date();
const date2 = new Date();

date2.setDate(date2.getDate() + 2);

const range = ref<[Date, Date]>([date1, date2]);
const model = ref(new Date());
</script>

<template>
  <div class="calendar-initial-date-overview">
    <ClientOnly>
      <NmorphCalendar :range="range" v-model="model" />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.calendar-range-overview {
}
</style>
