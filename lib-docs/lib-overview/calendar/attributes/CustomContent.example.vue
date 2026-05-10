<script setup lang="ts">
import { NmorphCalendar } from "@nmorph/nmorph-ui-kit";

const date = ref(new Date());
</script>

<template>
  <div class="calendar-custom-content-overview">
    <ClientOnly>
      <NmorphCalendar :initial-date="new Date()" v-model="date">
        <template #date-cell="{ scope }">
          {{ scope.isToday ? "!TODAY!" : scope.value }}
        </template>
      </NmorphCalendar>
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.calendar-custom-content-overview {
  width: 100%;
}
</style>
