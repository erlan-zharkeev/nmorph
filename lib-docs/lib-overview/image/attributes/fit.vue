<script setup lang="ts">
import { NmorphImage } from "@nmorph/nmorph-ui-kit";
import { CatReal } from "~/assets/images";

import CodeSlotData from "~/components/code-slot-data/code-slot-data.vue";

const scriptData = "";

const templateData = `
<template>
  <div class="image-fit-overview__wrapper">
    <NmorphImage :src="CatReal" fit="contain" />
  </div>
  <div class="image-fit-overview__wrapper">
    <NmorphImage :src="CatReal" fit="fill" />
  </div>
  <div class="image-fit-overview__wrapper">
    <NmorphImage :src="CatReal" fit="cover" />
  </div>
</template>
`;

const cssData = `
<style lang="scss">
  .image-fit-overview {
    width: 100%;
    display: flex;
    .image-fit-overview__wrapper {
      width: 200px;
      height: 200px;
      margin-right: 16px;
    }
  }
</style>
`;

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-fit">
    <attribute
      header="Fit"
      info-name="image.fit"
      :subtitle="$t('overview.image.fit.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="image-fit-overview">
          <ClientOnly>
            <div class="image-fit-overview__wrapper">
              <NmorphImage :src="CatReal" fit="contain" />
            </div>
            <div class="image-fit-overview__wrapper">
              <NmorphImage :src="CatReal" fit="fill" />
            </div>
            <div class="image-fit-overview__wrapper">
              <NmorphImage :src="CatReal" fit="cover" />
            </div>
          </ClientOnly>
        </div>
      </template>
      <template #code>
        <code-slot-data
          :template-data="templateData"
          :script-data="scriptData"
          :css-data="cssData"
        />
      </template>
    </attribute>
  </div>
</template>

<style lang="scss">
.image-fit-overview {
  width: 100%;
  display: flex;
  .image-fit-overview__wrapper {
    width: 200px;
    height: 200px;
    margin-right: 16px;
  }
}
</style>
