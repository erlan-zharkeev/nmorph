<script setup lang="ts">
import { NmorphImagePreview } from "@nmorph/nmorph-ui-kit";
import { Spring, Summer, Autumn, Winter } from "@/assets/images";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = "";

const templateData = `
<template>
  <NmorphImagePreview :src="[Summer, Spring, Winter, Autumn]" :initial-index="1" />
</template>
`;

const cssData = `
<style lang="scss">
  .image-preview-initial-index-overview {
    .nmorph-image-preview {
      --width: 200px;
      --height: 200px;
    }
  }
</style>
`;

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-initial-index">
    <Attribute header="Initial Index" :subtitle="$t('overview.image-preview.initial-index.subtitle')"
      :codeToCopy="code">
      <template #overview>
        <div class="image-preview-initial-index-overview">
          <ClientOnly>
            <NmorphImagePreview :src="[Summer, Spring, Winter, Autumn]" :initial-index="3" />
          </ClientOnly>
        </div>
      </template>
      <template #code>
        <code-slot-data :template-data="templateData" :script-data="scriptData" :css-data="cssData" />
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
