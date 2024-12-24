<script setup lang="ts">
import { NmorphNumberInput } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = "";

const templateData = `
<template>
  <NmorphNumberInput height="thick" />
  <NmorphNumberInput height="default" />
  <NmorphNumberInput height="thin" />
</template>
`;
const cssData = `
<style lang="scss">
  .number-input-height-overview {
    display: flex;
    align-items: center;
    .nmorph-number-input {
      margin-right: 8px;
    }
  }
</style>
`;

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-height">
    <Attribute header="Height" :subtitle="$t('overview.number-input.height.subtitle')" :codeToCopy="code">
      <template #overview>
        <div class="number-input-height-overview">
          <ClientOnly>
            <NmorphNumberInput height="thick" />
            <NmorphNumberInput height="default" />
            <NmorphNumberInput height="thin" />
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
.number-input-height-overview {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  .nmorph-number-input {
    margin-right: 8px;
    margin-bottom: 8px;
  }
}
</style>
