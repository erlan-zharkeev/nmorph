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
  .nmorph-link {
    margin: 0 8px;
  }
}
</style>
