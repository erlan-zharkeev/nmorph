<script setup lang="ts">
import { NmorphTooltip, NmorphButton } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

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
    <Attribute header="Force coordinate" :subtitle="$t('overview.tooltip.force-coordinate.subtitle')"
      :codeToCopy="code">
      <template #overview>
        <div class="tooltip-force-coordinate-overview">
          <ClientOnly>
            <NmorphTooltip text="Tooltip" force-show position="right" :force-coordinate="{ x: '200px', y: '50px' }">
              <NmorphButton text="OK" />
            </NmorphTooltip>
          </ClientOnly>
        </div>
      </template>
      <template #code>
        <code-slot-data :template-data="templateData" :script-data="scriptData" :css-data="cssData" />
      </template>
    </attribute>
  </div>
</template>

<style lang="scss">
.tooltip-force-coordinate-overview {}
</style>
