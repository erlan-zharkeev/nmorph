<script setup lang="ts">
import { NmorphBadge, NmorphButton } from "@nmorph/nmorph-ui-kit";

const ribbonCorners = [
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
] as const;
</script>

<template>
  <div class="badge-type-overview">
    <ClientOnly>
      <NmorphBadge value="4">
        <NmorphButton text="Default" />
      </NmorphBadge>
      <div class="badge-type-overview__dot">
        <NmorphBadge type="dot" color="var(--nmorph-error-color)">
          <NmorphButton text="Dot" />
        </NmorphBadge>
      </div>
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
      <NmorphBadge
        value="Flat"
        type="ribbon"
        ribbon-corner="top-right"
        :ribbon-tilt="false"
        color="var(--nmorph-success-color)"
      >
        <div class="badge-type-overview__card">flat corner</div>
      </NmorphBadge>
      <NmorphBadge
        value="Tiny"
        type="ribbon"
        size="tiny"
        ribbon-corner="bottom-right"
      >
        <div class="badge-type-overview__card">tiny ribbon</div>
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

.badge-type-overview__dot .nmorph-badge {
  --nmorph-badge-dot-size: 9px;
}
</style>
