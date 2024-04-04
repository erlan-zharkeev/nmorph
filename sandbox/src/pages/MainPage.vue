<template>
  <div class="wrapper">
    <NmorphCard>
      <NmorphTimePicker v-model="time" />
    </NmorphCard>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { NmorphTimePicker, NmorphCard } from './../../../library/src/components';
const time = ref([0, 0, 0])
</script>
<style lang="scss">
.divider {
  margin: 20px;
}

.wrapper {
  background-color: var(--main-bg);
  height: 100vh;
  padding: 0;
}
</style>
