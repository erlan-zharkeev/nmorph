<script setup lang="ts">
import { NmorphAvatar } from "@nmorph/nmorph-ui-kit";
import { Dog, Racoon } from "~/assets/images";
</script>

<template>
  <div class="avatar-preview-overview">
    <NmorphAvatar
      :src="[Dog, Racoon]"
      preview
      :size="80"
      shape="square"
      :preview-initial-index="0"
    />
  </div>
</template>

<style lang="scss">
.avatar-preview-overview {
  display: flex;
  align-items: center;
}
</style>
