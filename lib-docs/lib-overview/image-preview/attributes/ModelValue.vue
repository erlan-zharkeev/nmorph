<script setup lang="ts">
import { NmorphImagePreview, NmorphButton } from "@nmorph/nmorph-ui-kit";
import { Winter } from "@/assets/images";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = `
<script lang="ts" setup>
  const show = ref(false);

  const showHandler = () => {
    show.value = true;
  };
<\/script>
`;

const templateData = `
<template>
  <NmorphImagePreview :src="Winter" :model-value="show" />
  <NmorphButton text="SHOW" @click="showHandler" />
</template>
`;

const cssData = `
<style lang="scss">
  .image-preview-model-value-overview {
    .nmorph-image-preview {
      --width: 200px;
      --height: 200px;
    }

    .nmorph-button {
      margin-top: 8px;
      width: 100%;
    }
  }
</style>
`;

const code = [scriptData, templateData, cssData];

const show = ref(false);

const showHandler = () => {
  show.value = true;
};
</script>

<template>
  <div id="content-show">
    <Attribute header="Model value" :subtitle="$t('overview.image-preview.model-value.subtitle')" :codeToCopy="code">
      <template #overview>
        <div class="image-preview-model-value-overview">
          <ClientOnly>
            <NmorphImagePreview :src="Winter" :model-value="show" />
            <NmorphButton :text="$t('overview.show')" @click="showHandler" />
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
.image-preview-model-value-overview {
  .nmorph-image-preview {
    --width: 200px;
    --height: 200px;
  }

  .nmorph-button {
    margin-top: 8px;
    width: 100%;
  }
}
</style>
