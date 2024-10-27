
<script setup lang="ts">
import { NmorphCheckbox } from "@nmorph/nmorph-ui-kit";

const scriptData = "";

const templateData = "";

const cssData = "";

const code = [scriptData, templateData, cssData];

</script>

<template>
  <div id="content-id">
    <attribute
      header="Id"
      :subtitle="$t('overview.checkbox.id.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="checkbox-id-overview">
          <ClientOnly>
            <NmorphCheckbox />
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
.checkbox-id-overview {}
</style>
