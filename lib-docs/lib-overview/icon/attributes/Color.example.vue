<script setup lang="ts">
import {
  NmorphIcon,
  NmorphIconAddLocation,
  NmorphIconAvatar,
  NmorphIconArchive,
} from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="icon-color-overview">
    <NmorphIcon color="var(--nmorph-accent-color)" size="large">
      <NmorphIconAddLocation />
    </NmorphIcon>
    <NmorphIcon color="#694295" size="large">
      <NmorphIconAvatar />
    </NmorphIcon>
    <NmorphIcon color="hsl(148, 60%, 39%)" size="large">
      <NmorphIconArchive />
    </NmorphIcon>
  </div>
</template>

<style lang="scss">
.icon-color-overview {
  display: flex;
  align-items: center;
  gap: 16px;
}
</style>
