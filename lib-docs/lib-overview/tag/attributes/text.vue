<script setup lang="ts">
import { NmorphTag } from "@nmorph/nmorph-ui-kit";

const scriptData = "";

const templateData = `
<NmorphTag value="1" text="tag one" :removable="false" />
<NmorphTag value="2" text="tag two" :removable="false" />
`;

const cssData = "";

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-text">
    <attribute
      header="Text"
      :subtitle="$t('overview.tag.text.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="tag-text-overview">
          <ClientOnly>
            <NmorphTag value="1" text="tag one" :removable="false" />
            <NmorphTag value="2" text="tag two" :removable="false" />
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
  .nmorph-tag {
    margin-right: 8px;
  }
}
</style>
