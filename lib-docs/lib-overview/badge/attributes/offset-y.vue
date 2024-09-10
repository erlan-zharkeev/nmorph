
<script setup lang="ts">
import { NmorphBadge } from "@nmorph/nmorph-ui-kit";

const scriptData = "";

const templateData = "";

const cssData = "";

const code = [scriptData, templateData, cssData];

</script>

<template>
  <div id="content-offset-y">
    <attribute
      header="Offset Y"
      :subtitle="$t('overview.badge.offset-y.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="badge-offset-y-overview">
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
.badge-offset-y-overview {}
</style>
