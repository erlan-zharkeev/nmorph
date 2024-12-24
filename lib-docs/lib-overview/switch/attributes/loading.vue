<script setup lang="ts">
import { NmorphSwitch } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = "";

const templateData = `
<template>
  <NmorphSwitch loading disabled />
</template>
`;

const cssData = `
<style lang="scss">
  .switch-loading-overview {
    .nmorph-switch {
      --height: 24px;
      --thumb-height: 18px;
    }
  }
</style>
`;

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-loading">
    <Attribute header="Loading" :subtitle="$t('overview.switch.loading.subtitle')" :codeToCopy="code">
      <template #overview>
        <div class="switch-loading-overview">
          <ClientOnly>
            <NmorphSwitch loading disabled />
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
.switch-loading-overview {
  .nmorph-switch {
    --height: 24px;
    --thumb-height: 18px;
  }
}
</style>
