<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { useModifiers } from '@/utils';
import { NmorphTable, NmorphTableColumn, NmorphTableCell } from '@/components';
import { getMonthDaysByWeek, hasAnyRangeDateInPrevMonth, hasAnyRangeDateInNextMonth, isTodayInRange } from './utils';
import NmorphCalendarHeader from './components/nmorph-calendar-header/NmorphCalendarHeader.vue';
import { NmorphTableDataType } from '../table/types';
import { NmorphCalendarDate, NmorphCalendarRange } from './types';

interface IProps {
  markToday?: boolean;
  initialDate?: Date;
  modelValue?: Date[];
  singleSelectedValue?: boolean;
  range?: NmorphCalendarRange;
}

const props = withDefaults(defineProps<IProps>(), {
  markToday: true,
  initialDate: () => new Date(),
  modelValue: () => [new Date()],
  singleSelectedValue: true,
  range: undefined,
});

const emit = defineEmits<IEmit>();
interface IEmit {
  (e: 'update:modelValue', date: Date[]): void;
  (e: 'update-initial-date', date: Date): void;
}

const modifiers = computed(() =>
  useModifiers({
    nmorph: [],
    'nmorph-calendar': [],
  })
);

const initialDate = ref(props.initialDate);

const propDaysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

const selectedValue = ref(props.modelValue);

let calendar = reactive<NmorphTableDataType>([]);

const updateCalendar = async () => {
  calendar = [];
  const calendarMatrix = getMonthDaysByWeek(initialDate, props.range);
  calendarMatrix.forEach((week) => {
    const weekData: Record<string, NmorphCalendarDate> = {};
    week.forEach((day, dayIdx) => {
      const propName = propDaysOfWeek[dayIdx];
      weekData[propName] = day;
    });
    calendar.push(weekData);
  });
};

updateCalendar();

watch(initialDate, () => {
  updateCalendar();
  emit('update-initial-date', initialDate.value);
});

watch(
  () => props.initialDate,
  (newValue) => {
    initialDate.value = newValue;
  },
  {
    deep: true,
  }
);

const dateData = (data: unknown) => data as NmorphCalendarDate;

const setPreviousMonth = () => {
  initialDate.value = prevMonth.value;
};
const setTodayMonth = () => {
  initialDate.value = new Date();
};
const setNextMonth = () => {
  initialDate.value = nextMonth.value;
};
const clickDate = (dateData: NmorphCalendarDate) => {
  const { monthType, hidden } = dateData;
  if (hidden) return;
  if (monthType === 'next') setNextMonth();
  if (monthType === 'previous') setPreviousMonth();
  if (props.singleSelectedValue) {
    selectedValue.value[0] = dateData.date;
  } else {
    selectedValue.value.push(dateData.date);
  }
  emit('update:modelValue', selectedValue.value);
};

const prevMonth = computed(() => new Date(initialDate.value.setMonth(initialDate.value.getMonth() - 1)));
const nextMonth = computed(() => new Date(initialDate.value.setMonth(initialDate.value.getMonth() + 1)));

const showHeaderButtons = computed(() => {
  const { range } = props;
  const showPreviousMonthButton = range ? hasAnyRangeDateInPrevMonth(initialDate.value, range[0]) : true;
  const showNextMonthButton = range ? hasAnyRangeDateInNextMonth(initialDate.value, range[1]) : true;

  const showTodayButton = isTodayInRange(props.range);

  return {
    showPreviousMonthButton,
    showNextMonthButton,
    showTodayButton,
  };
});

const isValueSelected = (value: Date) => {
  const transformedSelectedValues = selectedValue.value.map((selectedValue) =>
    new Date(selectedValue.setHours(0, 0, 0, 0)).getTime()
  );
  return transformedSelectedValues.includes(value.getTime());
};
</script>

<template>
  <div :class="modifiers">
    <slot name="header">
      <NmorphCalendarHeader
        :year="initialDate.getFullYear()"
        :month="initialDate.getMonth()"
        :show-previous-month-button="showHeaderButtons.showPreviousMonthButton"
        :show-today-button="showHeaderButtons.showTodayButton"
        :show-next-month-button="showHeaderButtons.showNextMonthButton"
        @click-next-month="setNextMonth"
        @click-previous-month="setPreviousMonth"
        @click-today="setTodayMonth"
      />
    </slot>
    <slot name="content">
      <NmorphTable :data="calendar" bordered :row-hover="false">
        <NmorphTableColumn
          v-for="columnName in propDaysOfWeek"
          :key="`${columnName}`"
          :prop="columnName"
          :label="columnName.toUpperCase()"
        >
          <template #default="{ scope }">
            <NmorphTableCell v-for="(row, idx) in scope.rows" :key="idx" :row="idx">
              <div
                :data-date="`${dateData(row[columnName]).date}`"
                :class="[
                  'nmorph-calendar-date',
                  `nmorph-calendar-date--${dateData(row[columnName]).monthType}`,
                  { 'nmorph-calendar-date--today': props.markToday && dateData(row[columnName]).isToday },
                  { 'nmorph-calendar-date--hidden': dateData(row[columnName]).hidden },
                  {
                    'nmorph-calendar-date--selected': isValueSelected(dateData(row[columnName]).date),
                  },
                ]"
                @click="clickDate(dateData(row[columnName]))"
              >
                <slot
                  name="date-cell"
                  :scope="{
                    ...dateData(row[columnName]),
                    selected: isValueSelected(dateData(row[columnName]).date),
                  }"
                >
                  {{ dateData(row[columnName]).hidden ? '-' : dateData(row[columnName]).value }}
                </slot>
              </div>
            </NmorphTableCell>
          </template>
        </NmorphTableColumn>
      </NmorphTable>
    </slot>
  </div>
</template>

<style lang="scss">
.nmorph-calendar {
  --table-data-cell-height: 50px;
  background: var(--main-bg);

  .nmorph-table__table-data-row {
    height: var(--table-data-cell-height);
  }
  .nmorph-table__cell {
    --table-cell-height: var(--table-data-cell-height);
  }

  .nmorph-calendar-date {
    height: 100%;
    @include flex-full-center;
  }

  .nmorph-calendar-date--today {
    color: var(--info-color-00);
    font-weight: 700;
    @include title-3;
  }

  .nmorph-table__cell {
    @include body-3;
  }

  .nmorph-table .nmorph-table__cell {
    padding: 0 var(--indentation-01);
  }

  .nmorph-calendar-date--selected {
    background: var(--accent-color-00);
    color: var(--text-00);
  }

  .nmorph-calendar-date--hidden {
    cursor: none;
  }

  .nmorph-calendar-date:not(.nmorph-calendar-date--hidden) {
    cursor: pointer;
  }

  .nmorph-calendar-date:not(.nmorph-calendar-date--hidden).nmorph-calendar-date--previous,
  .nmorph-calendar-date:not(.nmorph-calendar-date--hidden).nmorph-calendar-date--next {
    @include nmorph-inset;
    color: var(--accent-color-00);
  }
}
</style>
