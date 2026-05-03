<script setup lang="ts">
import { NmorphColorPicker } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = "";

const templateData = `
<template>
  <NmorphColorPicker show-value />
</template>
`;

const cssData = "";

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-show-value">
    <Attribute header="Show-value" :subtitle="$t('overview.color-picker.show-value.subtitle')" :codeToCopy="code">
      <template #overview>
        <div class="color-picker-show-value-overview">
          <ClientOnly>
            <NmorphColorPicker show-value />
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
.color-picker-show-value-overview {}
</style>
