<script setup lang="ts">
import { NmorphFileUpload } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/code-slot-data.vue";

const scriptData = "";
const templateData = `
<template>
  <NmorphFileUpload multiple />
</template>
`;
const cssData = `
<style lang="scss">
  .file-upload-multiple-overview {
    width: 300px;
  }
</style>
`;
const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-multiple">
    <attribute
      header="Multiple"
      :subtitle="$t('overview.file-upload.multiple.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="file-upload-multiple-overview">
          <ClientOnly>
            <NmorphFileUpload multiple />
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
.file-upload-multiple-overview {
  width: 300px;
}
</style>
