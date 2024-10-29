<script setup lang="ts">
import { NmorphTextInput } from "@nmorph/nmorph-ui-kit";

const scriptData = `
<script lang="ts">
  const text = ref("Initial text");
<\/script>
`;

const templateData = `
<template>
  <NmorphTextInput clearable v-model="text" />
</template>
`;

const cssData = "";

const code = [scriptData, templateData, cssData];
const text = ref("Initial text");
</script>

<template>
  <div id="content-clearable">
    <attribute
      header="Clearable"
      :subtitle="$t('overview.text-input.clearable.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="text-input-clearable-overview">
          <ClientOnly>
            <NmorphTextInput clearable v-model="text" />
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
.text-input-clearable-overview {
}
</style>
