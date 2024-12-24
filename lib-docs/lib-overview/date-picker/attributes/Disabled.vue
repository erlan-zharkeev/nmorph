<script setup lang="ts">
import { NmorphDatePicker } from "@nmorph/nmorph-ui-kit";

const scriptData = "";

const templateData = `
<template>
  <NmorphDatePicker disabled />
</template>
`;

const cssData = "";

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-disabled">
    <Attribute header="Disabled" :subtitle="$t('overview.date-picker.disabled.subtitle')" :codeToCopy="code">
      <template #overview>
        <div class="date-picker-disabled-overview">
          <ClientOnly>
            <NmorphDatePicker disabled />
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
    </Attribute>
  </div>
</template>

<style lang="scss">
.date-picker-disabled-overview {}
</style>
