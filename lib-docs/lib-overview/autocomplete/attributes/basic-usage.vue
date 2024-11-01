<script setup lang="ts">
import { NmorphAutocomplete } from "@nmorph/nmorph-ui-kit";

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
.autocomplete-basic-usage-overview {
}
</style>
