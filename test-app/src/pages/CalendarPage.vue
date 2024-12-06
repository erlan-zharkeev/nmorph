<template>
  <div class="wrapper">
    <NmorphCard>
      <div class="calendar-wrapper">
        <NmorphCalendar :initial-date="new Date(2024, 3, 1)" type="dates" v-model="selectedValue">
          <template #date-cell="{ scope }">
            {{ scope.isToday ? "TODAY" : scope.value }}
          </template>
        </NmorphCalendar>
      </div>
    </NmorphCard>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { NmorphCard, NmorphCalendar } from "@nmorph/nmorph-ui-kit";
const selectedValue = ref([new Date(2024, 3, 30)]);
</script>

<style>
.divider {
  margin: 20px;
}
</style>
