<script setup lang="ts">
import { NmorphTagItem } from "@nmorph/nmorph-ui-kit";

const scriptData = "";

const templateData = `
<NmorphTagItem value="1" text="tag one" design="nmorph" />
<NmorphTagItem value="2" text="tag two" design="common" />
`;

const cssData = "";

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-design">
    <attribute
      header="Design"
      :subtitle="$t('overview.tag-item.design.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="tag-design-overview">
          <ClientOnly>
            <NmorphTagItem value="1" text="tag one" design="nmorph" />
            <NmorphTagItem value="2" text="tag two" design="common" />
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
.tag-design-overview {
}
</style>
