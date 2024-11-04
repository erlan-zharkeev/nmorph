<script setup lang="ts">
import { NmorphButton } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/code-slot-data.vue";

const scriptData = ``;

const templateData = `
<template>
  <NmorphButton style-type="default" loading />
  <NmorphButton style-type="transparent" loading />
</template>
`;
const cssData = `
<style lang="scss">
  .button-loading-overview {
    .nmorph-button {
      margin: 0 8px;
    }
  }
</style>
`;
const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-loading">
    <attribute
      header="Loading"
      :subtitle="$t('overview.button.loading.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="button-loading-overview">
          <ClientOnly>
            <NmorphButton style-type="default" loading />
            <NmorphButton style-type="transparent" loading />
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
.button-loading-overview {
  .nmorph-button {
    margin: 0 8px;
  }
}
</style>
