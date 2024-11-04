<script setup lang="ts">
import { NmorphTagItem } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/code-slot-data.vue";

const scriptData = "";
const templateData = `
<template>
  <NmorphTagItem value="1" text="tag one" :removable="false" />
  <NmorphTagItem value="2" text="tag two" :removable="false" />
</template>
`;
const cssData = `
<style lang="scss">
  .tag-text-overview {
    .nmorph-tag-item {
      margin-right: 8px;
    }
  }
</style>
`;

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-text">
    <attribute
      header="Text"
      :subtitle="$t('overview.tag-item.text.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="tag-text-overview">
          <ClientOnly>
            <NmorphTagItem
              value="1"
              :text="$t('overview.tag-one')"
              :removable="false"
            />
            <NmorphTagItem
              value="2"
              :text="$t('overview.tag-two')"
              :removable="false"
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
.tag-text-overview {
  .nmorph-tag-item {
    margin-right: 8px;
  }
}
</style>
