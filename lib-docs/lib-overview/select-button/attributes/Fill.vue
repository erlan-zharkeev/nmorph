<script setup lang="ts">
import { NmorphSelectButton, NmorphSelectButtonItem } from "@nmorph/nmorph-ui-kit";
import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = `
<script lang="ts" setup>
const value = ref("on");
<\/script>
`;

const templateData = `
<template>
  <NmorphSelectButton v-model="value" fill>
    <NmorphSelectButtonItem value="off">Off</NmorphSelectButtonItem>
    <NmorphSelectButtonItem value="on">On</NmorphSelectButtonItem>
    <NmorphSelectButtonItem value="auto">Auto</NmorphSelectButtonItem>
  </NmorphSelectButton>
</template>
`;

const cssData = ``;
const code = [scriptData, templateData, cssData];

const value = ref("on");
</script>

<template>
  <div id="content-fill">
    <Attribute header="Fill" :subtitle="$t('overview.select-button.fill.subtitle')" :codeToCopy="code">
      <template #overview>
        <div class="select-button-fill-overview">
          <ClientOnly>
            <NmorphSelectButton v-model="value" fill>
              <NmorphSelectButtonItem value="off">{{ $t("overview.off") }}</NmorphSelectButtonItem>
              <NmorphSelectButtonItem value="on">{{ $t("overview.on") }}</NmorphSelectButtonItem>
              <NmorphSelectButtonItem value="auto">Auto</NmorphSelectButtonItem>
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
.select-button-fill-overview {
  width: 100%;
}
</style>
