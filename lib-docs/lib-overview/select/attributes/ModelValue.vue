<script setup lang="ts">
import { NmorphSelect } from "@nmorph/nmorph-ui-kit";
const { t } = useI18n();

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = `
<script lang="ts" setup>
  const value = ref("one");
  const options = ref([
    { label: "One", value: "one" },
    { label: "Two", value: "two" },
    { label: "Three", value: "three" },
  ]);
  const multipleValue = ["one", "two"];
<\/script>
`;
const templateData = `
<template>
  <div class="select-element">
    <NmorphSelect v-model="value" :options="options" />
  </div>
  <div class="select-element">
    <NmorphSelect
      v-model="multipleValue"
      :options="options"
      :no-element-placeholder="
        Choose values
      "
    />
  </div>
</template>
`;

const cssData = `
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
`;

const code = [scriptData, templateData, cssData];
const value = ref("one");
const options = ref([
  { value: "one", label: t("overview.one") },
  { value: "two", label: t("overview.two") },
  { value: "three", label: t("overview.three") },
]);
const multipleValue = ["one", "two"];
</script>

<template>
  <div id="content-model-value">
    <Attribute header="Model-value" :subtitle="$t('overview.select.model-value.subtitle')" :codeToCopy="code">
      <template #overview>
        <div class="select-model-value-overview">
          <ClientOnly>
            <div class="select-element">
              <NmorphSelect v-model="value" :options="options" />
            </div>
            <div class="select-element">
              <NmorphSelect v-model="multipleValue" :options="options" :no-element-placeholder="$t('overview.select.model-value.multiple')
                " />
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
.select-model-value-overview {
  display: flex;
  flex-wrap: wrap;

  .nmorph-select {
    margin-right: 8px;
    margin-bottom: 8px;
  }
}
</style>
