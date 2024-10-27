<script setup lang="ts">
import { NmorphNumberInput } from "@nmorph/nmorph-ui-kit";

const scriptData = "";

const templateData = "";

const cssData = "";

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-min">
    <attribute
      header="Min"
      :subtitle="$t('overview.number-input.min.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="number-input-min-overview">
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
.number-input-min-overview {
}
</style>
