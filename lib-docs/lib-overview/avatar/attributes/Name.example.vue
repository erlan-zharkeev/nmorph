<script setup lang="ts">
import { NmorphAvatar } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="avatar-name-overview">
    <NmorphAvatar name="John Doe" :size="70" />
    <NmorphAvatar name="Alex Smith" :size="50" />
  </div>
</template>

<style lang="scss">
.avatar-name-overview {
  display: flex;
  align-items: center;

  .nmorph-avatar {
    margin-right: 12px;
  }
}
</style>
