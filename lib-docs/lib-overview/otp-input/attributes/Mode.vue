<script setup lang="ts">
import { NmorphOTPInput } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = "";

const templateData = `
<template>
  <NmorphOTPInput mode="numeric" />
  <NmorphOTPInput mode="text" />
  <NmorphOTPInput mode="alphanumeric" :length="4" />
</template>
`;

const cssData = `
<style lang="scss">
  .otp-input-mode-overview {
    display: grid;
    gap: 12px;
  }

  .otp-input-mode-overview__item {
    display: grid;
    gap: 6px;
  }
</style>
`;

const codeToCopy = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-mode">
    <Attribute header="Mode" :subtitle="$t('overview.otp-input.mode.subtitle')" :codeToCopy="codeToCopy">
      <template #overview>
        <div class="otp-input-mode-overview">
          <ClientOnly>
            <div class="otp-input-mode-overview__item">
              <p class="nmorph-title-3">numeric</p>
              <NmorphOTPInput mode="numeric" />
            </div>
            <div class="otp-input-mode-overview__item">
              <p class="nmorph-title-3">text</p>
              <NmorphOTPInput mode="text" />
            </div>
            <div class="otp-input-mode-overview__item">
              <p class="nmorph-title-3">alphanumeric</p>
              <NmorphOTPInput mode="alphanumeric" :length="4" />
            </div>
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
.otp-input-mode-overview {
  display: grid;
  gap: 12px;
}

.otp-input-mode-overview__item {
  display: grid;
  gap: 6px;

  p {
    margin: 0;
  }
}
</style>
