<script setup lang="ts">
import { NmorphBadge, NmorphButton } from "@nmorph/nmorph-ui-kit";

const scriptData = "";

const templateData = `
<template>
  <NmorphBadge is-dot color="red">
    <NmorphButton text="button" />
  </NmorphBadge>
  <NmorphBadge color="green" value="abc">
    <NmorphButton text="button" />
  </NmorphBadge>
  <NmorphBadge color="var(--nmorph-warn-color)" :value="1">
    <NmorphButton text="button" />
  </NmorphBadge>
</template>
`;

const cssData = `
<style lang="scss">
.badge-color-overview {
  display: flex;
  .badge-value-overview__element {
    margin-right: 30px;
  }
}
</style>
`;

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-color">
    <attribute
      header="Color"
      :subtitle="$t('overview.badge.color.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="badge-color-overview">
          <ClientOnly>
            <div class="badge-value-overview__element">
              <NmorphBadge is-dot color="red">
                <NmorphButton text="button" />
              </NmorphBadge>
            </div>
            <div class="badge-value-overview__element">
              <NmorphBadge color="green" value="abc">
                <NmorphButton text="button" />
              </NmorphBadge>
            </div>
            <div class="badge-value-overview__element">
              <NmorphBadge color="var(--nmorph-warn-color)" :value="1">
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
.badge-color-overview {
  display: flex;
  .badge-value-overview__element {
    margin-right: 30px;
  }
}
</style>
