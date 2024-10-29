<script setup lang="ts">
import { NmorphCheckbox } from "@nmorph/nmorph-ui-kit";

const scriptData = `
<script lang="ts">
const value = ref(false);
<\/script>
`;

const templateData = `
<template>
  <NmorphCheckbox v-model="value" id="1" />
  <NmorphCheckbox
    v-model="value"
    id="2"
    design="button"
    :label="String(value)"
  />
</template>
`;

const cssData = "";
const code = [scriptData, templateData, cssData];

const value = ref(false);
</script>

<template>
  <div id="content-design">
    <attribute
      header="Design"
      :subtitle="$t('overview.checkbox.design.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="checkbox-design-overview">
          <ClientOnly>
            <NmorphCheckbox v-model="value" id="1" />
            <NmorphCheckbox
              v-model="value"
              id="2"
              design="button"
              :label="String(value)"
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
.checkbox-design-overview {
  .nmorph-checkbox {
    margin-right: 8px;
  }
}
</style>
