<script setup lang="ts">
import { NmorphProgress } from "@nmorph/nmorph-ui-kit";
const percentage = 33;

const scriptData = "";

const templateData = `
<div class="progress-value-inside-overview">
  <ClientOnly>
    <NmorphProgress
      :percentage="percentage"
      value-inside
      :value-right-side="false"
    >
      <template #inner-text>
        <span>i'm slot prefix {{ percentage }}%</span>
      </template>
    </NmorphProgress>
  </ClientOnly>
</div>
`;

const cssData = `
.progress-value-inside-overview {
  width: 100%;
  .nmorph-progress {
    --height: 16px;
  }
}
`;

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-value-inside">
    <attribute
      header="Value Inside"
      :subtitle="$t('overview.progress.value-inside.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="progress-value-inside-overview">
          <ClientOnly>
            <NmorphProgress
              :percentage="percentage"
              value-inside
              :value-right-side="false"
            >
              <template #inner-text>
                <span>i'm slot prefix {{ percentage }}%</span>
              </template>
            </NmorphProgress>
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
.progress-value-inside-overview {
  width: 100%;
  .nmorph-progress {
    --height: 16px;
  }
}
</style>
