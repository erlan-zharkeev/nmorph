<template>
  <div class="wrapper">
    <NmorphCard>
      <NmorphCalendar />
    </NmorphCard>
  </div>
</template>

<script lang="ts" setup>
import { NmorphCard, NmorphCalendar } from './../../../library/src/components';

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
