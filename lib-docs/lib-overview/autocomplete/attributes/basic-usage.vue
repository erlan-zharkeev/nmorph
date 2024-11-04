<script setup lang="ts">
import { NmorphAutocomplete } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/code-slot-data.vue";

const scriptData = `
<script lang="ts" setup>
  const text = ref("");
  const list = ref([{ value: "First" }, { value: "Second" }, { value: "Third" }]);
<\/script>
`;

const templateData = `
<template>
  <NmorphAutocomplete
    v-model="text"
    :list="list"
    :placeholder="$t('overview.autocomplete.basic-usage.placeholder')"
  />
</template>
`;

const cssData = "";

const code = [scriptData, templateData, cssData];
const text = ref("");
const list = ref([{ value: "First" }, { value: "Second" }, { value: "Third" }]);
</script>

<template>
  <div id="content-basic-usage">
    <attribute :header="$t('overview.basic-usage')" :codeToCopy="code">
      <template #overview>
        <div class="autocomplete-basic-usage-overview">
          <ClientOnly>
            <NmorphAutocomplete
              v-model="text"
              :list="list"
              :placeholder="$t('overview.autocomplete.basic-usage.placeholder')"
            />
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
.autocomplete-basic-usage-overview {
}
</style>
