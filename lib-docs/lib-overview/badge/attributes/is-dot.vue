
<script setup lang="ts">
import { NmorphBadge } from "@nmorph/nmorph-ui-kit";

const scriptData = "";

const templateData = "";

const cssData = "";

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
            <NmorphBadge />
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
.badge-is-dot-overview {}
</style>
