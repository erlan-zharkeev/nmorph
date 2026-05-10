<script setup lang="ts">
import { NmorphButton } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="button-disabled-overview">
    <NmorphButton disabled>{{ $t("overview.disabled") }}</NmorphButton>
    <NmorphButton disabled height="thin">{{
      $t("overview.disabled-thin")
    }}</NmorphButton>
    <ClientOnly>
      <NmorphButton disabled loading />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.button-disabled-overview {
  .nmorph-button {
    margin: 4px 8px;
  }
}
</style>
