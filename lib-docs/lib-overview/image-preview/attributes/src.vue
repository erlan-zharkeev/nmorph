<script setup lang="ts">
import { NmorphImagePreview } from "@nmorph/nmorph-ui-kit";
import { Spring, Summer, Autumn, Winter } from "@/assets/images";

const scriptData = "";

const templateData = `
<NmorphImagePreview :src="Spring" />
<NmorphImagePreview :src="[Summer, Spring, Winter, Autumn]" />
`;

const cssData = `
.nmorph-image-preview {
  --width: 200px;
  --height: 200px;
  margin-right: 8px;
}
`;

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-src">
    <attribute
      header="Src"
      :subtitle="$t('overview.image-preview.src.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="image-preview-src-overview">
          <ClientOnly>
            <NmorphImagePreview :src="Spring" />
            <NmorphImagePreview :src="[Summer, Spring, Winter, Autumn]" />
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
.image-preview-src-overview {
  display: flex;
  .nmorph-image-preview {
    --width: 200px;
    --height: 200px;
    margin-right: 8px;
  }
}
</style>
