<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { createCssSizeVariables, useModifiers } from '@/utils';
import { NmorphRadioGroup, NmorphButton, NmorphIcon, NmorphRadio, NmorphIconChevronDown } from '@/components';
import type { INmorphPaginationEmit, INmorphPaginationProps } from './types';

const props = withDefaults(defineProps<INmorphPaginationProps>(), {
  modelValue: 1,
  elementsQuantityOnPage: 2,
  disabled: false,
  loading: false,
  hideOnSinglePage: true,
  maxVisiblePages: 9,
  fastForwardStep: 5,
  thickness: 'basic',
  fixedContainer: false,
  width: undefined,
  minWidth: undefined,
});

const emit = defineEmits<INmorphPaginationEmit>();

const modifiers = computed(() =>
  useModifiers({
    'nmorph-pagination': [
      props.disabled && 'disabled',
      props.loading && 'loading',
      props.fixedContainer && 'fixed-container',
    ],
  })
);

const thicknessHeightMap = {
  thick: 'var(--thick-component)',
  basic: 'var(--basic-component)',
  thin: 'var(--thin-component)',
};

const fixedPagesCount = computed(() => Math.max(1, Math.floor(props.maxVisiblePages)));
const fixedContainerWidth = computed(() => {
  const pageButtonsWidth = fixedPagesCount.value * 40;
  const pageButtonsGap = Math.max(0, fixedPagesCount.value - 1) * 8;
  const pageControlsWidth = pageButtonsWidth + pageButtonsGap;

  return [
    'calc(',
    'var(--nmorph-private-pagination-height) + ',
    'var(--nmorph-private-pagination-height) + ',
    '16px + var(--indentation-01) + var(--indentation-01) + ',
    `${pageControlsWidth}px`,
    ')',
  ].join('');
});

const paginationStyle = computed(() => ({
  '--nmorph-private-pagination-height': thicknessHeightMap[props.thickness],
  '--nmorph-private-pagination-fixed-pages': fixedPagesCount.value,
  '--nmorph-private-pagination-fixed-width': fixedContainerWidth.value,
  ...createCssSizeVariables({
    '--nmorph-private-pagination-width': props.width,
    '--nmorph-private-pagination-min-width': props.minWidth,
  }),
}));

const interactionDisabled = computed(() => props.disabled || props.loading);

const prevClick = () => {
  selectedPage.value = String(Number(selectedPage.value) - 1);
};
const nextClick = () => {
  selectedPage.value = String(Number(selectedPage.value) + 1);
};

const selectedPage = ref(String(props.modelValue));

type PaginationPage = { value: string; label: string };

const totalPages = computed(() => {
  const totalElementsQuantity = Number(props.totalElementsQuantity);
  const elementsQuantityOnPage = Number(props.elementsQuantityOnPage);

  if (!Number.isFinite(totalElementsQuantity) || !Number.isFinite(elementsQuantityOnPage)) return 0;
  if (totalElementsQuantity <= 0 || elementsQuantityOnPage <= 0) return 0;

  return Math.ceil(totalElementsQuantity / elementsQuantityOnPage);
});

const pages = computed<PaginationPage[]>(() =>
  Array.from({ length: totalPages.value }, (_, index) => {
    return { value: String(index + 1), label: String(index + 1) };
  })
);

const retainedPages = ref<PaginationPage[]>([]);
const fallbackPages = computed<PaginationPage[]>(() => {
  const fallbackPage = String(Math.max(1, Number(selectedPage.value) || 1));
  return [{ value: fallbackPage, label: fallbackPage }];
});
const effectivePages = computed(() => {
  if (props.loading && retainedPages.value.length) return retainedPages.value;
  return pages.value.length ? pages.value : fallbackPages.value;
});

const show = computed(() => props.loading || !props.hideOnSinglePage || totalPages.value > 1);

watch(selectedPage, (newValue) => {
  emit('update:model-value', Number(newValue));
});

watch(
  [pages, () => props.loading] as const,
  ([newPages, loading]) => {
    if (newPages.length || !loading) retainedPages.value = newPages;
  },
  { immediate: true }
);

watch(
  () => props.modelValue,
  (modelValue) => {
    selectedPage.value = String(modelValue);
  }
);

watch([totalPages, () => props.loading] as const, ([pagesCount, loading]) => {
  if (loading || pagesCount <= 0) return;
  if (Number(selectedPage.value) > pagesCount) selectedPage.value = String(pagesCount);
});

const blockPrevButton = computed(() => Number(selectedPage.value) === 1);
const blockNextButton = computed(() => Number(selectedPage.value) >= effectivePages.value.length);

