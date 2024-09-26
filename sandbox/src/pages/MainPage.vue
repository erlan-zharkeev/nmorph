<template>
  <div ref="translateBtn" class="docs-top-bar__translate-btn">
    <NmorphCheckbox
      v-model="open"
      size="small"
      class="docs-top-bar__translate-checkbox"
      design="button"
      @click="clickHandler"
      @update:model-value="update"
    >
      <template #label>
        <ClientOnly>
          <NmorphIcon> T </NmorphIcon>
        </ClientOnly>
      </template>
    </NmorphCheckbox>
    <NmorphDropdown
      v-if="translateBtn"
      :fill-width="false"
      :open="open"
      :relative-element="translateBtn"
      @on-outside-click="closeHandler"
      :x-offset="-40"
      :y-offset="10"
      :width="100"
    >
      <ul class="docs-translates__dropdown">
        <li>First</li>
        <li>Second</li>
      </ul>
    </NmorphDropdown>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
  NmorphTagItem,
  NmorphSkeletonItem,
} from "./../../../library/src/components";
import NmorphSkeleton from "../../../library/src/components/data/nmorph-skeleton/NmorphSkeleton.vue";

const translateBtn = ref(null);
const open = ref(false);
const closeHandler = () => {
  open.value = false;
};
const clickHandler = (e) => {
  console.log("click", e);
};
const update = (e) => {
  open.value = e;
  console.log("click", e);
};
</script>

<style lang="scss">
.docs-top-bar__translate-btn {
  padding: 20px;
}
</style>
