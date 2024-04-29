<script setup lang="ts">
import { ref } from 'vue';
import {
  NmorphDatePicker,
} from './../../../library/src/components';
const selectedDate = ref([new Date()])
</script>

<template>
  <div class="date-picker-page">
    <NmorphDatePicker v-model="selectedDate" type="dates"/>
  </div>
</template>

<style lang="scss">
.date-picker-page {
  height: 100%;
  max-width: 400px;
  margin: 8px;
}
html {
  background: var(--main-bg);

}
</style>
