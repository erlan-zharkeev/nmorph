<script setup lang="ts">
import { NmorphFileUpload } from "@nmorph/nmorph-ui-kit";

const scriptData = "";
const templateData = `
<template>
  <NmorphFileUpload multiple />
</template>
`;
const cssData = "";
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
        <code-example v-if="templateData" lang="html">{{
          templateData
        }}</code-example>
        <code-example v-if="scriptData" lang="javascript">{{
          scriptData
        }}</code-example>
        <code-example v-if="cssData" lang="css">{{ cssData }}</code-example>
      </template>
    </attribute>
  </div>
</template>

<style lang="scss">
.file-upload-multiple-overview {
  width: 300px;
}
</style>
