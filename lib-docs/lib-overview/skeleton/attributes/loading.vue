<script setup lang="ts">
import { NmorphSkeleton } from "@nmorph/nmorph-ui-kit";

const scriptData = "";

const templateData = "";

const cssData = "";

const code = [scriptData, templateData, cssData];
const loading = ref(true);
</script>

<template>
  <div id="content-loading">
    <attribute
      header="Loading"
      :subtitle="$t('overview.skeleton.loading.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="skeleton-loading-overview">
          <ClientOnly>
            <div class="skeleton-loading-overview__switch">
              <span>Loading state</span>
              <NmorphSwitch v-model="loading" />
            </div>
            <NmorphSkeleton :loading="loading">
              <template #template>
                <NmorphSkeletonItem
                  variant="image"
                  width="200px"
                  height="200px"
                  :style="{ 'margin-bottom': '8px' }"
                />
                <NmorphSkeletonItem variant="rect" width="100%" height="14px" />
              </template>
              <template #default>
                <img
                  :src="Winter"
                  :style="{
                    width: '200px',
                    height: '200px',
                    'margin-bottom': '6px',
                  }"
                />
                <span>Text</span>
              </template>
            </NmorphSkeleton>
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
.skeleton-loading-overview {
  .skeleton-loading-overview__switch {
    display: flex;
    margin-bottom: 8px;
    .nmorph-switch {
      margin-left: 8px;
    }
  }
}
</style>
