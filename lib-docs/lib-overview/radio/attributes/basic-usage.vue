<script setup lang="ts">
import { NmorphRadio } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/code-slot-data.vue";

const scriptData = ``;
const templateData = `
<template>
  <NmorphRadio checked value="1" label="One" />
  <NmorphRadio value="2" label="Two" />
  <NmorphRadio
    value="3"
    checked
    style-type="radio-style"
    label="Three"
  />
  <NmorphRadio
    value="4"
    disabled
    checked
    style-type="radio-style"
    label="Four"
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
    <attribute
      :header="$t('overview.basic-usage')"
      info-name="radio.basic-usage"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="radio-value-overview">
          <ClientOnly>
            <NmorphRadio checked value="1" :label="$t('overview.one')" />
            <NmorphRadio value="2" :label="$t('overview.two')" />
            <NmorphRadio
              value="3"
              checked
              style-type="radio-style"
              :label="$t('overview.three')"
            />
            <NmorphRadio
              value="4"
              disabled
              checked
              style-type="radio-style"
              :label="$t('overview.four')"
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
.radio-value-overview {
  display: flex;
  align-items: center;
  .nmorph-radio {
    margin-right: 8px;
  }
}
</style>
