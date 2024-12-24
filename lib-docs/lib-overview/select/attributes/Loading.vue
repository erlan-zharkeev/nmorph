<script setup lang="ts">
import { NmorphSelect } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = "";

const templateData = `
<template>
  <NmorphSelect loading />
</template>
`;
const cssData = "";

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-loading">
    <Attribute header="Loading" :subtitle="$t('overview.select.loading.subtitle')" :codeToCopy="code">
      <template #overview>
        <div class="select-loading-overview">
          <ClientOnly>
            <NmorphSelect loading />
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
.select-loading-overview {}
</style>
