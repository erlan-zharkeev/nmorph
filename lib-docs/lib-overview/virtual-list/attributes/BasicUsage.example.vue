<script setup lang="ts">
import { NmorphVirtualList } from "@nmorph/nmorph-ui-kit";

const items = Array.from({ length: 1000 }, (_, index) => `Virtual row ${index + 1}`);
</script>

<template>
  <NmorphVirtualList class="virtual-list-basic-usage-overview" :items="items" :item-height="44" height="220px">
    <template #default="{ item, index }">
      <div class="virtual-list-basic-usage-overview__item">
        <strong>{{ index + 1 }}</strong>
        <span>{{ item }}</span>
      </div>
    </template>
  </NmorphVirtualList>
</template>

<style lang="scss">
.virtual-list-basic-usage-overview {
  max-width: 360px;
}

.virtual-list-basic-usage-overview__item {
  display: flex;
  align-items: center;
  gap: 12px;
  box-sizing: border-box;
  min-height: 44px;
  padding: 0 12px;
  border-bottom: 1px solid color-mix(in srgb, var(--nmorph-text-color) 12%, transparent);
}
</style>
