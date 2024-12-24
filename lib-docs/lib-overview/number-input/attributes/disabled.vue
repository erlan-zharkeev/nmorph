<script setup lang="ts">
import { NmorphNumberInput } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = "";

const templateData = `
<template>
  <NmorphNumberInput disabled />
</template>
`;
const cssData = "";

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-disabled">
    <Attribute header="Disabled" :subtitle="$t('overview.number-input.disabled.subtitle')" :codeToCopy="code">
      <template #overview>
        <div class="number-input-disabled-overview">
          <ClientOnly>
            <NmorphNumberInput disabled />
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
.number-input-disabled-overview {}
</style>
