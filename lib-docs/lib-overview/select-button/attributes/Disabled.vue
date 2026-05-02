<script setup lang="ts">
import { NmorphSelectButton, NmorphSelectButtonItem } from "@nmorph/nmorph-ui-kit";
const { t } = useI18n();

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = `
<script lang="ts" setup>
const value = ref("on");
<\/script>
`;

const templateData = `
<template>
  <NmorphSelectButton v-model="value" disabled>
    <NmorphSelectButtonItem value="off">Off</NmorphSelectButtonItem>
    <NmorphSelectButtonItem value="on">On</NmorphSelectButtonItem>
  </NmorphSelectButton>
</template>
`;

const cssData = ``;
const code = [scriptData, templateData, cssData];

const value = ref("on");
</script>

<template>
  <div id="content-disabled">
    <Attribute header="Disabled" :subtitle="$t('overview.select-button.disabled.subtitle')" :codeToCopy="code">
      <template #overview>
        <div class="select-button-disabled-overview">
          <ClientOnly>
            <NmorphSelectButton v-model="value" disabled>
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
.select-button-disabled-overview {
  display: flex;
  gap: 12px;
}
</style>
