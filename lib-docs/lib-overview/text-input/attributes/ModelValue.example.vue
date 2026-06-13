<script setup lang="ts">
import { NmorphTextInput } from "@nmorph/nmorph-ui-kit";

const text = ref("Lorem ipsum");
</script>

<template>
  <div class="text-input-model-value-overview">
    <p class="nmorph-title-3">Model text: {{ text }}</p>
    <NmorphTextInput v-model="text" />
  </div>
</template>

<style lang="scss">
.text-input-model-value-overview {
  .nmorph-text-input {
    width: 260px;
  }

  p {
    margin-bottom: 8px;
  }
}
</style>
