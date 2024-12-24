<script setup lang="ts">
import { NmorphSkeleton } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = "";

const templateData = `
<template>
  <NmorphSkeleton :rows="3" :loading="true" />
</template>
`;
const cssData = `
<style lang="scss">
  .skeleton-rows-overview {
    width: 100%;
    padding: 0 8px;
  }
</style>
`;

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-rows">
    <Attribute header="Rows" :subtitle="$t('overview.skeleton.rows.subtitle')" :codeToCopy="code">
      <template #overview>
        <div class="skeleton-rows-overview">
          <ClientOnly>
            <NmorphSkeleton :rows="3" :loading="true" />
          </ClientOnly>
        </div>
      </template>
      <template #code>
        <code-slot-data :template-data="templateData" :script-data="scriptData" :css-data="cssData" />
      </template>
    </Attribute>
  </div>
</template>

<style lang="scss">
.skeleton-rows-overview {
  width: 100%;
  padding: 0 8px;
}
</style>
