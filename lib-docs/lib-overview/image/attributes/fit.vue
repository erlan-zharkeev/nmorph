<script setup lang="ts">
import { NmorphImage } from "@nmorph/nmorph-ui-kit";
import { CatReal } from "~/assets/images";

const scriptData = "";

const templateData = `
<div class="image-fit-overview__wrapper">
  <NmorphImage :src="CatReal" fit="contain" />
</div>
<div class="image-fit-overview__wrapper">
  <NmorphImage :src="CatReal" fit="fill" />
</div>
<div class="image-fit-overview__wrapper">
  <NmorphImage :src="CatReal" fit="cover" />
</div>
`;

const cssData = `
.image-fit-overview__wrapper {
  width: 200px;
  height: 200px;
  margin-right: 16px;
}
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
