<script setup lang="ts">
import { NmorphCheckboxGroup } from "@nmorph/nmorph-ui-kit";

const scriptData = "";

const templateData = "";

const cssData = "";

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-fill">
    <attribute
      header="Fill"
      :subtitle="$t('overview.checkbox-group.fill.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="checkbox-group-fill-overview">
          <ClientOnly>
            <NmorphCheckboxGroup />
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
.checkbox-group-fill-overview {
}
</style>
