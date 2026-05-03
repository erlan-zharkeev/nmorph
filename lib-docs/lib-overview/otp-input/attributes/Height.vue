<script setup lang="ts">
import { NmorphOTPInput } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = "";

const templateData = `
<template>
  <NmorphOTPInput height="thick" />
  <NmorphOTPInput height="default" />
  <NmorphOTPInput height="thin" />
</template>
`;

const cssData = `
<style lang="scss">
  .otp-input-height-overview {
    display: grid;
    gap: 8px;
  }
</style>
`;

const codeToCopy = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-height">
    <Attribute header="Height" :subtitle="$t('overview.otp-input.height.subtitle')" :codeToCopy="codeToCopy">
      <template #overview>
        <div class="otp-input-height-overview">
          <ClientOnly>
            <NmorphOTPInput height="thick" />
            <NmorphOTPInput height="default" />
            <NmorphOTPInput height="thin" />
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
.otp-input-height-overview {
  display: grid;
  gap: 8px;
}
</style>
