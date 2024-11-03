<script setup lang="ts">
import { NmorphTooltip, NmorphButton } from "@nmorph/nmorph-ui-kit";

const scriptData = "";

const templateData = `
<template>
  <NmorphTooltip
    text="Tooltip"
    force-show
    position="right"
    :force-coordinate="{ x: '200px', y: '50px' }"
  >
    <NmorphButton text="OK" />
  </NmorphTooltip>
</template>
`;
const cssData = "";
const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-force-coordinate">
    <attribute
      header="Force coordinate"
      :subtitle="$t('overview.tooltip.force-coordinate.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="tooltip-force-coordinate-overview">
          <ClientOnly>
            <NmorphTooltip
              text="Tooltip"
              force-show
              position="right"
              :force-coordinate="{ x: '200px', y: '50px' }"
            >
              <NmorphButton text="OK" />
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

<style lang="scss">
.tooltip-force-coordinate-overview {
}
</style>
