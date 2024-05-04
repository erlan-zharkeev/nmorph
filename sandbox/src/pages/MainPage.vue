<template>
  <div class="wrapper">
    <NmorphCard>
      <NmorphBadge value="жопа">
        <NmorphButton text="click me" />
      </NmorphBadge>
    </NmorphCard>
  </div>
</template>

<script lang="ts" setup>
// import { ref } from 'vue';
import {
  NmorphCard,
  NmorphButton,
  NmorphBadge,
} from "./../../../library/src/components";
// const value = ref(50);
</script>

<style lang="scss">
// .nmorph-card {
//   height: 50%;
//   overflow: hidden;
// }

// .wrapper {
//   background-color: var(--main-bg);
//   height: 100vh;
//   padding: 0;
//   display: flex;
// }
</style>
