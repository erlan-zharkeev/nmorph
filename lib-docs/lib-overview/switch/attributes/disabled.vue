<script setup lang="ts">
import { NmorphSwitch } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/code-slot-data.vue";

const scriptData = "";

const templateData = `
<template>
  <NmorphSwitch disabled />
</template>
`;

const cssData = "";

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-disabled">
    <attribute
      header="Disabled"
      :subtitle="$t('overview.switch.disabled.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="switch-disabled-overview">
          <ClientOnly>
            <NmorphSwitch disabled />
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
.switch-disabled-overview {
}
</style>
