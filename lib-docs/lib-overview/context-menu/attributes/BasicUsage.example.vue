<script setup lang="ts">
import { NmorphButton, NmorphContextMenu } from "@nmorph/nmorph-ui-kit";

const actions = [
  { label: "Open" },
  { label: "Duplicate" },
  { label: "Archive" },
];
</script>

<template>
  <div class="context-menu-basic-usage-overview">
    <NmorphContextMenu :width="180" :y-offset="4" :z-index="3000" aria-label="Context actions">
      <NmorphButton :text="$t('overview.context-menu.basic-usage.target')" />
      <template #menu="{ close }">
        <div class="context-menu-basic-usage-overview__menu">
          <NmorphButton
            v-for="action in actions"
            :key="action.label"
            :text="action.label"
            style-type="transparent"
            fill
            @click="close"
          />
        </div>
      </template>
    </NmorphContextMenu>
  </div>
</template>

<style lang="scss">
.context-menu-basic-usage-overview__menu {
  padding: 4px;
}

.context-menu-basic-usage-overview__menu .nmorph-button--transparent .nmorph-button__content:not(:disabled, [loading='true']):hover {
  background: color-mix(in srgb, var(--nmorph-button-hover-color, var(--nmorph-accent-color)) 12%, transparent);
}
</style>