const visiblePages = computed(() => {
  const total = effectivePages.value.length;
  const currentPage = Number(selectedPage.value);
  const maxVisiblePages = props.maxVisiblePages;
  if (total <= maxVisiblePages) {
    return effectivePages.value;
  }
  const half = Math.floor(maxVisiblePages / 2);
  if (currentPage <= half) {
    return [
      ...effectivePages.value.slice(0, maxVisiblePages - 2),
      { value: 'next', label: '...' },
      effectivePages.value[total - 1],
    ];
  } else if (currentPage >= total - half) {
    return [
      effectivePages.value[0],
      { value: 'prev', label: '...' },
      ...effectivePages.value.slice(total - (maxVisiblePages - 2)),
    ];
  } else {
    return [
      effectivePages.value[0],
      { value: 'prev', label: '...' },
      ...effectivePages.value.slice(currentPage - half, currentPage + half - 1),
      { value: 'next', label: '...' },
      effectivePages.value[total - 1],
    ];
  }
});

const bigStepUpdate = (direction: 'prev' | 'next') => {
  const selected = Number(selectedPage.value);
  let result = direction === 'prev' ? selected - props.fastForwardStep : selected + props.fastForwardStep;
  if (result <= 0) result = 1;
  if (result >= effectivePages.value.length) result = effectivePages.value.length;
  selectedPage.value = String(result);
};
</script>

<template>
  <div v-if="show" :class="modifiers" :style="paginationStyle" :aria-busy="props.loading || undefined">
    <NmorphButton
      class="nmorph-pagination__btn nmorph-pagination__prev-btn"
      :thickness="props.thickness"
      :disabled="blockPrevButton || interactionDisabled"
      @click="prevClick"
    >
      <template #icon-only>
        <NmorphIcon class="nmorph-pagination__prev-icon">
          <NmorphIconChevronDown />
        </NmorphIcon>
      </template>
    </NmorphButton>
    <NmorphRadioGroup
      v-model="selectedPage"
      class="nmorph-pagination__page-group"
      :thickness="props.thickness"
      :disabled="interactionDisabled"
    >
      <div v-for="page in visiblePages" :key="page.value" class="nmorph-pagination__page-btn-wrapper">
        <NmorphButton
          v-if="page.value === 'prev' || page.value === 'next'"
          :class="`nmorph-pagination__page-btn nmorph-pagination__${page.value}`"
          :text="page.label"
          :thickness="props.thickness"
          :disabled="interactionDisabled"
          @click="bigStepUpdate(page.value)"
        />
        <NmorphRadio
          v-else
          :value="page.value"
          :label="page.label"
          class="nmorph-pagination__page-btn"
          :thickness="props.thickness"
          :disabled="interactionDisabled"
        />
      </div>
    </NmorphRadioGroup>
    <NmorphButton
      class="nmorph-pagination__btn nmorph-pagination__next-btn"
      :thickness="props.thickness"
      :disabled="blockNextButton || interactionDisabled"
      @click="nextClick"
    >
      <template #icon-only>
        <NmorphIcon class="nmorph-pagination__next-icon">
          <NmorphIconChevronDown />
        </NmorphIcon>
      </template>
    </NmorphButton>
  </div>
</template>

<style lang="scss">
.nmorph-pagination {
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  width: var(--nmorph-private-pagination-width, 100%);
  min-width: min(100%, var(--nmorph-private-pagination-min-width, 0px));
  max-width: 100%;
  margin-top: var(--indentation-04);
  margin-right: auto;
  margin-left: auto;

  &.nmorph-pagination--fixed-container {
    width: var(--nmorph-private-pagination-width, var(--nmorph-private-pagination-fixed-width));
  }

  .nmorph-radio-group__content {
    display: flex;
    gap: 8px;
    justify-content: center;
  }

  .nmorph-radio-group {
    display: inline-flex;
    align-items: center;
  }

  .nmorph-radio-group .nmorph-radio:not(:last-child) {
    margin-right: 0;
    margin-bottom: 0;
  }

  .nmorph-pagination__page-group {
    margin: 0 var(--indentation-01);
  }

  .nmorph-pagination__prev-icon {
    rotate: 90deg;
  }

  .nmorph-pagination__next-icon {
    rotate: -90deg;
  }

  .nmorph-pagination__prev-btn {
    margin-right: 8px;
  }

  .nmorph-pagination__next-btn {
    margin-left: 8px;
  }

  .nmorph-pagination__page-btn {
    --nmorph-private-control-height: var(--nmorph-private-pagination-height);
    --nmorph-private-selection-control-size: var(--nmorph-private-pagination-height);

    width: 40px;
    min-width: 40px;
    height: var(--nmorph-private-pagination-height);
    min-height: var(--nmorph-private-pagination-height);
  }

  .nmorph-pagination__page-btn.nmorph-radio {
    .nmorph-radio__content,
    .nmorph-radio__fake {
      width: 100%;
      height: 100%;
    }

    &.nmorph-radio--nmorph .nmorph-radio__fake {
      padding: 0;
    }
  }

  .nmorph-pagination__page-btn-wrapper {
    display: flex;
  }

  .nmorph-pagination__prev-secondary-btn {
    margin-right: 8px;
  }

  .nmorph-pagination__next-secondary-btn {
    margin-left: 8px;
  }
}
</style>
