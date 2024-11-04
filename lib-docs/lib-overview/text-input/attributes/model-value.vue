<script setup lang="ts">
import { NmorphTextInput } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/code-slot-data.vue";

const scriptData = `
<script lang="ts" setup>
  const text = ref("Lorem ipsum"");
<\/script>
`;

const templateData = `
<template>
  <p class="nmorph-title-3">Model-text: {{ text }}</p>
  <NmorphTextInput v-model="text" />
</template>
`;

const cssData = `
<style lang="scss">
  .text-input-model-value-overview {
    .nmorph-text-input {
      width: 300px;
    }
    p {
      margin-bottom: 8px;
    }
  }
</style>
`;
const code = [scriptData, templateData, cssData];

const text = ref("Lorem ipsum");
</script>

<template>
  <div id="content-model-value">
    <attribute
      header="Model-value"
      :subtitle="$t('overview.text-input.model-value.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="text-input-model-value-overview">
          <ClientOnly>
            <p class="nmorph-title-3">
              {{ $t("overview.model-text") }} {{ text }}
            </p>
            <NmorphTextInput v-model="text" />
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
.text-input-model-value-overview {
  .nmorph-text-input {
    width: 300px;
  }
  p {
    margin-bottom: 8px;
  }
}
</style>
