<script setup lang="ts">
import { NmorphSkeleton } from "@nmorph/nmorph-ui-kit";

const scriptData = "";

const templateData = `
<template>
  <NmorphSkeleton :rows="3" :loading="true" />
</template>
`;
const cssData = `
<style lang="scss">
  .skeleton-rows-overview {
    width: 100%;
    padding: 0 8px;
  }
</style>
`;

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-rows">
    <attribute
      header="Rows"
      :subtitle="$t('overview.skeleton.rows.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="skeleton-rows-overview">
          <ClientOnly>
            <NmorphSkeleton :rows="3" :loading="true" />
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
.skeleton-rows-overview {
  width: 100%;
  padding: 0 8px;
}
</style>
