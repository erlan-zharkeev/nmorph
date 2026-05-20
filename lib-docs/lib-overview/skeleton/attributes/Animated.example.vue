<script setup lang="ts">
import {
  NmorphAvatar,
  NmorphSkeleton,
  NmorphSkeletonItem,
  NmorphSwitch,
  NmorphImage,
} from "@nmorph/nmorph-ui-kit";

const animated = ref(true);
</script>

<template>
  <div class="skeleton-animated-overview">
    <ClientOnly>
      <div class="switch">
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
          <NmorphSkeletonItem variant="circle" width="50px" height="50px" />
        </template>
        <template #default>
          <span>Lorem</span>
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
    </ClientOnly>
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
