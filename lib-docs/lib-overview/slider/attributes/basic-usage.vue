<script setup lang="ts">
import { NmorphSlider } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/code-slot-data.vue";

const scriptData = `
<script lang="ts" setup>
  const value = ref(3);
<\/script>
`;

const templateData = `
<template>
  <NmorphSlider :min="1" :max="22" :step="1" v-model="value" />
</template>
`;
const cssData = `
<style lang="scss">
  .slider-basic-usage-overview {
    width: 300px;
    min-height: 40px;
  }
</style>
`;

const code = [scriptData, templateData, cssData];

const value = ref(3);
</script>

<template>
  <div id="content-basic-usage">
    <attribute :header="$t('overview.basic-usage')" :codeToCopy="code">
      <template #overview>
        <div class="slider-basic-usage-overview">
          <ClientOnly>
            <NmorphSlider :min="1" :max="22" :step="1" v-model="value" />
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
.slider-basic-usage-overview {
  width: 300px;
  min-height: 40px;
}
</style>
