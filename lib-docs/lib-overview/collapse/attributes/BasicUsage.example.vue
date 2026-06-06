<script setup lang="ts">
import { ref } from "vue";
import { NmorphCollapse, NmorphCollapseItem } from "@nmorph/nmorph-ui-kit";

const opened = ref(["availability"]);
</script>

<template>
  <NmorphCollapse v-model="opened" class="collapse-basic-usage-overview">
    <NmorphCollapseItem name="availability" title="Availability" :block="false">
      <p>Multiple panels can stay opened.</p>
    </NmorphCollapseItem>
    <NmorphCollapseItem
      name="disabled"
      title="Disabled"
      disabled
      :block="false"
    >
      <p>Disabled panel content.</p>
    </NmorphCollapseItem>
    <NmorphCollapseItem name="custom" :block="false" thickness="thin">
      <template #title>
        <span>Custom title slot</span>
      </template>
      <p>Thin title thickness.</p>
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
