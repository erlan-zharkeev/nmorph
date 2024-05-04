<template>
  <div class="wrapper">
    <NmorphCard>
      <NmorphAvatar
        :size="50"
        fit="contain"
        src="https://secure.gravatar.com/avatar/51d3c935ea5453b2915e6180a9944c11/?default=https%3A%2F%2Fvanillicon.com%2F8fff907b6502f8011495fb154ec1c0a2_200.png&rating=g&size=560"
        ><img
          src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
      /></NmorphAvatar>
    </NmorphCard>
  </div>
</template>

<script lang="ts" setup>
// import { ref } from 'vue';
import {
  NmorphCard,
  NmorphButton,
  NmorphBadge,
  NmorphAvatar,
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
