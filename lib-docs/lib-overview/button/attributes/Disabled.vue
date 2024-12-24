<script setup lang="ts">
import { NmorphButton } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = ``;

const templateData = `
<template>
  <NmorphButton disabled>Disabled</NmorphButton>
  <NmorphButton disabled height="thin">Disabled thin</NmorphButton>
  <NmorphButton disabled loading />
</template>
`;
const cssData = `
<style lang="scss">
  .button-disabled-overview {
    .nmorph-button {
      margin: 4px 8px;
    }
  }
</style>
`;
const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-disabled">
    <Attribute header="Disabled" :subtitle="$t('overview.button.disabled.subtitle')" :codeToCopy="code">
      <template #overview>
        <div class="button-disabled-overview">
          <NmorphButton disabled>{{ $t("overview.disabled") }}</NmorphButton>
          <NmorphButton disabled height="thin">{{
            $t("overview.disabled-thin")
          }}</NmorphButton>
          <ClientOnly>
            <NmorphButton disabled loading />
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
.button-disabled-overview {
  .nmorph-button {
    margin: 4px 8px;
  }
}
</style>
