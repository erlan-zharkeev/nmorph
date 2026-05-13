<script setup lang="ts">
import { ref } from "vue";
import { NmorphTimePicker } from "@nmorph/nmorph-ui-kit";

const time = ref("09:30");
</script>

<template>
  <div class="time-picker-basic-usage-overview">
    <NmorphTimePicker v-model="time" />
    <span>{{ time || "empty" }}</span>
  </div>
</template>

<style lang="scss">
.time-picker-basic-usage-overview {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}
</style>
