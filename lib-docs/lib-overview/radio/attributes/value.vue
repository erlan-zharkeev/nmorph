
<script setup lang="ts">
import { NmorphRadio } from "@nmorph/nmorph-ui-kit";

const scriptData = "";

const templateData = "";

const cssData = "";

const code = [scriptData, templateData, cssData];

</script>

<template>
  <div id="content-value">
    <attribute
      header="Value"
      :subtitle="$t('overview.radio.value.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="radio-value-overview">
          <ClientOnly>
            <NmorphRadio />
          </ClientOnly>
        </div>
      </template>
      <template #code>
        <code-example v-if="templateData" lang="html">{{ templateData }}</code-example>
        <code-example v-if="scriptData" lang="javascript">{{ scriptData }}</code-example>
        <code-example v-if="cssData" lang="css">{{ cssData }}</code-example>
      </template>
    </attribute>
  </div>
</template>

<style lang="scss">
.radio-value-overview {}
</style>
