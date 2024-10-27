<script setup lang="ts">
import { NmorphTimePicker } from "@nmorph/nmorph-ui-kit";

const scriptData = "";

const templateData = "";

const cssData = "";

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-open">
    <attribute
      header="Open"
      :subtitle="$t('overview.time-picker.open.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="time-picker-open-overview">
          <ClientOnly>
            <NmorphTimePicker />
          </ClientOnly>
        </div>
      </template>
      <template #code>
        <code-example v-if="templateData" lang="html">{{
          templateData
        }}</code-example>
        <code-example v-if="scriptData" lang="javascript">{{
          scriptData
        }}</code-example>
        <code-example v-if="cssData" lang="css">{{ cssData }}</code-example>
      </template>
    </attribute>
  </div>
</template>

<style lang="scss">
.time-picker-open-overview {
}
</style>
