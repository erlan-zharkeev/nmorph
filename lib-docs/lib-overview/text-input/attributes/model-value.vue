<script setup lang="ts">
import { NmorphTextInput } from "@nmorph/nmorph-ui-kit";

const scriptData = `
<script lang="ts">
  const text = ref("Initial text");
<\/script>
`;
const templateData = "";
const cssData = "";
const code = [scriptData, templateData, cssData];

const text = ref("Initial text");
</script>

<template>
  <div id="content-model-value">
    <attribute
      header="Model-value"
      :subtitle="$t('overview.text-input.model-value.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="text-input-model-value-overview">
          <ClientOnly>
            <p class="nmorph-title-3">Model-text: {{ text }}</p>
            <NmorphTextInput v-model="text" />
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
.text-input-model-value-overview {
  .nmorph-text-input {
    width: 300px;
  }
  p {
    margin-bottom: 8px;
  }
}
</style>
