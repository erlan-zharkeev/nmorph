<script setup lang="ts">
import { NmorphSelect } from "@nmorph/nmorph-ui-kit";
const { t } = useI18n();

const value = ref("one");
const options = ref([
  { value: "one", label: t("overview.one") },
  { value: "two", label: t("overview.two") },
  { value: "three", label: t("overview.three") },
]);
const multipleValue = ref(["one", "two"]);
</script>

<template>
  <div class="select-model-value-overview">
    <ClientOnly>
      <div class="select-element">
        <NmorphSelect v-model="value" :options="options" />
      </div>
      <div class="select-element">
        <NmorphSelect
          v-model="multipleValue"
          :options="options"
          :no-element-placeholder="$t('overview.select.model-value.multiple')"
        />
      </div>
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.select-model-value-overview {
  display: flex;
  flex-wrap: wrap;

  .nmorph-select {
    margin-right: 8px;
    margin-bottom: 8px;
  }
}
</style>
