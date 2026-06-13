<script setup lang="ts">
import { NmorphSelect } from "@nmorph/nmorph-ui-kit";

const value = ref("teams");
const options = [
  { value: "teams", label: "Microsoft Teams Audio Device (Virtual)" },
  { value: "microphone", label: "MacBook Pro Microphone (Built-in)" },
  { value: "thunderbolt", label: "Universal Audio Thunderbolt (PCI)" },
];
</script>

<template>
  <div class="select-options-width-overview">
    <NmorphSelect v-model="value" :options="options" />
    <NmorphSelect v-model="value" :options="options" options-width="auto" />
  </div>
</template>

<style lang="scss">
.select-options-width-overview {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
