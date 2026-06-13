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
  <div class="image-loading-slot-overview">
    <NmorphImage
      :key="imageKey"
      :src="imageSrc"
      width="300px"
      height="300px"
      @error="errorHandler"
    />
    <NmorphImage
      :key="imageKey"
      :src="imageSrc"
      width="300px"
      height="300px"
      @error="errorHandler"
    >
      <template #loading>
        <NmorphIcon size="large" color="var(--nmorph-accent-color)">
          <NmorphIconLoader />
        </NmorphIcon>
      </template>
    </NmorphImage>
  </div>
</template>

<style lang="scss">
.image-loading-slot-overview {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
  width: 100%;
}
</style>
