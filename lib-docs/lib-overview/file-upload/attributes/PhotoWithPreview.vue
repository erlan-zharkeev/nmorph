<script setup lang="ts">
import { NmorphFileUpload } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = "";

const templateData = `
<template>
  <NmorphFileUpload photo-with-preview />
</template>
`;
const cssData = `
<style lang="scss">
  .file-upload-photo-with-preview-overview {
    width: 300px;
  }
</style>
`;

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-photo-with-preview">
    <Attribute header="Photo-with-preview" :subtitle="$t('overview.file-upload.photo-with-preview.subtitle')"
      :codeToCopy="code">
      <template #overview>
        <div class="file-upload-photo-with-preview-overview">
          <ClientOnly>
            <NmorphFileUpload photo-with-preview />
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
.file-upload-photo-with-preview-overview {
  width: 300px;
}
</style>
