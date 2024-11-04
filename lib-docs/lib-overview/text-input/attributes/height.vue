<script setup lang="ts">
import { NmorphTextInput } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/code-slot-data.vue";

const scriptData = "";
const templateData = `
<template>
  <NmorphTextInput height="thick" placeholder="Enter text" />
  <NmorphTextInput height="default" placeholder="Enter text" />
  <NmorphTextInput height="thin" placeholder="Enter text" />
</template>
`;
const cssData = `
<style lang="scss">
  .text-input-height-overview {
    display: flex;
    align-items: center;
    .nmorph-text-input {
      margin-right: 8px;
    }
  }
</style>
`;

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-height">
    <attribute
      header="Height"
      :subtitle="$t('overview.text-input.height.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="text-input-height-overview">
          <ClientOnly>
            <NmorphTextInput
              height="thick"
              :placeholder="$t('overview.enter-text')"
            />
            <NmorphTextInput
              height="default"
              :placeholder="$t('overview.enter-text')"
            />
            <NmorphTextInput
              height="thin"
              :placeholder="$t('overview.enter-text')"
            />
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
.text-input-height-overview {
  display: flex;
  align-items: center;
  .nmorph-text-input {
    margin-right: 8px;
  }
}
</style>
