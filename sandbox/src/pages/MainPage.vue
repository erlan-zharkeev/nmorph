<template>
  <div class="wrapper">
    <NmorphCard>
      <NmorphProgress :percentage="value" type="circle" :circleSize="100" />
      <span @click="value = value + 10">click</span>
    </NmorphCard>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { NmorphCard, NmorphProgress } from './../../../library/src/components';
const value = ref(50)
</script>

<style lang="scss">
.wrapper {
  background-color: var(--main-bg);
  height: 100vh;
  padding: 0;
}
</style>
