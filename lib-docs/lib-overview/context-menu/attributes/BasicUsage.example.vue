<script setup lang="ts">
import { NmorphButton, NmorphContextMenu } from "@nmorph/nmorph-ui-kit";
import { ref } from "vue";

const actions = [
  "Open",
  "Duplicate",
  "Archive",
];
const contextMenuOpen = ref(false);
</script>

<template>
  <div class="context-menu-basic-usage-overview">
    <NmorphContextMenu
      v-model="contextMenuOpen"
      :options="actions"
      trigger="both"
      :y-offset="4"
      :z-index="3000"
      aria-label="Context actions"
    >
      <NmorphButton :text="$t('overview.context-menu.basic-usage.target')" />
    </NmorphContextMenu>
  </div>
</template>
