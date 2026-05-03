<script setup lang="ts">
import { NmorphOTPInput } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = "";

const templateData = `
<template>
  <NmorphOTPInput :length="4" />
  <NmorphOTPInput :length="6" />
</template>
`;

const cssData = `
<style lang="scss">
  .otp-input-length-overview {
    display: grid;
    gap: 8px;
  }
</style>
`;

const codeToCopy = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-length">
    <Attribute header="Length" :subtitle="$t('overview.otp-input.length.subtitle')" :codeToCopy="codeToCopy">
      <template #overview>
        <div class="otp-input-length-overview">
          <ClientOnly>
            <NmorphOTPInput :length="4" />
            <NmorphOTPInput :length="6" />
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
.otp-input-length-overview {
  display: grid;
  gap: 8px;
}
</style>
