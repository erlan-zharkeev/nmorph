
<script setup lang="ts">
import { NmorphAutocomplete } from "@nmorph/nmorph-ui-kit";

const scriptData = "";

const templateData = "";

const cssData = "";

const code = [scriptData, templateData, cssData];

</script>

<template>
  <div id="content-placeholder">
    <attribute
      header="Placeholder"
      :subtitle="$t('overview.autocomplete.placeholder.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="autocomplete-placeholder-overview">
          <ClientOnly>
            <NmorphAutocomplete />
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
.autocomplete-placeholder-overview {}
</style>
