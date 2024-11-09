<script setup lang="ts">
import { NmorphProgress } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/code-slot-data.vue";

const scriptData = "";

const templateData = `
<template>
  <div class="progress-indeterminate-overview">
    <NmorphProgress
      :percentage="50"
      indeterminate
      color="var(--nmorph-accent-color)"
      :value-right-side="false"
    />
  </div>
</template>
`;

const cssData = `
<style lang="scss">
  .progress-indeterminate-overview {
    width: 100%;
  }
</style>
`;

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-indeterminate">
    <attribute
      header="Indeterminate"
      :subtitle="$t('overview.progress.indeterminate.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="progress-indeterminate-overview">
          <ClientOnly>
            <NmorphProgress
              :percentage="50"
              indeterminate
              color="var(--nmorph-accent-color)"
              :value-right-side="false"
            />
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
.progress-indeterminate-overview {
  width: 100%;
}
</style>
