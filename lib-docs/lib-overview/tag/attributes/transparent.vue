<script setup lang="ts">
import { NmorphTag } from "@nmorph/nmorph-ui-kit";

const scriptData = "";

const templateData = `
<NmorphTag value="1" text="tag one" transparent />
<NmorphTag value="2" text="tag two" transparent />
`;

const cssData = "";

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-transparent">
    <attribute
      header="Transparent"
      :subtitle="$t('overview.tag.transparent.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="tag-transparent-overview">
          <ClientOnly>
            <NmorphTag value="1" text="tag one" transparent />
            <NmorphTag value="2" text="tag two" transparent />
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
.tag-transparent-overview {
}
</style>
