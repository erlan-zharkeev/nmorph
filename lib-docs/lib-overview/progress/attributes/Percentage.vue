<script setup lang="ts">
import { NmorphProgress } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = "";
const templateData = `
<template>
  <div class="progress-percentage-overview">
    <NmorphProgress :percentage="33"  color="pink" />
    <NmorphProgress :percentage="66" color="var(--nmorph-accent-color)" />
    <NmorphProgress :percentage="99" color="lightblue" />
  </div>
</template>
`;

const cssData = `
<style lang="scss">
  .progress-percentage-overview {
    width: 100%;
    .nmorph-progress__linear {
      margin-bottom: 12px;
    }
  }
</style>
`;

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-percentage">
    <Attribute header="Percentage" :subtitle="$t('overview.progress.percentage.subtitle')"
      info-name="progress.percentage" :codeToCopy="code">
      <template #overview>
        <div class="progress-percentage-overview">
          <ClientOnly>
            <NmorphProgress :percentage="33" color="pink" />
            <NmorphProgress :percentage="66" color="var(--nmorph-accent-color)" />
            <NmorphProgress :percentage="99" color="lightblue" />
          </ClientOnly>
        </div>
      </template>
      <template #code>
        <code-slot-data :template-data="templateData" :script-data="scriptData" :css-data="cssData" />
      </template>
    </Attribute>
  </div>
</template>

<style lang="scss">
.progress-percentage-overview {
  width: 100%;

  .nmorph-progress__linear {
    margin-bottom: 12px;
  }
}
</style>
