<script setup lang="ts">
import { NmorphFileUpload } from "@nmorph/nmorph-ui-kit";

const scriptData = "";

const templateData = "";

const cssData = "";

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-photo-with-preview">
    <attribute
      header="Photo-with-preview"
      :subtitle="$t('overview.file-upload.photo-with-preview.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="file-upload-photo-with-preview-overview">
          <ClientOnly>
            <NmorphFile-upload />
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
.file-upload-photo-with-preview-overview {
}
</style>
