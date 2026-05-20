<script setup lang="ts">
import { ref } from "vue";
import { NmorphTimePicker } from "@nmorph/nmorph-ui-kit";

const time = ref("14:45:20");
</script>

<template>
  <NmorphTimePicker
    v-model="time"
    show-seconds
    :minute-step="15"
    :second-step="10"
  />
</template>
