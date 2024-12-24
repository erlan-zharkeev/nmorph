<script setup lang="ts">
import { NmorphNumberInput } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = `
<script lang="ts" setup>
  const value = ref(3);
<\/script>
`;

const templateData = `
<template>
  <NmorphNumberInput v-model="value" :max="5" :min="1" :step="1" height="thin" />
</template>
`;

const cssData = `
<style lang="scss">
  .number-input-basic-usage-overview {
    width: 200px;
    .nmorph-number-input {
      width: 100%;
    }
  }
</style>
`;

const code = [scriptData, templateData, cssData];
const value = ref(3);
</script>

<template>
  <div id="content-basic-usage">
    <Attribute :header="$t('overview.basic-usage')" :codeToCopy="code">
      <template #overview>
        <div class="number-input-basic-usage-overview">
          <ClientOnly>
            <NmorphNumberInput v-model="value" :max="5" :min="1" :step="1" height="thin" />
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
.number-input-basic-usage-overview {
  width: 150px;

  .nmorph-number-input {
    width: 100%;
  }
}
</style>
