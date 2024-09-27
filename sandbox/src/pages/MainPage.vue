<template>
  <div ref="translateBtn" class="docs-top-bar__translate-btn">
    <NmorphProgress
      :percentage="33"
      :circle-size="100"
      type="circle"
      color="cyan"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { NmorphProgress } from "./../../../library/src/components";

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
