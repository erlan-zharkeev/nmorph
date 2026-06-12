<script setup lang="ts">
import { NmorphLink } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="link-icon-name-overview">
    <NmorphLink icon-name="edit">Edit</NmorphLink>
    <NmorphLink icon-name="eye" underline text="Lorem ipsum" />
  </div>
</template>

<style lang="scss">
.link-icon-name-overview {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
}

.link-icon-name-overview .nmorph-link__icon {
  --nmorph-private-icon-width: 14px !important;
  --nmorph-private-icon-height: 14px !important;
}
</style>
