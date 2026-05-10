<script setup lang="ts">
import {
  NmorphSelectButton,
  NmorphSelectButtonItem,
} from "@nmorph/nmorph-ui-kit";
const { t } = useI18n();

const value = ref("on");
</script>

<template>
  <div class="select-button-disabled-overview">
    <ClientOnly>
      <NmorphSelectButton v-model="value" disabled>
        <NmorphSelectButtonItem value="off">{{
          $t("overview.off")
        }}</NmorphSelectButtonItem>
        <NmorphSelectButtonItem value="on">{{
          $t("overview.on")
        }}</NmorphSelectButtonItem>
      </NmorphSelectButton>
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.select-button-disabled-overview {
  display: flex;
  gap: 12px;
}
</style>
