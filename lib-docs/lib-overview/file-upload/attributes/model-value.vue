<script setup lang="ts">
import { NmorphFileUpload } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/code-slot-data.vue";

const scriptData = `
<script lang="ts" setup>
  const value = ref([]);
<\/script>
`;

const templateData = `
<template>
  <NmorphFileUpload v-model="value" />
</template>
`;
const cssData = `
<style lang="scss">
  .file-upload-model-value-overview {
    width: 300px;
  }
</style>
`;
const code = [scriptData, templateData, cssData];

const value = ref([]);
</script>

<template>
  <div id="content-model-value">
    <attribute header="Model-value" :codeToCopy="code">
      <template #overview>
        <div class="file-upload-model-value-overview">
          <ClientOnly>
            <NmorphFileUpload v-model="value" />
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
.file-upload-model-value-overview {
  width: 300px;
}
</style>
