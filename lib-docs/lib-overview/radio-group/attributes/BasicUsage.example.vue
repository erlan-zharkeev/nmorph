<script setup lang="ts">
import { NmorphRadioGroup } from "@nmorph/nmorph-ui-kit";
const { t } = useI18n();

const options = [
  { value: "one", label: t("overview.one") },
  { value: "two", label: t("overview.two"), disabled: true },
  { value: "three", label: t("overview.three") },
];
const value = ref("three");
</script>

<template>
  <div class="radio-group-model-value-overview">
    <ClientOnly>
      <div class="radio-group-el">
        <NmorphRadioGroup
          :options="options"
          v-model="value"
          height="extra-thin"
        />
      </div>
      <div class="radio-group-el">
        <NmorphRadioGroup
          :options="options"
          v-model="value"
          direction="column"
          style-type="radio-style"
          height="thin"
        />
      </div>
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.radio-group-model-value-overview {
  .radio-group-el {
    margin-bottom: 8px;
  }
}
</style>
