<script setup lang="ts">
import { NmorphTextInput } from "@nmorph/nmorph-ui-kit";

const scriptData = "";

const templateData = "";

const cssData = "";

const code = [scriptData, templateData, cssData];
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
            <NmorphTextInput />
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
}
</style>
