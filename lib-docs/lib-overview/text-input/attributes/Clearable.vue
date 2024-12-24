<script setup lang="ts">
import { NmorphTextInput } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = `
<script lang="ts" setup>
  const text = ref("Lorem ipsum");
<\/script>
`;

const templateData = `
<template>
  <NmorphTextInput clearable v-model="text" />
</template>
`;

const cssData = "";

const code = [scriptData, templateData, cssData];
const text = ref("Lorem ipsum");
</script>

<template>
  <div id="content-clearable">
    <Attribute header="Clearable" :subtitle="$t('overview.text-input.clearable.subtitle')" :codeToCopy="code">
      <template #overview>
        <div class="text-input-clearable-overview">
          <ClientOnly>
            <NmorphTextInput clearable v-model="text" />
          </ClientOnly>
        </div>
      </template>
      <template #code>
        <code-slot-data :template-data="templateData" :script-data="scriptData" :css-data="cssData" />
      </template>
    </Attribute>
  </div>
</template>

<style lang="scss">
.text-input-clearable-overview {}
</style>
