<script setup lang="ts">
import {
  NmorphAvatar,
  NmorphSkeleton,
  NmorphSkeletonItem,
  NmorphSwitch,
  NmorphImage,
} from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = `
<script lang="ts" setup>
  const animated = ref(true);
<\/script>
`;

const templateData = `
<template>
  <div class="skeleton-animated-overview__switch">
    <span>Animated</span>
    <NmorphSwitch v-model="animated" />
  </div>
  <NmorphSkeleton :loading="true" :animated="animated">
    <template #template>
      <NmorphSkeletonItem variant="rect" width="100%" height="14px" />
      <NmorphSkeletonItem
        variant="image"
        width="200px"
        height="200px"
        :style="{ 'margin-bottom': '8px' }"
      />
      <NmorphSkeletonItem
        variant="circle"
        width="50px"
        height="50px"
      />
    </template>
    <template #default>
      <span>Text</span>
      <NmorphImage
        src="./image.jpg"
        :style="{
          width: '200px',
          height: '200px',
          'margin-bottom': '8px',
        }"
      />
      <NmorphAvatar
        src="./avatar.jpg"
        :style="{
          width: '50px',
          height: '50px',
        }"
      />
    </template>
  </NmorphSkeleton>
</template>
`;
const cssData = `
<style lang="scss">
  .skeleton-animated-overview {
    margin-left: 8px;

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
const animated = ref(true);
</script>

<template>
  <div id="content-animated">
    <Attribute header="Animated" :subtitle="$t('overview.skeleton.animated.subtitle')" :codeToCopy="code">
      <template #overview>
        <div class="skeleton-animated-overview">
          <ClientOnly>
            <div class="switch">
              <span>{{ $t("overview.animated") }}</span>
              <NmorphSwitch v-model="animated" />
            </div>
            <NmorphSkeleton :loading="true" :animated="animated">
              <template #template>
                <NmorphSkeletonItem variant="rect" width="100%" height="14px" />
                <NmorphSkeletonItem variant="image" width="200px" height="200px" :style="{ 'margin-bottom': '8px' }" />
                <NmorphSkeletonItem variant="circle" width="50px" height="50px" />
              </template>
              <template #default>
                <span>Lorem</span>
                <NmorphImage src="./image.jpg" :style="{
                  width: '200px',
                  height: '200px',
                  'margin-bottom': '8px',
                }" />
                <NmorphAvatar src="./avatar.jpg" :style="{
                  width: '50px',
                  height: '50px',
                }" />
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
.skeleton-animated-overview {
  margin-left: 8px;

  .switch {
    display: flex;
    margin-bottom: 8px;

    .nmorph-switch {
      margin-left: 8px;
    }
  }
}
</style>
