<script setup lang="ts">
import { NmorphAutocomplete } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/code-slot-data.vue";

const scriptData = "";

const templateData = `
<template>
  <NmorphAutocomplete disabled />
</template>
`;
const cssData = "";

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-disabled">
    <attribute
      header="Disabled"
      :subtitle="$t('overview.autocomplete.disabled.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="autocomplete-disabled-overview">
          <ClientOnly>
            <NmorphAutocomplete disabled />
          </ClientOnly>
        </div>
      </template>
      <template #code>
        <code-slot-data
          :template-data="templateData"
          :script-data="scriptData"
          :css-data="cssData"
        />
      </template>
    </attribute>
  </div>
</template>

<style lang="scss">
.autocomplete-disabled-overview {
}
</style>
