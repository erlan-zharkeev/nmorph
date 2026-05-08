<script setup lang="ts">
import { NmorphAutocomplete } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = `
<script lang="ts" setup>
  const text = ref("");
  const list = ref([{ value: "First" }, { value: "Second" }, { value: "Third" }]);
<\/script>
`;

const templateData = `
<template>
  <NmorphAutocomplete height="thick" v-model="text" :list="list" />
  <NmorphAutocomplete height="basic" :list="list" />
  <NmorphAutocomplete height="thin" :list="list" />
</template>
`;

const cssData = `
<style lang="scss">
  .autocomplete-height-overview {
    display: flex;
    align-items: center;
    .nmorph-autocomplete {
      margin-right: 8px;
    }
  }
</style>
`;

const code = [scriptData, templateData, cssData];

const text = ref("");
const list = ref([{ value: "First" }, { value: "Second" }, { value: "Third" }]);
</script>

<template>
  <div id="content-height">
    <Attribute header="Height" :subtitle="$t('overview.autocomplete.height.subtitle')" :codeToCopy="code">
      <template #overview>
        <div class="autocomplete-height-overview">
          <ClientOnly>
            <NmorphAutocomplete height="thick" v-model="text" :list="list" />
            <NmorphAutocomplete height="basic" :list="list" />
            <NmorphAutocomplete height="thin" :list="list" />
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
.autocomplete-height-overview {
  display: flex;
  align-items: center;

  .nmorph-autocomplete {
    margin-right: 8px;
  }
}
</style>
