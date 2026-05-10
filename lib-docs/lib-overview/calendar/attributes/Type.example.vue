<script setup lang="ts">
import { NmorphCalendar } from "@nmorph/nmorph-ui-kit";

const date1 = new Date(1989, 11, 18);
const date2 = new Date(1989, 11, 19);
const date3 = new Date(1989, 11, 21);

const date = ref(new Date());
const dates = ref([date1, date2, date3]);
const range = ref([date1, date3]);

const { locale } = useI18n();
const shortDate = (value: Date) => value.toLocaleDateString(locale.value);
</script>

<template>
  <div class="calendar-type-overview">
    <ClientOnly>
      <div class="calendar-type-overview__element">
        <p>{{ $t("overview.date") }}</p>
        <p>{{ shortDate(date) }}</p>
        <NmorphCalendar v-model="date" />
      </div>
      <div class="calendar-type-overview__element">
        <p>{{ $t("overview.dates") }}</p>
        <p>{{ dates.map((date) => shortDate(date)).join("~") }}</p>
        <NmorphCalendar v-model="dates" type="dates" :initial-date="date1" />
      </div>
      <div class="calendar-type-overview__element">
        <p>{{ $t("overview.date-range") }}</p>
        <p>{{ range.map((date) => shortDate(date)).join("~") }}</p>
        <NmorphCalendar
          v-model="range"
          type="daterange"
          :initial-date="date1"
        />
      </div>
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.calendar-type-overview {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;

  // .calendar-type-overview__element {
  //   max-width: 33.333%;
  // }
  p {
    margin-bottom: 8px;
  }
}
</style>
