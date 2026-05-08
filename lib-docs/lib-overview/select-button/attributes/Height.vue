<script setup lang="ts">
import { NmorphSelectButton, NmorphSelectButtonItem, NmorphComponentHeight } from "@nmorph/nmorph-ui-kit";
const { t } = useI18n();

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = `
<script lang="ts" setup>
const value = ref("on");
<\/script>
`;

const templateData = `
<template>
  <NmorphSelectButton v-model="value" height="thick">
    <NmorphSelectButtonItem value="off">Off</NmorphSelectButtonItem>
    <NmorphSelectButtonItem value="on">On</NmorphSelectButtonItem>
  </NmorphSelectButton>
  <NmorphSelectButton v-model="value" height="default">
    <NmorphSelectButtonItem value="off">Off</NmorphSelectButtonItem>
    <NmorphSelectButtonItem value="on">On</NmorphSelectButtonItem>
  </NmorphSelectButton>
  <NmorphSelectButton v-model="value" height="thin">
    <NmorphSelectButtonItem value="off">Off</NmorphSelectButtonItem>
    <NmorphSelectButtonItem value="on">On</NmorphSelectButtonItem>
  </NmorphSelectButton>
</template>
`;

const cssData = ``;
const code = [scriptData, templateData, cssData];

const value = ref("on");
const heights = Object.keys(NmorphComponentHeight) as Array<keyof typeof NmorphComponentHeight>;
</script>

<template>
  <div id="content-height">
    <Attribute header="Height" :subtitle="$t('overview.select-button.height.subtitle')" :codeToCopy="code">
      <template #overview>
        <div class="select-button-height-overview">
          <ClientOnly>
            <NmorphSelectButton
              v-for="height in heights"
              :key="height"
              v-model="value"
              :height="height"
            >
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
.select-button-height-overview {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
</style>
