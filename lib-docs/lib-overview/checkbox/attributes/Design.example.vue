<script setup lang="ts">
import { NmorphCheckbox } from "@nmorph/nmorph-ui-kit";

const value = ref(false);
</script>

<template>
  <div class="checkbox-design-overview">
    <NmorphCheckbox v-model="value" id="1" design="plain" />
    <NmorphCheckbox v-model="value" id="2" design="nmorph" :label="String(value)" />
  </div>
</template>

<style lang="scss">
.checkbox-design-overview {
  .nmorph-checkbox {
    margin-right: 8px;
  }
}
</style>
