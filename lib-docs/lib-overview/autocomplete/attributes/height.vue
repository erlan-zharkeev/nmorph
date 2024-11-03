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
  <NmorphAutocomplete height="thick" v-model="text" :list="list" />
  <NmorphAutocomplete height="default" :list="list" />
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
    <attribute
      header="Height"
      :subtitle="$t('overview.autocomplete.height.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="autocomplete-height-overview">
          <ClientOnly>
            <NmorphAutocomplete height="thick" v-model="text" :list="list" />
            <NmorphAutocomplete height="default" :list="list" />
            <NmorphAutocomplete height="thin" :list="list" />
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
.autocomplete-height-overview {
  display: flex;
  align-items: center;
  .nmorph-autocomplete {
    margin-right: 8px;
  }
}
</style>
