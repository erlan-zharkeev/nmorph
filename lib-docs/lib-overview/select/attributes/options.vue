
<script setup lang="ts">
import { NmorphSelect } from "@nmorph/nmorph-ui-kit";

const scriptData = "";

const templateData = "";

const cssData = "";

const code = [scriptData, templateData, cssData];

</script>

<template>
  <div id="content-options">
    <attribute
      header="Options"
      :subtitle="$t('overview.select.options.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="select-options-overview">
          <ClientOnly>
            <NmorphSelect />
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
.select-options-overview {}
</style>
