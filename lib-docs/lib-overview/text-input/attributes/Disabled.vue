<script setup lang="ts">
import { NmorphTextInput } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = "";
const templateData = `
<template>
  <NmorphTextInput placeholder="I'm disabled" disabled />
</template>
`;
const cssData = "";

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-disabled">
    <Attribute header="Disabled" :subtitle="$t('overview.text-input.disabled.subtitle')" :codeToCopy="code">
      <template #overview>
        <div class="text-input-disabled-overview">
          <ClientOnly>
            <NmorphTextInput :placeholder="$t('overview.i-am-disabled')" disabled />
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
.text-input-disabled-overview {}
</style>
