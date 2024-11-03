<script setup lang="ts">
import { NmorphBacktop, NmorphScroll } from "@nmorph/nmorph-ui-kit";

const scriptData = "";
const templateData = `
<template>
  <NmorphScroll width="100%" height="600px">
    <div class="content">
      <li v-for="(_, idx) in Array.from({ length: 200 })" :key="idx">
        {{ Scroll down }}
      </li>
    </div>
    <NmorphBacktop design="common" />
  </NmorphScroll>
</template>
`;
const cssData = `
<style lang="scss">
  .backtop-basic-usage-overview {
    width: 100%;
  }
</style>
`;
const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-right">
    <attribute
      :header="$t('overview.basic-usage')"
      :codeToCopy="code"
      info-name="backtop.basic-usage"
    >
      <template #overview>
        <div class="backtop-basic-usage-overview">
          <ClientOnly>
            <NmorphScroll width="100%">
              <div class="content">
                <li v-for="(_, idx) in Array.from({ length: 200 })" :key="idx">
                  {{ $t("overview.backtop.basic-usage.scroll-down") }}
                </li>
              </div>
              <NmorphBacktop design="common" />
            </NmorphScroll>
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
.backtop-basic-usage-overview {
  width: 100%;
}
</style>
