<script setup lang="ts">
import { NmorphProgress } from "@nmorph/nmorph-ui-kit";

const scriptData = "";

const templateData = `
<template>
  <div class="progress-indeterminate-overview">
    <NmorphProgress
      :percentage="50"
      indeterminate
      color="var(--nmorph-accent-color)"
    />
  </div>
</template>
`;

const cssData = `
<style lang="scss">
  .progress-indeterminate-overview {
    width: 100%;
  }
</style>
`;

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-indeterminate">
    <attribute
      header="Indeterminate"
      :subtitle="$t('overview.progress.indeterminate.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="progress-indeterminate-overview">
          <ClientOnly>
            <NmorphProgress
              :percentage="50"
              indeterminate
              color="var(--nmorph-accent-color)"
            />
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
.progress-indeterminate-overview {
  width: 100%;
}
</style>
