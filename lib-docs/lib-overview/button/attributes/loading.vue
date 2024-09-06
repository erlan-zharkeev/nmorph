<script setup lang="ts">
import { NmorphButton } from "@nmorph/nmorph-ui-kit";

const scriptData = `
<script setup lang="ts">
const loading = true
<\/script>
`;
const templateData = `
<NmorphButton style-type="default" loading />
<NmorphButton style-type="transparent" loading />
`;
const cssData = `
<style lang="scss">
.nmorph-button {
  margin: 0 8px;
}
</style>
`;
const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-loading">
    <attribute
      header="Loading"
      :subtitle="$t('overview.button.loading.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="button-loading-overview">
          <ClientOnly>
            <NmorphButton style-type="default" loading />
            <NmorphButton style-type="transparent" loading />
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
.button-loading-overview {
  .nmorph-button {
    margin: 0 8px;
  }
}
</style>
