<script setup lang="ts">
import { NmorphNumberInput } from "@nmorph/nmorph-ui-kit";

const scriptData = "";

const templateData = "";

const cssData = "";

const code = [scriptData, templateData, cssData];
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
.number-input-action-btn-position-right-overview {
}
</style>
