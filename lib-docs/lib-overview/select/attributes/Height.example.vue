<script setup lang="ts">
import { NmorphSelect, NmorphComponentHeight } from "@nmorph/nmorph-ui-kit";
const { t } = useI18n();

const options = ref([
  { value: "one", label: t("overview.one") },
  { value: "two", label: t("overview.two") },
  { value: "three", label: t("overview.three") },
]);
const heights = Object.keys(NmorphComponentHeight) as Array<
  keyof typeof NmorphComponentHeight
>;
</script>

<template>
  <div class="select-height-overview">
    <ClientOnly>
      <NmorphSelect
        v-for="height in heights"
        :key="height"
        :height="height"
        :options="options"
      />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.select-height-overview {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  .nmorph-select {
    --base-width: 150px;
    margin-right: 8px;
    margin-bottom: 8px;
  }
}
</style>
