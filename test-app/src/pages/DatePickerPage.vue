<script setup lang="ts">
import { ref } from "vue";
import { NmorphDatePicker } from "@nmorph/nmorph-ui-kit";
const selectedDate = ref([new Date("2024-05-13"), new Date("2024-06-14")]);
</script>

<template>
  <div class="date-picker-page">
    <NmorphDatePicker v-model="selectedDate" type="daterange" />
  </div>
</template>

<style>
.date-picker-page {
  height: 100%;
  max-width: 400px;
  margin: 8px;
}
</style>
