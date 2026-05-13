<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue';
import type { CSSProperties } from 'vue';
import { useModifiers } from '@/utils';
import {
  NmorphTable,
  NmorphTableColumn,
  NmorphTableCell,
  getMonthDaysByWeek,
  hasAnyRangeDateInPrevMonth,
  hasAnyRangeDateInNextMonth,
  isTodayInMonthRange,
  INmorphCalendarDate,
  NmorphCalendarRangeType,
  NmorphDateType,
  NmorphSelectedDateModelType,
  NmorphTableDataType,
  resetTimeToZero,
} from '@/components';
import NmorphCalendarHeader from './inner-components/nmorph-calendar-header/NmorphCalendarHeader.vue';
import { useCalendarTexts } from './hooks';
import { NmorphSelectionDateType } from '@/types';

interface INmorphProps {
  markToday?: boolean;
  initialDate?: Date;
  range?: NmorphCalendarRangeType;
  type?: keyof typeof NmorphSelectionDateType;
  modelValue?: NmorphSelectedDateModelType;
  cellHeight?: number | string;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  markToday: true,
  initialDate: () => new Date(),
  range: undefined,
  type: 'date',
  modelValue: () => new Date(),
  cellHeight: undefined,
});

const emit = defineEmits<INmorphEmit>();
interface INmorphEmit {
  (e: 'update:model-value', date: NmorphSelectedDateModelType): void;
  (e: 'update-initial-date', date: Date): void;
}

const { days } = useCalendarTexts();

const setPreviousMonth = () => {
  initialDate.value = prevMonth.value;
};
const setTodayMonth = () => {
  initialDate.value = new Date();
};
const setNextMonth = () => {
  initialDate.value = nextMonth.value;
};
const wrongType = () => {
  throw new Error(`model value and type prop not matched`);
};

const convertValue = (value: NmorphSelectedDateModelType) => {
  if (value === null) return null;
  if (props.type === 'date') {
    if (value instanceof Date) {
      return resetTimeToZero(value);
    } else wrongType();
  }
  const isArrayOfDates = Array.isArray(value) && value.every((date) => date instanceof Date);
  if (props.type === 'dates') {
    if (isArrayOfDates) {
      return value.map((date) => resetTimeToZero(date));
    } else wrongType();
  }
  if (props.type === 'daterange') {
    if (isArrayOfDates) {
      return value.map((date) => resetTimeToZero(date)).slice(0, 2);
    } else wrongType();
  }
};

const clickDate = (dateData: INmorphCalendarDate) => {
  if (selectedValue.value === null) return;
  const { monthType, hidden } = dateData;
  if (hidden) return;
  if (monthType === 'next') setNextMonth();
  if (monthType === 'previous') setPreviousMonth();
  const { date } = dateData;
  if (props.type === 'date') {
    selectedValue.value = date;
    emit('update:model-value', selectedValue.value);
  }
  if (props.type === 'dates') {
    if (!Array.isArray(selectedValue.value)) return wrongType();
    const convertedDate = date.toDateString();
    const selectedDatesToString = selectedValue.value.map((dateEl) => dateEl.toDateString());
    const index = selectedDatesToString.indexOf(convertedDate);
    const elementExist = index !== -1;
    if (elementExist) selectedValue.value.splice(index, 1);
    else selectedValue.value.push(date);
    emit('update:model-value', selectedValue.value);
  }
  if (props.type === 'daterange') {
    if (!Array.isArray(selectedValue.value)) return wrongType();
    if (selectedValue.value.length === 0) {
      selectedValue.value.push(date);
    } else if (selectedValue.value.length === 1) {
      if (date < selectedValue.value[0]) {
        selectedValue.value = [date, selectedValue.value[0]];
      } else {
        selectedValue.value.push(date);
      }
    } else {
      selectedValue.value = [date];
    }
    emit('update:model-value', selectedValue.value.slice(0, 2));
  }
};

const isDateInRange = (dateToCheck: Date, range: NmorphDateType[]) => {
  const [startDate, endDate] = range;
  if (range.length === 1) {
    return dateToCheck.toDateString() === startDate.toDateString();
  }
  if (startDate && endDate) {
    return dateToCheck >= resetTimeToZero(startDate) && dateToCheck <= resetTimeToZero(endDate);
  }
  return false;
};

