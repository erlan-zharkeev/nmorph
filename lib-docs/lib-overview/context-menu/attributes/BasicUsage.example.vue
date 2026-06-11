<script setup lang="ts">
import { NmorphButton, NmorphContextMenu } from "@nmorph/nmorph-ui-kit";
import { ref } from "vue";

const actions = ["Open", "Duplicate", "Archive"];
const contextMenuOpen = ref(false);
</script>

<template>
  <div class="context-menu-basic-usage-overview">
    <NmorphContextMenu
      v-model="contextMenuOpen"
      :options="actions"
      trigger="contextmenu"
      :y-offset="4"
      :z-index="3000"
      aria-label="Context actions"
    >
      <NmorphButton text="Right-click this area" />
    </NmorphContextMenu>
  </div>
</template>
