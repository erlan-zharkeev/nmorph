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
  <p class="nmorph-title-3">Value: {{ color }}</p>
  <NmorphColorPicker v-model="color" show-value />
</template>
`;

const cssData = `
<style lang="scss">
  .color-picker-model-value-overview {
    p {
      margin-bottom: 8px;
    }
  }
</style>
`;

const code = [scriptData, templateData, cssData];
const color = ref("#4a90e2");
</script>

<template>
  <div id="content-model-value">
    <Attribute header="Model-value" :subtitle="$t('overview.color-picker.model-value.subtitle')" :codeToCopy="code">
      <template #overview>
        <div class="color-picker-model-value-overview">
          <ClientOnly>
            <p class="nmorph-title-3">
              {{ $t("overview.value") }} {{ color }}
            </p>
            <NmorphColorPicker v-model="color" show-value />
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
.color-picker-model-value-overview {
  p {
    margin-bottom: 8px;
  }
}
</style>
