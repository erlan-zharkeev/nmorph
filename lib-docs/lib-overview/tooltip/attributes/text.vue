<script setup lang="ts">
import { NmorphTooltip, NmorphButton } from "@nmorph/nmorph-ui-kit";

const scriptData = "";

const templateData = `
<template>
  <NmorphTooltip text="i am tooltip">
    <NmorphButton text="hover-me" />
  </NmorphTooltip>
</template>
`;
const cssData = "";
const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-text">
    <attribute
      header="Text"
      :subtitle="$t('overview.tooltip.text.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="tooltip-text-overview">
          <ClientOnly>
            <NmorphTooltip :text="$t('overview.tooltip.text.i-am-tooltip')">
              <NmorphButton :text="$t('overview.tooltip.text.hover-me')" />
            </NmorphTooltip>
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
