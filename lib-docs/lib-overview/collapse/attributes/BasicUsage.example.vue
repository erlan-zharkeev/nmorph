<script setup lang="ts">
import { ref } from "vue";
import { NmorphCollapse, NmorphCollapseItem } from "@nmorph/nmorph-ui-kit";

const opened = ref(["overview"]);
</script>

<template>
  <NmorphCollapse v-model="opened" class="collapse-basic-usage-overview">
    <NmorphCollapseItem name="overview" title="Overview" :block="false">
      <p>NmorphCollapse can keep several panels opened at the same time.</p>
    </NmorphCollapseItem>
    <NmorphCollapseItem name="settings" title="Settings" :block="false">
      <p>Use accordion mode when only one panel should stay opened.</p>
    </NmorphCollapseItem>
    <NmorphCollapseItem name="disabled" title="Disabled" disabled :block="false">
      <p>This content is disabled.</p>
    </NmorphCollapseItem>
  </NmorphCollapse>
</template>

<style lang="scss">
.collapse-basic-usage-overview {
  max-width: 520px;

  p {
    margin: 0;
  }
}
</style>
