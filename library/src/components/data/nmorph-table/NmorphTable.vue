<script setup lang="ts">
import { computed, nextTick, provide, ref, watch } from 'vue';
import type { CSSProperties } from 'vue';
import { generateUUID, resolveDomElement, toCssSize, useModifiers } from '@/utils';
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
  virtualDynamicHeight?: boolean;
  borderColor?: string;
  cellHeight?: number | string;
  rowHoverBackground?: string;
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
  virtualDynamicHeight: false,
  borderColor: undefined,
  cellHeight: undefined,
  rowHoverBackground: undefined,
});

const modifiers = computed(() =>
  useModifiers({
    'nmorph-table': [props.design],
  })
);

const rows = ref([...props.data]);
const virtualEnabled = computed(() => props.virtual);
const virtualRowHeight = computed(() => props.virtualRowHeight);
const virtualOverscan = computed(() => props.virtualOverscan);
const virtualDynamicHeight = computed(() => props.virtualDynamicHeight);
const virtualList = useVirtualList(rows, {
  enabled: virtualEnabled,
  itemHeight: virtualRowHeight,
  overscan: virtualOverscan,
  dynamic: virtualDynamicHeight,
});

const renderedRows = computed(() =>
  virtualEnabled.value ? virtualList.virtualItems.value : rows.value.map((item, index) => ({ item, index }))
);
const tableRows = computed(() => renderedRows.value.map((row) => row.item));
const activeRowIndex = ref(-1);
const lastScrollTop = ref(0);

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
  async () => {
    key.value = key.value + 1;
    rows.value = [...props.data];
    columns.value = [];
    await nextTick();
    const element = virtualList.containerRef.value;
    if (!element) return;
    element.scrollTop = Math.min(
      lastScrollTop.value,
      Math.max(virtualList.totalHeight.value - element.clientHeight, 0)
    );
    virtualList.refresh();
  },
  {
    immediate: true,
  }
);
const tableData = (data: unknown) => (typeof data === 'object' ? '' : data);
const tableIdentifier = generateUUID();
provide<NmorphTableIdInjectionType>('table-identifier', tableIdentifier);

const virtualHeight = computed(() => toCssSize(props.virtualHeight));
const tableStyle = computed<CSSProperties>(() => ({
  ...(props.borderColor !== undefined && { '--border-color': props.borderColor }),
  ...(props.cellHeight !== undefined && { '--table-cell-height': toCssSize(props.cellHeight) }),
  ...(props.rowHoverBackground !== undefined && { '--table-background-row-hover': props.rowHoverBackground }),
}));
const tableBodyStyle = computed<Record<string, string | undefined>>(() => ({
  '--table-virtual-row-height': `${props.virtualRowHeight}px`,
  height: virtualEnabled.value ? virtualHeight.value : undefined,
  overflowY: virtualEnabled.value ? 'auto' : undefined,
}));
const virtualSpacerStyle = virtualList.spacerStyle;
const virtualContentStyle = virtualList.contentStyle;
const setVirtualRowRef = (element: unknown, index: number) => {
  virtualList.measureElement(index, resolveDomElement(element));
};

const scrollHandler = () => {
  virtualList.scrollHandler();
  lastScrollTop.value = virtualList.containerRef.value?.scrollTop || 0;
};

const moveActiveRow = (delta: number) => {
  if (!rows.value.length) return;
  const nextIndex =
    activeRowIndex.value < 0 ? 0 : Math.min(Math.max(activeRowIndex.value + delta, 0), rows.value.length - 1);
  activeRowIndex.value = nextIndex;
  virtualList.scrollToIndex(nextIndex);
};

const tableKeydownHandler = (event: KeyboardEvent) => {
  if (!virtualEnabled.value) return;
  if (event.key === 'ArrowDown') {
    event.preventDefault();
    moveActiveRow(1);
  } else if (event.key === 'ArrowUp') {
    event.preventDefault();
    moveActiveRow(-1);
  } else if (event.key === 'Home') {
    event.preventDefault();
    activeRowIndex.value = 0;
    virtualList.scrollToIndex(0);
  } else if (event.key === 'End') {
    event.preventDefault();
    activeRowIndex.value = rows.value.length - 1;
    virtualList.scrollToIndex(rows.value.length - 1);
  } else if (event.key === 'PageDown') {
    event.preventDefault();
    moveActiveRow(
      Math.max(Math.floor((virtualList.viewportHeight.value || props.virtualRowHeight) / props.virtualRowHeight), 1)
    );
  } else if (event.key === 'PageUp') {
    event.preventDefault();
    moveActiveRow(
      -Math.max(Math.floor((virtualList.viewportHeight.value || props.virtualRowHeight) / props.virtualRowHeight), 1)
    );
  }
};
</script>

<template>
  <div>
    <div ref="nmorphDOMTable" :key="key" :class="modifiers" :style="tableStyle">
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
          :class="{
            'nmorph-table__body--virtual': virtualEnabled,
            'nmorph-table__body--dynamic': props.virtualDynamicHeight,
          }"
          :style="tableBodyStyle"
          :tabindex="virtualEnabled ? 0 : undefined"
          role="grid"
          @keydown="tableKeydownHandler"
          @scroll="scrollHandler"
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
                    v-for="(rowData, idx) in renderedRows"
                    :key="rowData.index"
                    :ref="(element) => setVirtualRowRef(element, rowData.index)"
                    class="nmorph-table__table-data-row"
                    :class="{
                      'nmorph-table__table-data-row--row-hover': props.rowHover,
                      'nmorph-table__table-data-row--active': activeRowIndex === rowData.index,
                    }"
                    role="row"
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
                        {{ tableData(rowData.item[columnData.prop]) }}
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
                  v-for="(rowData, idx) in renderedRows"
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
                      {{ tableData(rowData.item[columnData.prop]) }}
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

  .nmorph-table__body--virtual.nmorph-table__body--dynamic .nmorph-table__table-data {
    height: auto;
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

  .nmorph-table__table-data-row--active {
    background: var(--table-background-row-hover);
  }
}

.nmorph-table--nmorph {
  overflow: hidden;
  background: var(--nmorph-main-color);
  border-radius: var(--default-border-radius);
  box-shadow: var(--nmorph-shadow-outset);

  --border-color: transparent;

  .nmorph-table__button-wrapper {
    padding: var(--indentation-02);
  }

  .nmorph-table__table-row {
    background: var(--nmorph-main-color);
    box-shadow: var(--nmorph-shadow-inset);
  }
}
</style>
