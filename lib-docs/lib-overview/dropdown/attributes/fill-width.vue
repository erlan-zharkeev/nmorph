
<script setup lang="ts">
import { NmorphDropdown } from "@nmorph/nmorph-ui-kit";

const scriptData = "";

const templateData = "";

const cssData = "";

const code = [scriptData, templateData, cssData];

</script>

<template>
  <div id="content-fill-width">
    <attribute
      header="Fill-width"
      :subtitle="$t('overview.dropdown.fill-width.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="dropdown-fill-width-overview">
          <ClientOnly>
            <NmorphDropdown />
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
.dropdown-fill-width-overview {}
</style>
