<script setup lang="ts">
import { NmorphFileUpload } from "@nmorph/nmorph-ui-kit";

const scriptData = "";

const templateData = `
<template>
  <NmorphFileUpload disabled />
</template>
`;

const cssData = "";

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-disabled">
    <attribute
      header="Disabled"
      :subtitle="$t('overview.file-upload.disabled.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="file-upload-disabled-overview">
          <ClientOnly>
            <NmorphFileUpload disabled />
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
.file-upload-disabled-overview {
}
</style>
