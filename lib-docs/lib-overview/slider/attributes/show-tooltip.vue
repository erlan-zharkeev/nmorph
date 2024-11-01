<script setup lang="ts">
import { NmorphSlider } from "@nmorph/nmorph-ui-kit";

const scriptData = "";
const templateData = `
<template>
  <NmorphSlider :show-tooltip="false" :model-value="50" />
</template>
`;
const cssData = "";
const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-show-tooltip">
    <attribute
      header="Show-tooltip"
      :subtitle="$t('overview.slider.show-tooltip.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="slider-show-tooltip-overview">
          <ClientOnly>
            <NmorphSlider :show-tooltip="false" :model-value="50" />
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
.slider-show-tooltip-overview {
  width: 300px;
  min-height: 40px;
}
</style>
