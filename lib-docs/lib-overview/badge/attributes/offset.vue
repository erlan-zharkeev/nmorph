<script setup lang="ts">
import { NmorphBadge } from "@nmorph/nmorph-ui-kit";

const scriptData = "";

const templateData = `
<div class="badge-value-overview__element">
  <NmorphBadge :value="1" :offsetX="10" :offsetY="10">
    <NmorphButton text="button" />
  </NmorphBadge>
</div>
<div class="badge-value-overview__element">
  <NmorphBadge value="abc" :offsetX="-70" :offsetY="-35">
    <NmorphButton text="button" />
  </NmorphBadge>
</div>
`;

const cssData = `
<style lang="scss">
.badge-value-overview__element {
  margin-right: 24px;
}
</style>
`;

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-offset">
    <attribute
      header="Offset"
      :subtitle="$t('overview.badge.offset.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="badge-offset-overview">
          <ClientOnly>
            <div class="badge-value-overview__element">
              <NmorphBadge :value="1" :offsetX="10" :offsetY="10">
                <NmorphButton text="button" />
              </NmorphBadge>
            </div>
            <div class="badge-value-overview__element">
              <NmorphBadge value="abc" :offsetX="-70" :offsetY="-35">
                <NmorphButton text="button" />
              </NmorphBadge>
            </div>
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
.badge-offset-overview {
  display: flex;
  .badge-value-overview__element {
    margin-right: 24px;
  }
}
</style>
