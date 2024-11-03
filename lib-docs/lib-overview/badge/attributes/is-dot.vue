<script setup lang="ts">
import { NmorphBadge, NmorphButton } from "@nmorph/nmorph-ui-kit";

const scriptData = "";

const templateData = `
<template>
  <NmorphBadge is-dot>
    <NmorphButton text="button" />
  </NmorphBadge>
</template>
`;
const cssData = `
<style lang="scss">
.badge-is-dot-overview {
  .nmorph-badge {
    --dot-size: 8px;
  }
}
</style>
`;

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-is-dot">
    <attribute
      header="Is Dot"
      :subtitle="$t('overview.badge.is-dot.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="badge-is-dot-overview">
          <ClientOnly>
            <NmorphBadge is-dot>
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
.badge-is-dot-overview {
  .nmorph-badge {
    --dot-size: 8px;
  }
}
</style>
