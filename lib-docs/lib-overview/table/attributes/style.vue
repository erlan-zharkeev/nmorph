
<script setup lang="ts">
import { NmorphTable } from "@nmorph/nmorph-ui-kit";

const scriptData = "";

const templateData = "";

const cssData = "";

const code = [scriptData, templateData, cssData];

</script>

<template>
  <div id="content-style">
    <attribute
      header="Style"
      :subtitle="$t('overview.table.style.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="table-style-overview">
          <ClientOnly>
            <NmorphTable />
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
.table-style-overview {}
</style>
