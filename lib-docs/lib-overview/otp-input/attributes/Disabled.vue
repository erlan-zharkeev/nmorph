<script setup lang="ts">
import { NmorphOTPInput } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = "";

const templateData = `
<template>
  <NmorphOTPInput disabled />
</template>
`;

const cssData = "";

const codeToCopy = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-disabled">
    <Attribute header="Disabled" :subtitle="$t('overview.otp-input.disabled.subtitle')" :codeToCopy="codeToCopy">
      <template #overview>
        <div class="otp-input-disabled-overview">
          <ClientOnly>
            <NmorphOTPInput disabled />
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
.otp-input-disabled-overview {}
</style>
