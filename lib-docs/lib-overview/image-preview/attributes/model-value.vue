<script setup lang="ts">
import { NmorphImagePreview, NmorphButton } from "@nmorph/nmorph-ui-kit";
import { Winter } from "@/assets/images";

const scriptData = `
const show = ref(false);

const showHandler = () => {
  show.value = true;
};
`;

const templateData = `
<NmorphImagePreview :src="Winter" :model-value="show" />
<NmorphButton text="SHOW" @click="showHandler" />
`;

const cssData = `
.nmorph-image-preview {
  --width: 200px;
  --height: 200px;
}

.nmorph-button {
  margin-top: 8px;
  width: 100%;
}
`;

const code = [scriptData, templateData, cssData];

const show = ref(false);

const showHandler = () => {
  show.value = true;
};
</script>

<template>
  <div id="content-show">
    <attribute
      header="Model value"
      :subtitle="$t('overview.image-preview.model-value.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="image-preview-model-value-overview">
          <ClientOnly>
            <NmorphImagePreview :src="Winter" :model-value="show" />
            <NmorphButton text="SHOW" @click="showHandler" />
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
