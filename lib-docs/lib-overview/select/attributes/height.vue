<script setup lang="ts">
import { NmorphSelect, NmorphComponentHeight } from "@nmorph/nmorph-ui-kit";
const { t } = useI18n();

import CodeSlotData from "~/components/code-slot-data/code-slot-data.vue";

const scriptData = `
<script lang="ts" setup>
const options = ref([
  { label: "One", value: "one" },
  { label: "Two", value: "two" },
  { label: "Three", value: "three" },
]);
<\/script>
`;
const templateData = `
<template>
  <NmorphSelect
    v-for="height in ['thick', 'default', 'thin']"
    :key="height"
    :height="height"
    :options="options"
  />
</template>
`;

const cssData = `
<style lang="scss">
  .select-height-overview {
    display: flex;
    align-items: center;
    .nmorph-select {
      --base-width: 150px;
      margin-right: 8px;
    }
  }
</style>
`;

const code = [scriptData, templateData, cssData];
const options = ref([
  { value: "one", label: t("overview.one") },
  { value: "two", label: t("overview.two") },
  { value: "three", label: t("overview.three") },
]);
</script>

<template>
  <div id="content-height">
    <attribute
      header="Height"
      :subtitle="$t('overview.select.height.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="select-height-overview">
          <ClientOnly>
            <NmorphSelect
              v-for="height in Object.keys(NmorphComponentHeight)"
              :key="height"
              :height="height"
              :options="options"
            />
          </ClientOnly>
        </div>
      </template>
      <template #code>
        <code-slot-data
          :template-data="templateData"
          :script-data="scriptData"
          :css-data="cssData"
        />
      </template>
    </attribute>
  </div>
</template>

<style lang="scss">
.select-height-overview {
  display: flex;
  align-items: center;
  .nmorph-select {
    --base-width: 150px;
    margin-right: 8px;
  }
}
</style>
