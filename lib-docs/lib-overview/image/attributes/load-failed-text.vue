<script setup lang="ts">
import { NmorphImage } from "@nmorph/nmorph-ui-kit";

const scriptData = "";

const templateData = `
<NmorphImage
  src="./error.jpg"
  load-failed-text="Custom error text"
/>
<NmorphImage src="./error.jpg">
  <template #loading>Load error</template>
</NmorphImage>
`;

const cssData = `
.nmorph-image {
  --width: 300px;
  --height: 300px;
  margin-right: 16px;
}
`;

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-load-failed-text">
    <attribute
      header="Load Failed Text"
      :subtitle="$t('overview.image.load-failed-text.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="image-load-failed-text-overview">
          <ClientOnly>
            <ClientOnly>
              <NmorphImage
                src="./error.jpg"
                load-failed-text="Custom error text"
              />
            </ClientOnly>
            <ClientOnly>
              <NmorphImage src="./error.jpg">
                <template #error>Load error</template>
              </NmorphImage>
            </ClientOnly>
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
.image-load-failed-text-overview {
  display: flex;
  width: 100%;
  .nmorph-image {
    --width: 300px;
    --height: 300px;
    margin-right: 16px;
  }
}
</style>
