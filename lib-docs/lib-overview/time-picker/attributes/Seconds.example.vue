<script setup lang="ts">
import { ref } from "vue";
import { NmorphTimePicker } from "@nmorph/nmorph-ui-kit";

const time = ref("14:45:20");
</script>

<template>
  <div class="time-picker-seconds-overview">
    <NmorphTimePicker
      v-model="time"
      show-seconds
      :minute-step="15"
      :second-step="10"
      width="180px"
    />
  </div>
</template>

<style lang="scss">
.time-picker-seconds-overview {
  min-height: 280px;
}
</style>
