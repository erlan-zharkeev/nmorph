<script setup lang="ts">
import { NmorphColorPicker } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = "";

const templateData = `
<template>
  <NmorphColorPicker model-value="#6b7280" show-value disabled />
</template>
`;

const cssData = "";

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-disabled">
    <Attribute header="Disabled" :subtitle="$t('overview.color-picker.disabled.subtitle')" :codeToCopy="code">
      <template #overview>
        <div class="color-picker-disabled-overview">
          <ClientOnly>
            <NmorphColorPicker model-value="#6b7280" show-value disabled />
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
.color-picker-disabled-overview {}
</style>
