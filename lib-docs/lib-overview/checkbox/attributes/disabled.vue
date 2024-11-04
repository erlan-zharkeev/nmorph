<script setup lang="ts">
import { NmorphCheckbox } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/code-slot-data.vue";

const scriptData = "";

const templateData = `
<template>
  <NmorphCheckbox disabled :model-value="true"/>
</template>
`;

const cssData = "";

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-disabled">
    <attribute
      header="Disabled"
      :subtitle="$t('overview.checkbox.disabled.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="checkbox-disabled-overview">
          <ClientOnly>
            <NmorphCheckbox disabled :model-value="true" id="3" />
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
.checkbox-disabled-overview {
}
</style>
