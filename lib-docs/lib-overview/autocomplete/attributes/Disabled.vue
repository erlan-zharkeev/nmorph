<script setup lang="ts">
import { NmorphAutocomplete } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = `
<script setup lang="ts">
  const list = [];
<\/script>
`;

const templateData = `
<template>
  <NmorphAutocomplete :list="list" disabled />
</template>
`;
const cssData = "";

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-disabled">
    <Attribute header="Disabled" :subtitle="$t('overview.autocomplete.disabled.subtitle')" :codeToCopy="code">
      <template #overview>
        <div class="autocomplete-disabled-overview">
          <ClientOnly>
            <NmorphAutocomplete :list="[]" disabled />
          </ClientOnly>
        </div>
      </template>
      <template #code>
        <code-slot-data :template-data="templateData" :script-data="scriptData" :css-data="cssData" />
      </template>
    </attribute>
  </div>
</template>
