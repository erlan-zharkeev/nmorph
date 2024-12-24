<script setup lang="ts">
import { NmorphBadge, NmorphButton } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = "";

const templateData = `
<template>
  <NmorphBadge :max="18" :value="100">
    <NmorphButton text="button" />
  </NmorphBadge>
</template>
`;
const cssData = "";

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-max">
    <Attribute header="Max" :subtitle="$t('overview.badge.max.subtitle')" :codeToCopy="code">
      <template #overview>
        <div class="badge-max-overview">
          <ClientOnly>
            <NmorphBadge :max="18" :value="100">
              <NmorphButton text="button" />
            </NmorphBadge>
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
.badge-max-overview {}
</style>
