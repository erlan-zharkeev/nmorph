<script setup lang="ts">
import { computed, provide, ref, watch } from 'vue';
import { generateUUID, useModifiers } from '@/utils';
import { NmorphDomElementType, NmorphSortOrderType } from '@/types';
import { useVirtualList } from '@/hooks';
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
  design?: 'nmorph' | 'common';
  virtual?: boolean;
  virtualHeight?: number | string;
  virtualOverscan?: number;
  virtualRowHeight?: number;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  data: () => [],
  bordered: false,
  sort: undefined,
  design: 'nmorph',
  rowHover: true,
  virtual: false,
  virtualHeight: '320px',
  virtualOverscan: 5,
  virtualRowHeight: 42,
});

const modifiers = computed(() =>
  useModifiers({
    'nmorph-table': [`${props.design}`],
  })
);

const rows = ref([...props.data]);
const virtualEnabled = computed(() => props.virtual);
const virtualRowHeight = computed(() => props.virtualRowHeight);
const virtualOverscan = computed(() => props.virtualOverscan);
const virtualList = useVirtualList(rows, {
  enabled: virtualEnabled,
  itemHeight: virtualRowHeight,
  overscan: virtualOverscan,
});

const tableRows = computed(() =>
  virtualEnabled.value ? virtualList.virtualItems.value.map((virtualRow) => virtualRow.item) : rows.value
);

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
provide<INmorphTableDataInjection>('table-data', { rows: tableRows, columns });

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
    rows.value = [...props.data];
    columns.value = [];
  },
  {
    immediate: true,
  }
);
const tableData = (data: unknown) => (typeof data === 'object' ? '' : data);
const tableIdentifier = generateUUID();
provide<NmorphTableIdInjectionType>('table-identifier', tableIdentifier);

const getCssSize = (value: number | string) => (typeof value === 'number' ? `${value}px` : value);
const virtualHeight = computed(() => getCssSize(props.virtualHeight));
const tableBodyStyle = computed<Record<string, string | undefined>>(() => ({
  '--table-virtual-row-height': `${props.virtualRowHeight}px`,
  height: virtualEnabled.value ? virtualHeight.value : undefined,
  overflowY: virtualEnabled.value ? 'auto' : undefined,
}));
const virtualSpacerStyle = computed(() => ({
  height: `${virtualList.totalHeight.value}px`,
}));
const virtualContentStyle = computed(() => ({
  transform: `translateY(${virtualList.offsetTop.value}px)`,
}));
</script>

<template>
  <div>
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
        <div
          :ref="virtualList.containerRef"
          class="nmorph-table__body"
          :class="{ 'nmorph-table__body--virtual': virtualEnabled }"
          :style="tableBodyStyle"
          @scroll="virtualList.scrollHandler"
        >
          <div v-if="virtualEnabled" class="nmorph-table__virtual-spacer" :style="virtualSpacerStyle">
            <div class="nmorph-table__virtual-content" :style="virtualContentStyle">
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
                    v-for="(rowData, idx) in tableRows"
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
          <template v-else>
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
                  v-for="(rowData, idx) in tableRows"
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
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-table {
  --border-color: var(--nmorph-info-text-color);
  --table-cell-height: auto;
  --table-background-row-hover: var(--nmorph-info-color);

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

  .nmorph-table__body--virtual {
    overflow-x: hidden;
  }

  .nmorph-table__body--virtual .nmorph-table__table-data {
    height: var(--table-virtual-row-height);
    padding-top: 0;
    padding-bottom: 0;
  }

  .nmorph-table__virtual-spacer {
    position: relative;
    min-width: 100%;
  }

  .nmorph-table__virtual-content {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }

  .nmorph-table__table-data-row--row-hover:hover {
    background: var(--table-background-row-hover);
  }
}

.nmorph-table--nmorph {
  background: var(--nmorph-main-color);
  box-shadow:
    var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
    calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
      var(--nmorph-light-shade-color);
  overflow: hidden;
  border-radius: var(--default-border-radius);

  --border-color: transparent;

  .nmorph-table__button-wrapper {
    padding: var(--indentation-02);
  }

  .nmorph-table__table-row {
    background: var(--nmorph-main-color);
    box-shadow:
      inset var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
      inset calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
        var(--nmorph-light-shade-color);
  }
}
</style>
