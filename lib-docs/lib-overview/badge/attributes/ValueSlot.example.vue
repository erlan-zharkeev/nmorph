<script setup lang="ts">
import {
  NmorphBadge,
  NmorphButton,
  NmorphIcon,
  NmorphIconUsers,
} from "@nmorph/nmorph-ui-kit";

const teamSize = 12;
</script>

<template>
  <div class="badge-value-slot-overview">
    <ClientOnly>
      <NmorphBadge :value="teamSize" color="var(--nmorph-success-color)">
        <template #value="{ value }">
          <div class="badge-value-slot-overview__content">
            <NmorphIcon width="10px" height="10px" color="currentColor">
              <NmorphIconUsers />
            </NmorphIcon>
            <span>{{ value }}</span>
          </div>
        </template>
        <NmorphButton text="team" />
      </NmorphBadge>
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.badge-value-slot-overview {
  display: flex;
}

.badge-value-slot-overview__content {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
</style>
