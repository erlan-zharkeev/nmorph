<script setup lang="ts">
import { NmorphSlider } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = "";
const templateData = `
<template>
  <NmorphSlider :show-tooltip="false" :model-value="50" />
</template>
`;
const cssData = `
<style lang="scss">
  .slider-show-tooltip-overview {
    width: 300px;
    min-height: 40px;
  }
</style>
`;
const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-show-tooltip">
    <Attribute header="Show-tooltip" :subtitle="$t('overview.slider.show-tooltip.subtitle')" :codeToCopy="code">
      <template #overview>
        <div class="slider-show-tooltip-overview">
          <ClientOnly>
            <NmorphSlider :show-tooltip="false" :model-value="50" />
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
.slider-show-tooltip-overview {
  width: 300px;
  min-height: 40px;
}
</style>
