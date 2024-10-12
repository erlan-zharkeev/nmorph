
<script setup lang="ts">
import { NmorphTable } from "@nmorph/nmorph-ui-kit";

const scriptData = "";

const templateData = "";

const cssData = "";

const code = [scriptData, templateData, cssData];

</script>

<template>
  <div id="content-row-hover">
    <attribute
      header="Row-hover"
      :subtitle="$t('overview.table.row-hover.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="table-row-hover-overview">
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
.table-row-hover-overview {}
</style>
