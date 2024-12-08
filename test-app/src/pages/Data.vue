<template>
  <div class="data page">
    <div class="page__element">
      <NmorphAvatar src="https://picsum.photos/200/300" />
    </div>
    <div class="page__element">
      <NmorphBadge value="5">
        <span>BADGE</span>
      </NmorphBadge>
    </div>
    <div class="page__element">
      <NmorphCard>
        <div class="calendar-wrapper">
          <NmorphCalendar :initial-date="new Date(2024, 3, 1)" type="dates" v-model="selectedValue">
            <template #date-cell="{ scope }">
              {{ scope.isToday ? "TODAY" : scope.value }}
            </template>
          </NmorphCalendar>
        </div>
      </NmorphCard>
    </div>
    <div class="page__element">
      <NmorphTagList v-model="tagList" />
    </div>
    <div class="page__element">
      <NmorphProgress :percentage="percentage" />
    </div>
    <div class="page__element">
      <NmorphProgress type="circle" :percentage="50" class="circle-progress" color="pink" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { NmorphCard, NmorphCalendar, NmorphAvatar, NmorphBadge, NmorphTagList, NmorphProgress } from "@nmorph/nmorph-ui-kit";
const selectedValue = ref([new Date(2024, 3, 30)]);
const tagList = ref([
  { value: "3", text: "Lorem ipsum" },
  { value: "4", text: "Neque porro quisquam" },
  { value: "5", text: "There is no one who loves ", removable: false },
]);

const percentage = ref(80)
</script>

<style>
.divider {
  margin: 20px;
}
</style>
