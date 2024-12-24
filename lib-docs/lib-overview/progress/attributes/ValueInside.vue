<script setup lang="ts">
import { NmorphProgress } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = `
<script lang="ts" setup>
  const percentage = 33;
<\/script>
`;

const templateData = `
<template>
  <div class="progress-value-inside-overview">
    <ClientOnly>
      <NmorphProgress
        :percentage="percentage"
        value-inside
        :value-right-side="false"
      >
        <template #inner-text>
          <span>i'm slot prefix {{ percentage }}%</span>
        </template>
      </NmorphProgress>
    </ClientOnly>
  </div>
</template>
`;

const cssData = `
<style lang="scss">
  .progress-value-inside-overview {
    width: 100%;
    .nmorph-progress {
      --height: 16px;
    }
  }
</style>
`;

const code = [scriptData, templateData, cssData];

const percentage = 33;
</script>

<template>
  <div id="content-value-inside">
    <Attribute header="Value Inside" :subtitle="$t('overview.progress.value-inside.subtitle')" :codeToCopy="code">
      <template #overview>
        <div class="progress-value-inside-overview">
          <ClientOnly>
            <NmorphProgress :percentage="percentage" value-inside :value-right-side="false" color="pink">
              <template #inner-text>
                <span>{{ $t("overview.i-am-slot-prefix") }} {{ percentage }}%</span>
              </template>
            </NmorphProgress>
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
.progress-value-inside-overview {
  width: 100%;

  .nmorph-progress {
    --height: 16px;
  }
}
</style>
