<script setup lang="ts">
import { NmorphSelect } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = "";
const templateData = `
<template>
  <NmorphSelect disabled />
</template>
`;
const cssData = "";
const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-disabled">
    <Attribute header="Disabled" :subtitle="$t('overview.select.disabled.subtitle')" :codeToCopy="code">
      <template #overview>
        <div class="select-disabled-overview">
          <ClientOnly>
            <NmorphSelect disabled />
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
.select-disabled-overview {}
</style>
