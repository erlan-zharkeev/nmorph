<script setup lang="ts">
import {
  NmorphIcon,
  NmorphIconLoader,
  NmorphImage,
} from "@nmorph/nmorph-ui-kit";

const imageSrc = ref("https://httpstat.us/200?sleep=300000");

const errorHandler = () => {
  imageKey.value += 1;
};

const imageKey = ref(0);
</script>

<template>
  <div class="image-loading-text-overview">
    <ClientOnly>
      <NmorphImage
        :src="imageSrc"
        width="300px"
        height="300px"
        @error="errorHandler"
        :key="imageKey"
      />
    </ClientOnly>
    <ClientOnly>
      <NmorphImage
        :src="imageSrc"
        width="300px"
        height="300px"
        @error="errorHandler"
        :key="imageKey"
      >
        <template #loading>
          <NmorphIcon size="large" color="var(--nmorph-accent-color)">
            <NmorphIconLoader />
          </NmorphIcon>
        </template>
      </NmorphImage>
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.image-loading-text-overview {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
  width: 100%;
}
</style>
