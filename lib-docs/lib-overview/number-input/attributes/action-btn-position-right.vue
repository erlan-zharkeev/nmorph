<script setup lang="ts">
import { NmorphNumberInput } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/code-slot-data.vue";

const scriptData = `
<script lang="ts" setup>
  const value = ref(2);
<\/script>
`;

const templateData = `
<template>
  <NmorphNumberInput action-btn-position-right v-model="value" />
</template>
`;

const cssData = "";

const code = [scriptData, templateData, cssData];
const value = ref(2);
</script>

<template>
  <div id="content-action-btn-position-right">
    <attribute
      header="Action-btn-position-right"
      :subtitle="$t('overview.number-input.action-btn-position-right.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="number-input-action-btn-position-right-overview">
          <ClientOnly>
            <NmorphNumberInput
              action-btn-position-right
              v-model="value"
              height="thick"
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
.number-input-action-btn-position-right-overview {
}
</style>
