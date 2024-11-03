<script setup lang="ts">
import { NmorphImage } from "@nmorph/nmorph-ui-kit";

const scriptData = "";

const templateData = `
<template>
  <NmorphImage
    src="./loading.jpg"
    loading-text="Custom loading text"
  />
  <NmorphImage src="./loading.jpg">
    <template #loading>The download is in progress</template>
  </NmorphImage>
</template>
`;

const cssData = `
<style lang="scss">
  .image-loading-text-overview {
    display: flex;
    width: 100%;
    .nmorph-image {
      --width: 300px;
      --height: 300px;
      margin-right: 16px;
    }
  }
</style>
`;

const code = [scriptData, templateData, cssData];
const imageSrc = ref("https://httpstat.us/200?sleep=300000");

const errorHandler = () => {
  imageKey.value += 1;
};

const imageKey = ref(0);
</script>

<template>
  <div id="content-loading-text">
    <attribute
      header="Loading Text"
      :subtitle="$t('overview.image.loading-text.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="image-loading-text-overview">
          <ClientOnly>
            <NmorphImage
              :src="imageSrc"
              @error="errorHandler"
              :key="imageKey"
              :loading-text="$t('overview.custom-loading-text')"
            />
          </ClientOnly>
          <ClientOnly>
            <NmorphImage :src="imageSrc" @error="errorHandler" :key="imageKey">
              <template #loading>{{
                $t("overview.download-in-progress")
              }}</template>
            </NmorphImage>
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
.image-loading-text-overview {
  display: flex;
  width: 100%;
  .nmorph-image {
    --width: 300px;
    --height: 300px;
    margin-right: 16px;
  }
}
</style>
