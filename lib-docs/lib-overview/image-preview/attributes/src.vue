<script setup lang="ts">
import { NmorphImagePreview } from "@nmorph/nmorph-ui-kit";
import { Spring, Summer, Autumn, Winter } from "@/assets/images";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = "";

const templateData = `
<template>
  <NmorphImagePreview :src="Spring" />
  <NmorphImagePreview :src="[Summer, Spring, Winter, Autumn]" />
</template>
`;

const cssData = `
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
`;

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-src">
    <Attribute header="Src" :subtitle="$t('overview.image-preview.src.subtitle')" :codeToCopy="code">
      <template #overview>
        <div class="image-preview-src-overview">
          <ClientOnly>
            <NmorphImagePreview :src="Spring" />
            <NmorphImagePreview :src="[Summer, Spring, Winter, Autumn]" />
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
.image-preview-src-overview {
  display: flex;
  flex-wrap: wrap;

  .nmorph-image-preview {
    --width: 200px;
    --height: 200px;
    margin-right: 8px;
  }
}
</style>
