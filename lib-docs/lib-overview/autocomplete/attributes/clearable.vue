
<script setup lang="ts">
import { NmorphAutocomplete } from "@nmorph/nmorph-ui-kit";

const scriptData = "";

const templateData = "";

const cssData = "";

const code = [scriptData, templateData, cssData];

</script>

<template>
  <div id="content-clearable">
    <attribute
      header="Clearable"
      :subtitle="$t('overview.autocomplete.clearable.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="autocomplete-clearable-overview">
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
.autocomplete-clearable-overview {}
</style>
