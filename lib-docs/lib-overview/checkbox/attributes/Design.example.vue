<script setup lang="ts">
import { NmorphCheckbox } from "@nmorph/nmorph-ui-kit";

const value = ref(false);
</script>

<template>
  <div class="checkbox-design-overview">
    <ClientOnly>
      <NmorphCheckbox v-model="value" id="1" design="checkbox" />
      <NmorphCheckbox v-model="value" id="2" :label="String(value)" />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.checkbox-design-overview {
  .nmorph-checkbox {
    margin-right: 8px;
  }
}
</style>
