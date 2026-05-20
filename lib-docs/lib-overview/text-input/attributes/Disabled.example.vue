<script setup lang="ts">
import { NmorphTextInput } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="text-input-disabled-overview">
    <ClientOnly>
      <NmorphTextInput placeholder="I am disabled" disabled />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.text-input-disabled-overview {
}
</style>
