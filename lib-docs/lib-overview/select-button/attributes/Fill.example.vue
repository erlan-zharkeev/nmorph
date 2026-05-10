<script setup lang="ts">
import {
  NmorphSelectButton,
  NmorphSelectButtonItem,
} from "@nmorph/nmorph-ui-kit";

const value = ref("on");
</script>

<template>
  <div class="select-button-fill-overview">
    <ClientOnly>
      <NmorphSelectButton v-model="value" fill>
        <NmorphSelectButtonItem value="off">{{
          $t("overview.off")
        }}</NmorphSelectButtonItem>
        <NmorphSelectButtonItem value="on">{{
          $t("overview.on")
        }}</NmorphSelectButtonItem>
        <NmorphSelectButtonItem value="auto">Auto</NmorphSelectButtonItem>
      </NmorphSelectButton>
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.select-button-fill-overview {
  width: 100%;
}
</style>