const isValueSelected = (value: Date) => {
  if (selectedValue.value === null) return false;
  if (props.type === 'date') {
    if (Array.isArray(selectedValue.value)) return wrongType();
    return selectedValue.value.toDateString() === value.toDateString();
  }
  if (props.type === 'dates') {
    if (!Array.isArray(selectedValue.value)) return wrongType();
    const matched = selectedValue.value.find((dateEl) => dateEl.toDateString() === value.toDateString());
    return Boolean(matched);
  }
  if (props.type === 'daterange') {
    if (!Array.isArray(selectedValue.value)) return wrongType();
    return isDateInRange(value, selectedValue.value);
  }
};

const initialDate = ref(props.initialDate);
const selectedValue = ref<NmorphSelectedDateModelType>(convertValue(props.modelValue));

onMounted(() => {
  emit('update:model-value', selectedValue.value);
});

let calendar = reactive<NmorphTableDataType>([]);

const updateCalendar = () => {
  calendar = [];
  const calendarMatrix = getMonthDaysByWeek(initialDate, props.range);
  calendarMatrix.forEach((week) => {
    const weekData: Record<string, INmorphCalendarDate> = {};
    week.forEach((day, dayIdx) => {
      const propName = days[dayIdx];
      weekData[propName] = day;
    });
    calendar.push(weekData);
  });
};

watch(
  () => props.initialDate,
  (newValue) => {
    initialDate.value = newValue;
  },
  {
    deep: true,
  }
);
watch(initialDate, () => {
  updateCalendar();
  emit('update-initial-date', initialDate.value);
});
watch(
  () => props.modelValue,
  (newValue) => {
    selectedValue.value = convertValue(newValue);
  }
);

const prevMonth = computed(() => new Date(initialDate.value.setMonth(initialDate.value.getMonth() - 1)));
const nextMonth = computed(() => new Date(initialDate.value.setMonth(initialDate.value.getMonth() + 1)));
const showHeaderButtons = computed(() => {
  const { range } = props;
  const showPreviousMonthButton = range ? hasAnyRangeDateInPrevMonth(initialDate.value, range[0]) : true;
  const showNextMonthButton = range ? hasAnyRangeDateInNextMonth(initialDate.value, range[1]) : true;

  const showTodayButton = isTodayInMonthRange(range);

  return {
    showPreviousMonthButton,
    showNextMonthButton,
    showTodayButton,
  };
});
const modifiers = computed(() =>
  useModifiers({
    'nmorph-calendar': [],
  })
);
const getCssSize = (value?: number | string) => (typeof value === 'number' ? `${value}px` : value);
const styles = computed<CSSProperties>(() => ({
  ...(props.cellHeight !== undefined && { '--table-data-cell-height': getCssSize(props.cellHeight) }),
}));
const dateData = (data: unknown) => data as INmorphCalendarDate;

updateCalendar();
</script>

<template>
  <div :class="modifiers" :style="styles">
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
          v-for="columnName in days"
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
                  {
                    'nmorph-calendar-date--today':
                      dateData(row[columnName]).isToday && !dateData(row[columnName]).hidden && props.markToday,
                  },
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

  background: var(--nmorph-main-color);

  .nmorph-table__table-data-row {
    height: var(--table-data-cell-height);
  }

  .nmorph-table__cell {
    --table-cell-height: var(--table-data-cell-height);

    font-weight: 400;
    font-size: var(--font-size-extra-small);
    line-height: var(--line-height-regular);
  }

  .nmorph-calendar-date {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .nmorph-calendar-date--today {
    color: var(--nmorph-text-color);
    font-weight: 700;
    font-size: var(--font-size-medium);
    line-height: var(--line-height-loose);
  }

  .nmorph-table .nmorph-table__cell {
    padding: 0 var(--indentation-01);
  }

  .nmorph-calendar-date--hidden {
    cursor: none;
  }

  .nmorph-calendar-date:not(.nmorph-calendar-date--hidden) {
    cursor: pointer;
  }

  .nmorph-calendar-date:not(
      .nmorph-calendar-date--hidden,
      .nmorph-calendar-date--selected
    ).nmorph-calendar-date--previous,
  .nmorph-calendar-date:not(.nmorph-calendar-date--hidden, .nmorph-calendar-date--selected).nmorph-calendar-date--next {
    color: var(--nmorph-accent-color);
    background: var(--nmorph-main-color);
    box-shadow:
      inset var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
      inset calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
        var(--nmorph-light-shade-color);
  }

  .nmorph-calendar-date--selected {
    color: var(--nmorph-white-color);
    background: var(--nmorph-accent-color);
    box-shadow: none;
  }
}
</style>
