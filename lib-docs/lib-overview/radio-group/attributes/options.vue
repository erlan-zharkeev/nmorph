<script setup lang="ts">
import { NmorphRadioGroup } from "@nmorph/nmorph-ui-kit";

const scriptData = "";

const templateData = "";

const cssData = "";

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-options">
    <attribute
      header="Options"
      :subtitle="$t('overview.radio-group.options.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="radio-group-options-overview">
          <ClientOnly>
            <NmorphRadioGroup />
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
.radio-group-options-overview {
}
</style>
