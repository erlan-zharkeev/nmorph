<script setup lang="ts">
import { NmorphProgress } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = "";

const templateData = `
<template>
  <NmorphProgress
    :percentage="33"
    :circle-size="50"
    type="circle"
    color="var(--nmorph-accent-color)"
  />
  <NmorphProgress
    :percentage="33"
    :circle-size="100"
    type="circle"
    color="var(--nmorph-error-color)"
  />
  <NmorphProgress
    :percentage="33"
    :circle-size="120"
    type="circle"
    color="pink"
  />
</template>
`;

const cssData = `
<style lang="scss">
  .progress-circle-size-overview {
    width: 100%;
    display: flex;
    align-items: center;
    .nmorph-progress {
      margin-right: 16px;
    }
  }
</style>
`;

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-circle-size">
    <Attribute header="Circle Size" :subtitle="$t('overview.progress.circle-size.subtitle')" :codeToCopy="code">
      <template #overview>
        <div class="progress-circle-size-overview">
          <ClientOnly>
            <NmorphProgress :percentage="33" :circle-size="50" type="circle" color="var(--nmorph-accent-color)" />
            <NmorphProgress :percentage="33" :circle-size="100" type="circle" color="var(--nmorph-error-color)" />
            <NmorphProgress :percentage="33" :circle-size="120" type="circle" color="pink" />
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
.progress-circle-size-overview {
  width: 100%;
  display: flex;
  align-items: center;

  .nmorph-progress {
    margin-right: 16px;
  }
}
</style>
