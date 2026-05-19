<script setup lang="ts">
import { NmorphBadge, NmorphButton } from "@nmorph/nmorph-ui-kit";

const ribbonCorners = ["top-left", "top-right", "bottom-left", "bottom-right"] as const;
</script>

<template>
  <div class="badge-type-overview">
    <ClientOnly>
      <NmorphBadge value="4">
        <NmorphButton text="Default" />
      </NmorphBadge>
      <NmorphBadge type="dot" color="var(--nmorph-error-color)" :dot-size="9">
        <NmorphButton text="Dot" />
      </NmorphBadge>
      <NmorphBadge type="tag" value="Tag" color="var(--nmorph-success-color)" />
      <NmorphBadge
        v-for="corner in ribbonCorners"
        :key="corner"
        value="New"
        type="ribbon"
        :ribbon-corner="corner"
      >
        <div class="badge-type-overview__card">{{ corner }}</div>
      </NmorphBadge>
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.badge-type-overview {
  display: flex;
  flex-wrap: wrap;
  gap: var(--indentation-04);
  align-items: center;
}

.badge-type-overview__card {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 96px;
  background: var(--nmorph-main-color);
  border-radius: var(--default-border-radius);
  box-shadow: var(--nmorph-shadow-outset);
}
</style>
