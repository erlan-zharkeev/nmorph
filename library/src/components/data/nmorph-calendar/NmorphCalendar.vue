<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { useModifiers } from '@/utils';
import {
  NmorphTable,
  NmorphTableColumn,
  NmorphTableCell,
  NmorphCalendarHeader,
  getMonthDaysByWeek,
  hasAnyRangeDateInPrevMonth,
  hasAnyRangeDateInNextMonth,
  isTodayInRange,
  INmorphCalendarDate,
  NmorphCalendarRangeType,
  NmorphDateType,
  NmorphSelectedDateModelType,
  NmorphSelectionDateType,
  NmorphTableDataType,
} from '@/components';

interface INmorphProps {
  markToday?: boolean;
  initialDate?: Date;
  modelValue?: NmorphDateType;
  range?: NmorphCalendarRangeType;
  type?: keyof typeof NmorphSelectionDateType;
  selectedValues?: NmorphSelectedDateModelType;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  markToday: true,
  initialDate: () => new Date(),
  modelValue: null,
  range: undefined,
  type: 'date',
  selectedValues: null,
});

const emit = defineEmits<INmorphEmit>();
interface INmorphEmit {
  (e: 'update:modelValue', date: NmorphDateType): void;
  (e: 'update-initial-date', date: Date): void;
}

const modifiers = computed(() =>
  useModifiers({
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
    const weekData: Record<string, INmorphCalendarDate> = {};
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

const dateData = (data: unknown) => data as INmorphCalendarDate;

const setPreviousMonth = () => {
  initialDate.value = prevMonth.value;
};
const setTodayMonth = () => {
  initialDate.value = new Date();
};
const setNextMonth = () => {
  initialDate.value = nextMonth.value;
};
const clickDate = (dateData: INmorphCalendarDate) => {
  const { monthType, hidden } = dateData;
  if (hidden) return;
  if (monthType === 'next') setNextMonth();
  if (monthType === 'previous') setPreviousMonth();
  const { date } = dateData;
  selectedValue.value = date;
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

const isDateInRange = (dateToCheck: Date, range: NmorphDateType[]) => {
  const startDate = range[0];
  const endDate = range[1];
  if (dateToCheck === startDate || dateToCheck === endDate) return true;
  if (!startDate || !endDate || startDate > endDate) return false;
  return dateToCheck >= startDate && dateToCheck <= endDate;
};

const isValueSelected = (value: Date) => {
  if (Array.isArray(props.selectedValues)) {
    if (props.type === 'daterange') {
      return isDateInRange(value, props.selectedValues);
    } else {
      return props.selectedValues.includes(value);
    }
  } else {
    return props.selectedValues?.toDateString() === value.toDateString();
  }
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
  background: var(--main-bg-color);

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
    color: var(--text-color-00);
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
../table/nmorph-table/types
