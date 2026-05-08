<script setup lang="ts">
import { NmorphColorPicker } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = "";

const templateData = `
<template>
  <NmorphColorPicker height="thick" />
  <NmorphColorPicker height="basic" />
  <NmorphColorPicker height="thin" />
</template>
`;

const cssData = `
<style lang="scss">
  .color-picker-height-overview {
    display: flex;
    align-items: center;
    gap: 8px;
  }
</style>
`;

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-height">
    <Attribute header="Height" :subtitle="$t('overview.color-picker.height.subtitle')" :codeToCopy="code">
      <template #overview>
        <div class="color-picker-height-overview">
          <ClientOnly>
            <NmorphColorPicker height="thick" />
            <NmorphColorPicker height="basic" />
            <NmorphColorPicker height="thin" />
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
.color-picker-height-overview {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
