<script setup lang="ts">
import { NmorphNumberInput } from "@nmorph/nmorph-ui-kit";

const scriptData = "";

const templateData = "";

const cssData = "";

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-step">
    <attribute
      header="Step"
      :subtitle="$t('overview.number-input.step.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="number-input-step-overview">
          <ClientOnly>
            <NmorphNumberInput />
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
.number-input-step-overview {
}
</style>
