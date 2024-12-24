<script setup lang="ts">
import {
  NmorphImage,
  NmorphSkeleton,
  NmorphSwitch,
} from "@nmorph/nmorph-ui-kit";
import { Winter } from "@/assets/images";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = `
<script lang="ts" setup>
  const loading = ref(true);
<\/script>
`;

const templateData = `
<template>
  <div class="switch">
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
      <NmorphImage
        :src="Winter"
        :style="{
          width: '200px',
          height: '200px',
          'margin-bottom': '5px',
        }"
      />
      <span>Text</span>
    </template>
  </NmorphSkeleton>
</template>
`;

const cssData = `
<style lang="scss">
  .skeleton-loading-overview {
    .switch {
      display: flex;
      margin-bottom: 8px;
      .nmorph-switch {
        margin-left: 8px;
      }
    }
  }
</style>
`;

const code = [scriptData, templateData, cssData];
const loading = ref(true);
</script>

<template>
  <div id="content-loading">
    <Attribute header="Loading" :subtitle="$t('overview.skeleton.loading.subtitle')" :codeToCopy="code">
      <template #overview>
        <div class="skeleton-loading-overview">
          <ClientOnly>
            <div class="switch">
              <span>{{ $t("overview.loading-state") }}</span>
              <NmorphSwitch v-model="loading" />
            </div>
            <NmorphSkeleton :loading="loading">
              <template #template>
                <NmorphSkeletonItem variant="image" width="200px" height="200px" :style="{ 'margin-bottom': '8px' }" />
                <NmorphSkeletonItem variant="rect" width="100%" height="14px" />
              </template>
              <template #default>
                <NmorphImage :src="Winter" :style="{
                  width: '200px',
                  height: '200px',
                  'margin-bottom': '5px',
                }" />
                <span>Lorem</span>
              </template>
            </NmorphSkeleton>
          </ClientOnly>
        </div>
      </template>
      <template #code>
        <code-slot-data :template-data="templateData" :script-data="scriptData" :css-data="cssData" />
      </template>
    </Attribute>
  </div>
</template>

<style lang="scss">
.skeleton-loading-overview {
  .switch {
    display: flex;
    margin-bottom: 8px;

    .nmorph-switch {
      margin-left: 8px;
    }
  }
}
</style>
