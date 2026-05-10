<script setup lang="ts">
import { NmorphButton } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="button-ripple-overview">
    <NmorphButton
      style-type="default"
      ripple
      :text="$t('overview.i-am-ripple')"
    />
    <NmorphButton
      style-type="default"
      ripple
      accent-bg-on-hover
      :text="$t('overview.i-am-ripple-with-hover-bg')"
    />
    <NmorphButton :ripple="false" :text="$t('overview.i-am-not-ripple')" />
  </div>
</template>

<style lang="scss">
.button-ripple-overview {
  .nmorph-button {
    margin: 4px 8px;
  }
}
</style>
