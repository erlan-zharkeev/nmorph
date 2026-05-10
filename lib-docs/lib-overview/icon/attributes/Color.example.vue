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
    <ClientOnly>
      <NmorphIcon color="var(--nmorph-accent-color)" size="large">
        <NmorphIconAddLocation />
      </NmorphIcon>
      <NmorphIcon color="#694295" size="large">
        <NmorphIconAvatar />
      </NmorphIcon>
      <NmorphIcon color="hsl(148, 60%, 39%)" size="large">
        <NmorphIconArchive />
      </NmorphIcon>
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.icon-color-overview {
  display: flex;

  .nmorph-icon {
    margin: 0 8px;
  }
}
</style>
