<script setup lang="ts">
import { NmorphCheckbox } from "@nmorph/nmorph-ui-kit";

const scriptData = `
<script lang="ts">
const value = ref(true);
<\/script>
`;

const templateData = `
<template>
  <NmorphCheckbox
    v-model="value"
    label="Label"
  />
</template>
`;
const cssData = "";
const code = [scriptData, templateData, cssData];

const value = ref(true);
</script>

<template>
  <div id="content-model-value">
    <attribute
      header="Model-value"
      :subtitle="$t('overview.checkbox.model-value.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="checkbox-model-value-overview">
          <ClientOnly>
            <NmorphCheckbox
              id="1"
              v-model="value"
              :label="$t('overview.checkbox.model-value.label')"
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
.checkbox-model-value-overview {
}
</style>
