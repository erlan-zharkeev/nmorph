<script setup lang="ts">
import { NmorphCheckboxGroup } from "@nmorph/nmorph-ui-kit";

const scriptData = `
<script lang="ts">
const options = [
  { id: "1", disabled: true, label: "1" },
  { id: "2", label: "2" },
  { id: "3", label: "3" },
];

const value = ref(["2"]);
<\/script>
`;

const templateData = `
<template>
  <NmorphCheckboxGroup
    v-model="value"
    :options="options"
    direction="column"
  />
  <NmorphCheckboxGroup
    v-model="value"
    :options="options"
    direction="row"
    design="button"
  />
</template>
`;
const cssData = "";
const code = [scriptData, templateData, cssData];
const options = [
  { id: "1", disabled: true, label: "1" },
  { id: "2", label: "2" },
  { id: "3", label: "3" },
];

const value = ref(["2"]);
</script>

<template>
  <div id="content-model-value">
    <attribute :header="$t('overview.basic-usage')" :codeToCopy="code">
      <template #overview>
        <div class="checkbox-group-model-value-overview">
          <ClientOnly>
            <NmorphCheckboxGroup
              v-model="value"
              :options="options"
              direction="column"
            />
            <NmorphCheckboxGroup
              v-model="value"
              :options="options"
              direction="row"
              design="button"
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
.checkbox-group-model-value-overview {
  .nmorph-checkbox-group {
    margin-right: 24px;
  }
}
</style>
