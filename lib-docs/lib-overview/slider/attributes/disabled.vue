<script setup lang="ts">
import { NmorphSlider } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/code-slot-data.vue";

const scriptData = "";

const templateData = `
<template>
  <NmorphSlider :min="1" :max="22" :step="1" v-model="value" />
</template>
`;
const cssData = `
<style lang="scss">
  .slider-disabled-overview {
    width: 300px;
  }
</style>
`;

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-disabled">
    <attribute
      header="Disabled"
      :subtitle="$t('overview.slider.disabled.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="slider-disabled-overview">
          <ClientOnly>
            <NmorphSlider disabled />
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
.slider-disabled-overview {
  width: 300px;
}
</style>
