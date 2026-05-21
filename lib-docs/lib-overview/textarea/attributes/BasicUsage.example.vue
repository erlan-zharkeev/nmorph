<script setup lang="ts">
import { NmorphTextarea } from "@nmorph/nmorph-ui-kit";

const value = ref("NmorphTextarea supports multi-line input and auto sizing.");
</script>

<template>
  <div class="textarea-basic-usage-overview">
    <NmorphTextarea v-model="value" placeholder="Enter text" auto-size :min-rows="3" :max-rows="6" />
    <p class="nmorph-body-1">{{ value }}</p>
  </div>
</template>

<style lang="scss">
.textarea-basic-usage-overview {
  display: grid;
  gap: 12px;
  max-width: 420px;
}
</style>
