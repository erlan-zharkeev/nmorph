<script setup lang="ts">
import { NmorphImagePreview } from "@nmorph/nmorph-ui-kit";
import { Spring, Summer, Autumn, Winter } from "@/assets/images";

const scriptData = "";

const templateData = `
<NmorphImagePreview :src="[Summer, Spring, Winter, Autumn]" :initial-index="1" />
`;

const cssData = `
.nmorph-image-preview {
  --width: 200px;
  --height: 200px;
}
`;

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-initial-index">
    <attribute
      header="Initial Index"
      :subtitle="$t('overview.image-preview.initial-index.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="image-preview-initial-index-overview">
          <ClientOnly>
            <NmorphImagePreview
              :src="[Summer, Spring, Winter, Autumn]"
              :initial-index="3"
            />
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
.image-preview-initial-index-overview {
  .nmorph-image-preview {
    --width: 200px;
    --height: 200px;
  }
}
</style>
