<template>
  <div class="main">
    <!-- <NmorphSkeleton :rows="2"> </NmorphSkeleton> -->
    <!-- <NmorphSkeleton :loading="false" :animated="false">
      <template #template>
        <NmorphSkeletonItem variant="image" width="200px" height="200px" />
        <NmorphSkeletonItem variant="rect" width="100%" height="14px" />
        <NmorphSkeletonItem variant="circle" width="140px" height="140px" />
      </template>
      <template #default>
        <img
          src="./../assets/images/cat.png"
          style="
             {
              width: 200px;
              height: 200px;
            }
          "
        />
        <p>Paragraph</p>
      </template>
    </NmorphSkeleton> -->
    <NmorphSkeleton :loading="loading" :rows="4" />
    <NmorphSkeleton :loading="loading">
      <template #template>
        <NmorphSkeletonItem variant="image" width="200px" height="200px" />
        <NmorphSkeletonItem variant="rect" width="100%" height="14px" />
        <NmorphSkeletonItem variant="rect" width="100%" height="14px" />
      </template>
      <template #default>
        <div class="x">
          <NmorphImage :src="Cat" @load="loadHandler" />
        </div>
        <p>Paragraph</p>
      </template>
    </NmorphSkeleton>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
  NmorphSkeleton,
  NmorphSkeletonItem,
  NmorphImage,
} from "./../../../library/src/components";
import Cat from "./../assets/images/cat.png";
const loading = ref(true);

const loadHandler = () => {
  console.log("object");
  // loading.value = false;
};
</script>

<style lang="scss">
.main {
  padding: 20px;
}

.x {
  width: 200px;
  height: 200px;
}

.nmorph-card {
  margin-left: 100px;
  width: 200px;
}
</style>
