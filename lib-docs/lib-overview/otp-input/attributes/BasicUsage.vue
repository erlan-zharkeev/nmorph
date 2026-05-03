<script setup lang="ts">
import { NmorphOTPInput } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = `
<script lang="ts" setup>
  const otpValue = ref("");
  const completedValue = ref("");

  const handleComplete = (value: string) => {
    completedValue.value = value;
  };
<\/script>
`;

const templateData = `
<template>
  <p class="nmorph-title-3">Value: {{ otpValue }}</p>
  <p class="nmorph-title-3">Complete: {{ completedValue || "-" }}</p>
  <NmorphOTPInput v-model="otpValue" @complete="handleComplete" />
</template>
`;

const cssData = `
<style lang="scss">
  .otp-input-basic-usage-overview {
    display: grid;
    gap: 8px;
  }

  .otp-input-basic-usage-overview p {
    margin: 0;
  }
</style>
`;

const codeToCopy = [scriptData, templateData, cssData];

const otpValue = ref("");
const completedValue = ref("");

const handleComplete = (value: string) => {
  completedValue.value = value;
};
</script>

<template>
  <div id="content-basic-usage">
    <Attribute :header="$t('overview.basic-usage')" :codeToCopy="codeToCopy">
      <template #overview>
        <div class="otp-input-basic-usage-overview">
          <ClientOnly>
            <p class="nmorph-title-3">{{ $t("overview.value") }} {{ otpValue || "-" }}</p>
            <p class="nmorph-title-3">Complete: {{ completedValue || "-" }}</p>
            <NmorphOTPInput v-model="otpValue" @complete="handleComplete" />
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
.otp-input-basic-usage-overview {
  display: grid;
  gap: 8px;

  p {
    margin: 0;
  }
}
</style>
