<template>
  <div class="wrapper">
    <NmorphCard>
      <div class="calendar-wrapper">
        <NmorphCalendar :date="new Date(2019, 2, 1)">
          <template #date-cell="{ scope }">
            {{ scope.isToday ? 'TODAY': scope.value }}
          </template>
        </NmorphCalendar>
      </div>
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
