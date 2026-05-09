<script setup lang="ts">
import { NmorphRadio } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = ``;
const templateData = `
<template>
  <NmorphRadio checked value="1" label="One" />
  <NmorphRadio
    value="2"
    checked
    style-type="radio-style"
    label="Two"
  />
</template>
`;

const cssData = `
<style lang="scss">
  .radio-value-overview {
    display: flex;
    align-items: center;
    .nmorph-radio {
      margin-right: 8px;
    }
  }
</style>
`;

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-value">
    <Attribute :header="$t('overview.basic-usage')" info-name="radio.basic-usage" :codeToCopy="code">
      <template #overview>
        <div class="radio-value-overview">
          <ClientOnly>
            <NmorphRadio checked value="1" :label="$t('overview.one')" />
            <NmorphRadio value="2" checked style-type="radio-style" :label="$t('overview.two')" />
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
.radio-value-overview {
  display: flex;
  align-items: center;

  .nmorph-radio {
    margin-right: 8px;
  }
}
</style>
