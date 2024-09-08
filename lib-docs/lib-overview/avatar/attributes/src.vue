
<script setup lang="ts">
import { NmorphAvatar } from "@nmorph/nmorph-ui-kit";

const scriptData = `
`;

const templateData = ``;

const cssData = `
// <style lang="scss"></style>
`;

const code = [scriptData, templateData, cssData];

</script>

<template>
  <div id="content-src">
    <attribute
      header="src"
      :subtitle="$t('overview.avatar.src.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="avatar-src-overview">
          <ClientOnly>
            <NmorphAvatar />
          </ClientOnly>
        </div>
      </template>
      <template #code>
        <code-example v-if="templateData" lang="html">{{ templateData }}</code-example>
        <code-example v-if="scriptData" lang="javascript">{{ scriptData }}</code-example>
        <code-example v-if="cssData" lang="css">{{ cssData }}</code-example>
      </template>
    </attribute>
  </div>
</template>

<style lang="scss">
.avatar-src-overview {}
</style>
