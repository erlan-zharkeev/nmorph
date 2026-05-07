<script setup lang="ts">
import { NmorphRadioGroup } from "@nmorph/nmorph-ui-kit";
const { t } = useI18n();

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = `
<script lang="ts" setup>
  const options = [
    { value: "one", label: "One" },
    { value: "two", label: "Two", disabled: true },
    { value: "three", label: "Three" },
  ];
  const value = ref("three");
<\/script>
`;

const templateData = `
<template>
  <div class="radio-group-el">
    <NmorphRadioGroup :options="options" v-model="value" height="thin" />
  </div>
  <div class="radio-group-el">
    <NmorphRadioGroup
      :options="options"
      v-model="value"
      direction="column"
      style-type="radio-style"
      height="thick"
    />
  </div>
</template>
`;

const cssData = `
<style lang="scss">
  .radio-group-model-value-overview {
    .radio-group-el {
      margin-bottom: 8px;
    }
  }
</style>
`;

const code = [scriptData, templateData, cssData];
const options = [
  { value: "one", label: t("overview.one") },
  { value: "two", label: t("overview.two"), disabled: true },
  { value: "three", label: t("overview.three") },
];
const value = ref("three");
</script>

<template>
  <div id="content-model-value">
    <Attribute :header="$t('overview.basic-usage')" :codeToCopy="code">
      <template #overview>
        <div class="radio-group-model-value-overview">
          <ClientOnly>
            <div class="radio-group-el">
              <NmorphRadioGroup :options="options" v-model="value" height="thin" />
            </div>
            <div class="radio-group-el">
              <NmorphRadioGroup :options="options" v-model="value" direction="column" style-type="radio-style" height="thick" />
            </div>
          </ClientOnly>
        </div>
      </template>
      <template #code>
        <code-slot-data :template-data="templateData" :script-data="scriptData" :css-data="cssData" />
      </template>
    </attribute>
  </div>
</template>

<style lang="scss">
.radio-group-model-value-overview {
  .radio-group-el {
    margin-bottom: 8px;
  }
}
</style>
