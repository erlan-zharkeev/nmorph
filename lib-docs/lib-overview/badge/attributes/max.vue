<script setup lang="ts">
import { NmorphBadge, NmorphButton } from "@nmorph/nmorph-ui-kit";

const scriptData = "";

const templateData = `
<template>
  <NmorphBadge :max="18" :value="100">
    <NmorphButton text="button" />
  </NmorphBadge>
</template>
`;
const cssData = "";

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-max">
    <attribute
      header="Max"
      :subtitle="$t('overview.badge.max.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="badge-max-overview">
          <ClientOnly>
            <NmorphBadge :max="18" :value="100">
              <NmorphButton text="button" />
            </NmorphBadge>
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
.badge-max-overview {
}
</style>
