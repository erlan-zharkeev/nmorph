<script setup lang="ts">
import {
  NmorphImage,
  NmorphSkeleton,
  NmorphSkeletonItem,
  NmorphSwitch,
} from "@nmorph/nmorph-ui-kit";
import { Winter } from "@/assets/images";

const loading = ref(true);
</script>

<template>
  <div class="skeleton-loading-overview">
    <ClientOnly>
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
          <span>Lorem</span>
        </template>
      </NmorphSkeleton>
    </ClientOnly>
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
