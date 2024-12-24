<script setup lang="ts">
import { NmorphButton, NmorphTextInput } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = `
<script lang="ts" setup>
  const typePassword = ref(true);
<\/script>
`;

const templateData = `
<template>
  <NmorphButton
    :text="$t('overview.text-input.type-password.toggle')"
    @click="typePassword = !typePassword"
    class="type-input-button"
  />
  <NmorphTextInput :type-password="typePassword" />
</template>
`;
const cssData = `
<style lang="scss">
  .text-input-type-password-overview {
    .type-input-button {
      margin-bottom: 8px;
    }
  }
</style>
`;
const code = [scriptData, templateData, cssData];

const typePassword = ref(true);
</script>

<template>
  <div id="content-type-password">
    <Attribute header="Type-password" :subtitle="$t('overview.text-input.type-password.subtitle')" :codeToCopy="code">
      <template #overview>
        <div class="text-input-type-password-overview">
          <ClientOnly>
            <NmorphButton :text="$t('overview.text-input.type-password.toggle')" @click="typePassword = !typePassword"
              class="type-input-button" />
            <NmorphTextInput :type-password="typePassword" />
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
.text-input-type-password-overview {
  .type-input-button {
    margin-bottom: 8px;
  }
}
</style>
