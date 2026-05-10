<script setup lang="ts">
import { NmorphAvatar } from "@nmorph/nmorph-ui-kit";
import { Autumn, Spring, Summer, Winter } from "~/assets/images";
</script>

<template>
  <div class="avatar-preview-overview">
    <ClientOnly>
      <NmorphAvatar
        :src="[Summer, Spring, Winter, Autumn]"
        preview
        :size="80"
        shape="square"
        :preview-initial-index="1"
      />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.avatar-preview-overview {
  display: flex;
  align-items: center;
}
</style>
