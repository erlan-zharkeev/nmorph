<template>
  <div ref="translateBtn" class="docs-top-bar__translate-btn">
    <NmorphImagePreview
      :src="[image, image2]"
      v-model="model"
      :initial-index="1"
    />
    <button @click="() => (model = !model)">click me</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import NmorphImagePreview from "../../../library/src/components/data/nmorph-image-preview/NmorphImagePreview.vue";
import image from "./../assets/images/cat.png";
import image2 from "./../assets/images/cat2.webp";

const date2 = new Date(1989, 11, 19);

date2.setDate(date2.getDate() + 2);
const model = ref(false);
</script>

<style lang="scss">
.docs-top-bar__translate-btn {
  padding: 20px;
  display: flex;
}
</style>
