<script setup lang="ts">
import { NmorphSelectButton, NmorphSelectButtonItem } from "@nmorph/nmorph-ui-kit";
const { t } = useI18n();

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = `
<script lang="ts" setup>
const value = ref("on");
const options = [
  { value: "off", label: "Off" },
  { value: "on", label: "On" },
];
<\/script>
`;

const templateData = `
<template>
  <NmorphSelectButton v-model="value" :options="options" />

  <NmorphSelectButton v-model="value">
    <NmorphSelectButtonItem value="off">Off</NmorphSelectButtonItem>
    <NmorphSelectButtonItem value="on">On</NmorphSelectButtonItem>
  </NmorphSelectButton>
</template>
`;

const cssData = ``;
const code = [scriptData, templateData, cssData];

const value = ref("on");
const options = [
  { value: "off", label: t("overview.off") },
  { value: "on", label: t("overview.on") },
];
</script>

<template>
  <div id="content-basic-usage">
    <Attribute :header="$t('overview.basic-usage')" :codeToCopy="code">
      <template #overview>
        <div class="select-button-basic-overview">
          <ClientOnly>
            <NmorphSelectButton v-model="value" :options="options" />
            <NmorphSelectButton v-model="value">
              <NmorphSelectButtonItem value="off">{{ $t("overview.off") }}</NmorphSelectButtonItem>
              <NmorphSelectButtonItem value="on">{{ $t("overview.on") }}</NmorphSelectButtonItem>
            </NmorphSelectButton>
          </ClientOnly>
        </div>
      </template>
      <template #code>
        <code-slot-data :template-data="templateData" :script-data="scriptData" :css-data="cssData" />
      </template>
    </Attribute>
  </div>
</template>

<style lang="scss">
.select-button-basic-overview {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
