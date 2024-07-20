<script setup lang="ts">
import { computed, provide, ref, watch } from 'vue';
import { generateUUID, useModifiers } from '@/utils';
import { NmorphDomElementType, NmorphSortOrderType } from '@/types';
import {
  NmorphTableDataType,
  NmorphTableSortType,
  INmorphTableColumnProps,
  INmorphTableDataInjection,
  NmorphTableIdInjectionType,
} from '@/components';
import NmorphSortButton from './inner-components/nmorph-sort-button/NmorphSortButton.vue';

interface INmorphProps {
  data?: NmorphTableDataType;
  rowHover?: boolean;
  bordered?: boolean;
  sort?: NmorphTableSortType;
  style?: 'nmorph' | 'common';
}

const props = withDefaults(defineProps<INmorphProps>(), {
  /**
   * @description table data
   */
  data: () => [],
  bordered: false,
  sort: undefined,
  style: 'nmorph',
  rowHover: true,
});

// const emit = defineEmits<INmorphEmit>();
// interface INmorphEmit {};

const modifiers = computed(() =>
  useModifiers({
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

const nmorphDOMTable = ref<NmorphDomElementType>(null);
const columns = ref<INmorphTableColumnProps[]>([]);
provide<INmorphTableDataInjection>('table-data', { rows, columns });

const defaultColWidth = computed(() => {
  const columnsWidth = columns.value.map((column) => column.width).filter((width) => Boolean(width));
  const filledColQuantity = columnsWidth.length;

  const filledColWidth = columnsWidth.reduce((acc, width) => {
    acc += Number(width);
    return acc;
  }, 0 as number);

  const candidateColQuantity = columns.value.length - filledColQuantity;
  if (!nmorphDOMTable.value?.clientWidth) return 0;
  const oneColumnWidth = (nmorphDOMTable.value?.clientWidth - filledColWidth) / candidateColQuantity;
  return oneColumnWidth;
});

const getWidth = (width: string | undefined) => {
  return width !== '' ? width : defaultColWidth.value;
};

const key = ref(0);
watch(
  () => props.data,
  () => {
    key.value = key.value + 1;
    rows.value = props.data;
    columns.value = [];
  },
  {
    immediate: true,
  }
);
const tableData = (data: unknown) => (typeof data === 'object' ? '' : data);
const tableIdentifier = generateUUID();
provide<NmorphTableIdInjectionType>('table-identifier', tableIdentifier);
</script>

<template>
  <div ref="nmorphDOMTable" :key="key" :class="modifiers">
    <div class="nmorph-table__wrapper">
      <table class="nmorph-table__header">
        <colgroup>
          <col
            v-for="columnData in columns"
            :key="columnData.prop"
            :style="{ width: `${getWidth(columnData.width)}px` }"
            :data-src="`${getWidth(columnData.width)}px`"
          />
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
                <div :style="{ 'justify-content': columnData.alignment }" class="nmorph-table__cell-content">
                  <span>{{ columnData.label }}</span>
                  <NmorphSortButton
                    v-if="sortData && sortData[columnData.prop]"
                    class="nmorph-table__button-wrapper"
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
            <col
              v-for="columnData in columns"
              :key="columnData.prop"
              :style="{ width: `${getWidth(columnData.width)}px` }"
            />
          </colgroup>
          <tbody>
            <tr
              v-for="(rowData, idx) in rows"
              :key="idx"
              class="nmorph-table__table-data-row"
              :class="{ 'nmorph-table__table-data-row--row-hover': props.rowHover }"
            >
              <td
                v-for="columnData in columns"
                :key="columnData.prop"
                :class="{ 'nmorph-table__table-data--bordered': props.bordered }"
                class="nmorph-table__table-data"
              >
                <div
                  :id="`table-cell-${tableIdentifier}-${idx}-${columnData.prop}`"
                  :style="{ 'text-align': columnData.alignment }"
                  class="nmorph-table__cell nmorph-table__cell--data"
                >
                  {{ tableData(rowData[columnData.prop]) }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <table>
          <colgroup>
            <col
              v-for="columnData in columns"
              :key="columnData.prop"
              :style="{ width: `${getWidth(columnData.width)}px` }"
            />
          </colgroup>
          <tbody class="nmorph-table__slot-columns">
            <slot />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.nmorph-table {
  --border-color: var(--nmorph-accent-color);
  --table-cell-height: auto;

  // --table-background-row-hover: var(--nmorph-black-color);

  .nmorph-table__header th {
    border-bottom: 0;
  }

  .nmorph-table__button-wrapper {
    display: flex;
    align-items: center;
    margin-left: var(--indentation-03);
  }

  table {
    width: calc(100% - 2px);
    margin-left: 1px;
    border-collapse: collapse;
    border-spacing: 0;
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

  .nmorph-table__cell-content {
    display: flex;
    align-items: center;
  }

  .nmorph-table__cell--data {
    height: var(--table-cell-height);
  }

  .nmorph-table__body {
    position: relative;
  }

  .nmorph-table__table-data-row--row-hover:hover {
    // background: var(--table-background-row-hover);
  }
}

.nmorph-table--nmorph {
  @include nmorph-outset;

  overflow: hidden;
  border-radius: var(--default-border-radius);

  --border-color: transparent;

  .nmorph-table__button-wrapper {
    padding: var(--indentation-02);
  }

  .nmorph-table__table-row {
    @include nmorph-inset;
  }
}
</style>
