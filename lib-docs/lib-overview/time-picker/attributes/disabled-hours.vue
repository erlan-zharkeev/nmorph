<script setup lang="ts">
import { NmorphTimePicker } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/code-slot-data.vue";

const scriptData = "";

const templateData = "";

const cssData = "";

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-disabled-hours">
    <attribute
      header="Disabled-hours"
      :subtitle="$t('overview.time-picker.disabled-hours.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="time-picker-disabled-hours-overview">
          <ClientOnly>
            <NmorphTimePicker />
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
.time-picker-disabled-hours-overview {
}
</style>
