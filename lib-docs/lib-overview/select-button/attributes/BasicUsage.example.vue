<script setup lang="ts">
import {
  NmorphSelectButton,
  NmorphSelectButtonItem,
} from "@nmorph/nmorph-ui-kit";
const { t } = useI18n();

const value = ref("on");
const options = [
  { value: "off", label: t("overview.off") },
  { value: "on", label: t("overview.on") },
];
</script>

<template>
  <div class="select-button-basic-overview">
    <ClientOnly>
      <NmorphSelectButton v-model="value" :options="options" />
      <NmorphSelectButton v-model="value">
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
.select-button-basic-overview {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
