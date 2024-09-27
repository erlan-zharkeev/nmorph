<script setup lang="ts">
import { NmorphProgress } from "@nmorph/nmorph-ui-kit";

const scriptData = "";

const templateData = `
<div class="progress-percentage-overview">
  <NmorphProgress :percentage="33" />
  <NmorphProgress :percentage="66" />
  <NmorphProgress :percentage="99" />
</div>
`;

const cssData = `
.progress-percentage-overview {
  width: 100%;
  .nmorph-progress {
    margin-bottom: 16px;
  }
}
`;

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-percentage">
    <attribute
      header="Percentage"
      :subtitle="$t('overview.progress.percentage.subtitle')"
      info-name="progress.percentage"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="progress-percentage-overview">
          <ClientOnly>
            <NmorphProgress :percentage="33" color="cyan" />
            <NmorphProgress
              :percentage="66"
              color="var(--nmorph-accent-color)"
            />
            <NmorphProgress :percentage="99" />
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
.progress-percentage-overview {
  width: 100%;
  .nmorph-progress {
    margin-bottom: 16px;
  }
}
</style>
