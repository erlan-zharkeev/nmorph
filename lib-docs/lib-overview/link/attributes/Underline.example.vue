<script setup lang="ts">
import { NmorphLink } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="link-underline-overview">
    <NmorphLink>{{ $t("overview.without-underline") }}</NmorphLink>
    <NmorphLink underline>{{ $t("overview.underlined") }}</NmorphLink>
  </div>
</template>

<style lang="scss">
.link-underline-overview {
  .nmorph-link {
    margin: 0 8px;
  }
}
</style>
