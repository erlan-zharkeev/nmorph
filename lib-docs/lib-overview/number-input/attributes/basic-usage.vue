<script setup lang="ts">
import { NmorphNumberInput } from "@nmorph/nmorph-ui-kit";

const scriptData = `
<script lang="ts" setup>
  const value = ref(3);
<\/script>
`;

const templateData = `
<template>
  <NmorphNumberInput v-model="value" :max="5" :min="1" :step="1" />
</template>
`;

const cssData = "";

const code = [scriptData, templateData, cssData];
const value = ref(3);
</script>

<template>
  <div id="content-basic-usage">
    <attribute :header="$t('overview.basic-usage')" :codeToCopy="code">
      <template #overview>
        <div class="number-input-basic-usage-overview">
          <ClientOnly>
            <NmorphNumberInput v-model="value" :max="5" :min="1" :step="1" />
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
.number-input-basic-usage-overview {
  width: 200px;
}
</style>
