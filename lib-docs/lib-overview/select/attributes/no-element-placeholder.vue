
<script setup lang="ts">
import { NmorphSelect } from "@nmorph/nmorph-ui-kit";

const scriptData = "";

const templateData = "";

const cssData = "";

const code = [scriptData, templateData, cssData];

</script>

<template>
  <div id="content-no-element-placeholder">
    <attribute
      header="No-element-placeholder"
      :subtitle="$t('overview.select.no-element-placeholder.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="select-no-element-placeholder-overview">
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
.select-no-element-placeholder-overview {}
</style>
