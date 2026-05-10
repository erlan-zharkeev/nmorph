<script setup lang="ts">
import {
  NmorphButton,
  NmorphIconCheck,
  NmorphIconExit,
} from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="button-icon-slots-overview">
    <NmorphButton>
      <template #icon>
        <NmorphIconCheck />
      </template>
      Save
    </NmorphButton>

    <NmorphButton shape="circle">
      <template #icon-only>
        <NmorphIconExit />
      </template>
    </NmorphButton>
  </div>
</template>

<style lang="scss">
.button-icon-slots-overview {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
</style>
