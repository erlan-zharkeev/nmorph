<script setup lang="ts">
import { NmorphImage } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = "";
const templateData = `
<template>
  <NmorphImage
    src="./error.jpg"
    load-failed-text="Custom error text"
  />
  <NmorphImage src="./error.jpg">
    <template #loading>Load error</template>
  </NmorphImage>
</template>
`;

const cssData = `
<style lang="scss">
  .image-load-failed-text-overview {
    display: flex;
    width: 100%;
    flex-wrap: wrap;

    .nmorph-image {
      --width: 300px;
      --height: 300px;
      margin-right: 16px;
      margin-bottom: 8px;
    }
  }
</style>
`;

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-load-failed-text">
    <Attribute header="Load Failed Text" :subtitle="$t('overview.image.load-failed-text.subtitle')" :codeToCopy="code">
      <template #overview>
        <div class="image-load-failed-text-overview">
          <ClientOnly>
            <ClientOnly>
              <NmorphImage src="./error.jpg" load-failed-text="Custom error text" />
            </ClientOnly>
            <ClientOnly>
              <NmorphImage src="./error.jpg">
                <template #error>{{ $t("overview.load-error") }}</template>
              </NmorphImage>
            </ClientOnly>
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
.image-load-failed-text-overview {
  display: flex;
  width: 100%;
  flex-wrap: wrap;

  .nmorph-image {
    --width: 300px;
    --height: 300px;
    margin-right: 16px;
    margin-bottom: 8px;
  }
}
</style>
