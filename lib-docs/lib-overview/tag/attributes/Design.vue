<script setup lang="ts">
import { NmorphTagItem } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = "";
const templateData = `
<template>
  <NmorphTagItem value="1" text="tag one" design="nmorph" />
  <NmorphTagItem value="2" text="tag two" design="common" />
</template>
`;
const cssData = "";

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-design">
    <Attribute header="Design" :subtitle="$t('overview.tag-item.design.subtitle')" :codeToCopy="code">
      <template #overview>
        <div class="tag-design-overview">
          <ClientOnly>
            <NmorphTagItem value="1" :text="$t('overview.tag-one')" design="nmorph" />
            <NmorphTagItem value="2" :text="$t('overview.tag-two')" design="common" />
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
.tag-design-overview {}
</style>
