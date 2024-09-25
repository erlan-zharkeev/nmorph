<template>
  <div class="main">
    <!-- <NmorphSkeleton loading :animated="true">
      <template #template>
        <NmorphSkeletonItem variant="image" width="40px" height="40px" />
        <NmorphSkeletonItem variant="circle" width="40px" height="40px" />
        <NmorphSkeletonItem variant="rect" width="40px" height="40px" />
      </template>
    </NmorphSkeleton>
    <NmorphSkeleton loading :animated="false">
      <template #template>
        <NmorphSkeletonItem variant="image" width="40px" height="40px" />
        <NmorphSkeletonItem variant="circle" width="40px" height="40px" />
        <NmorphSkeletonItem variant="rect" width="40px" height="40px" />
      </template>
    </NmorphSkeleton> -->
    <NmorphTagItem value="1" text="One" transparent />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
  NmorphTagItem,
  NmorphSkeletonItem,
} from "./../../../library/src/components";
import NmorphSkeleton from "../../../library/src/components/data/nmorph-skeleton/NmorphSkeleton.vue";

const list = ref([
  { value: "1", text: "1" },
  { value: "2", text: "2" },
]);
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
