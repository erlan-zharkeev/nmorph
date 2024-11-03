<script setup lang="ts">
import { NmorphNumberInput } from "@nmorph/nmorph-ui-kit";

const scriptData = `
<script lang="ts" setup>
  const value = ref(2);
<\/script>
`;

const templateData = `
<template>
  <NmorphNumberInput action-btn-position-right v-model="value" />
</template>
`;

const cssData = "";

const code = [scriptData, templateData, cssData];
const value = ref(2);
</script>

<template>
  <div id="content-action-btn-position-right">
    <attribute
      header="Action-btn-position-right"
      :subtitle="$t('overview.number-input.action-btn-position-right.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="number-input-action-btn-position-right-overview">
          <ClientOnly>
            <NmorphNumberInput
              action-btn-position-right
              v-model="value"
              height="thick"
            />
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
.number-input-action-btn-position-right-overview {
}
</style>
