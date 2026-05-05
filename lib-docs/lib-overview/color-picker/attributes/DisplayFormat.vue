<script setup lang="ts">
import { NmorphColorPicker } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = `
<script lang="ts" setup>
  const color = ref("#4a90e2");
<\/script>
`;

const templateData = `
<template>
  <NmorphColorPicker v-model="color" show-value display-format="hex" />
  <NmorphColorPicker v-model="color" show-value display-format="rgb" />
  <NmorphColorPicker v-model="color" show-value display-format="hsl" />
</template>
`;

const cssData = `
<style lang="scss">
  .color-picker-display-format-overview {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
</style>
`;

const code = [scriptData, templateData, cssData];
const color = ref("#4a90e2");
</script>

<template>
  <div id="content-display-format">
    <Attribute header="Display-format" :subtitle="$t('overview.color-picker.display-format.subtitle')" :codeToCopy="code">
      <template #overview>
        <div class="color-picker-display-format-overview">
          <ClientOnly>
            <NmorphColorPicker v-model="color" show-value display-format="hex" />
            <NmorphColorPicker v-model="color" show-value display-format="rgb" />
            <NmorphColorPicker v-model="color" show-value display-format="hsl" />
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
.color-picker-display-format-overview {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}
</style>
