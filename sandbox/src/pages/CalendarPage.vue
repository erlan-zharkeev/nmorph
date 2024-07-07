<template>
  <div class="wrapper">
    <NmorphCard>
      <div class="calendar-wrapper">
        <NmorphCalendar
          :initialDate="new Date(2024, 3, 1)"
          v-model="selectedValue"
        >
          <template #date-cell="{ scope }">
            {{ scope.isToday ? "TODAY" : scope.value }}
          </template>
        </NmorphCalendar>
      </div>
    </NmorphCard>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { NmorphCard, NmorphCalendar } from "./../../../library/src/components";
const selectedValue = ref([new Date(2024, 3, 30)]);
</script>

<style lang="scss">
.divider {
  margin: 20px;
}

.wrapper {
  // background-color: var(--nmorph-main-color);
  height: 100vh;
  padding: 0;
}
</style>
