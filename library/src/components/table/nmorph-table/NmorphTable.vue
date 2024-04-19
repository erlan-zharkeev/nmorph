<script setup lang="ts">
import { computed, provide, ref } from 'vue';
import { useModifiers } from '@/utils';
import { NmorphTableColumnProps, NmorphTableDataInjection, NmorphTableDataType, NmorphTableSortType } from '../types';
import { NmorphSortButton } from '@/components';
import { NmorphDomElement, NmorphSortOrderType } from '@/types/common';

interface IProps<T> {
  data?: NmorphTableDataType<T>;
  bordered?: boolean;
  sort?: NmorphTableSortType;
  style?: 'nmorph' | 'common';
}

const props = withDefaults(defineProps<IProps<NmorphTableSortType>>(), {
  /**
   * @description table data
   */
  data: () => [],
  bordered: false,
  sort: undefined,
  style: 'nmorph',
});

// const emit = defineEmits<IEmit>();
// interface IEmit {}

const modifiers = computed(() =>
  useModifiers({
    nmorph: [],
    'nmorph-table': [`${props.style}`],
  })
);

const rows = ref(props.data);

const sortData = ref(props.sort);
const onSort = (value: NmorphSortOrderType, prop: string) => {
  if (!sortData.value) return;
  sortData.value[prop] = value;

  rows.value.sort((a, b) => {
    const prev = String(a[prop]).toLowerCase();
    const next = String(b[prop]).toLowerCase();
    if (!sortData.value) {
      return 0;
    }
    const order = sortData.value[prop];
    if (order === 'ascending') {
      return prev.localeCompare(next);
    }
    if (order === 'descending') {
      return next.localeCompare(prev);
    }
    return 0;
  });
};
const nmorphDOMTable = ref<NmorphDomElement>(null);
const columns = ref<NmorphTableColumnProps[]>([]);
provide<NmorphTableDataInjection>('table-data', { rows, columns });

const defaultColWidth = computed(() => {
  const columnsWidth = columns.value.map((column) => column.width).filter((width) => Boolean(width));
  const filledColQuantity = columnsWidth.length;
  const filledColWidth = columnsWidth.reduce((acc, width) => {
    if (typeof acc === 'number' && typeof width === 'number') acc += width;
    return acc;
  }, 0);
  const candidateColQuantity = columns.value.length - filledColQuantity;
  if (!nmorphDOMTable.value?.clientWidth || !filledColWidth) return 0;
  const oneColumnWidth = (nmorphDOMTable.value?.clientWidth - filledColWidth) / candidateColQuantity;
  return `${oneColumnWidth}px`;
});

const getWidth = (width: number | undefined) => (width ? `${width}px` : defaultColWidth.value);
</script>

<template>
  <div ref="nmorphDOMTable" :class="modifiers">
    <div class="nmorph-table__wrapper">
      <slot />
      <table class="nmorph-table__header">
        <colgroup>
          <col v-for="columnData in columns" :key="columnData.prop" :style="{ width: getWidth(columnData.width) }" />
        </colgroup>
        <thead>
          <tr class="nmorph-table__table-row">
            <th
              v-for="(columnData, idx) in columns"
              :key="idx"
              class="nmorph-table__table-data"
              :class="{ 'nmorph-table__table-data--bordered': props.bordered }"
            >
              <div class="nmorph-table__cell">
                <div class="nmorph-table__button-wrapper" :style="{ 'justify-content': columnData.alignment }">
                  <span>{{ columnData.label }}</span>
                  <NmorphSortButton
                    v-if="sortData && sortData[columnData.prop]"
                    :value="sortData[columnData.prop]"
                    @sort="(e: NmorphSortOrderType) => onSort(e, columnData.prop)"
                  />
                </div>
              </div>
            </th>
          </tr>
        </thead>
      </table>
      <div class="nmorph-table__body">
        <table>
          <colgroup>
            <col v-for="columnData in columns" :key="columnData.prop" :style="{ width: getWidth(columnData.width) }" />
          </colgroup>
          <tbody>
            <tr v-for="(rowData, idx) in rows" :key="idx" class="nmorph-table__table-data-row">
              <td
                v-for="columnData in columns"
                :key="columnData.prop"
                :class="{ 'nmorph-table__table-data--bordered': props.bordered }"
                class="nmorph-table__table-data"
              >
                <div :style="{ 'text-align': columnData.alignment }" class="nmorph-table__cell">
                  {{ rowData[columnData.prop] }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.nmorph-table {
  --border-color: var(--accent-color-01);

  .nmorph-table__header th {
    border-bottom: 0;
  }

  .nmorph-table__button-wrapper {
    display: flex;
    align-items: center;
  }

  .nmorph-table__button-wrapper span {
    margin-right: var(--indentation-03);
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
  }

  .nmorph-table__table-data-row:hover {
    background: var(--background-hover);
  }

  .nmorph-table__table-data {
    padding: var(--indentation-03) 0;
    border-bottom: 1px solid var(--border-color);
  }

  .nmorph-table__table-data--bordered {
    border: 1px solid var(--border-color);
  }

  .nmorph-table__cell {
    padding: 0 var(--indentation-03);
  }
}

.nmorph-table--nmorph {
  @include nmorph-outset;
  border-radius: var(--default-border-radius);
  overflow: hidden;

  --border-color: transparent;

  .nmorph-table__button-wrapper {
    padding: var(--indentation-02);
  }

  .nmorph-table__table-row {
    @include nmorph-inset;
  }
}
</style>
