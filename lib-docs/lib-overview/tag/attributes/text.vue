<script setup lang="ts">
import { NmorphTagItem } from "@nmorph/nmorph-ui-kit";

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
.tag-text-overview {
  .nmorph-tag-item {
    margin-right: 8px;
  }
}
</style>
