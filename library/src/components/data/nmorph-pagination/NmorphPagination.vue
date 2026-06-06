<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useModifiers } from '@/utils';
import { NmorphRadioGroup, NmorphButton, NmorphIcon, NmorphRadio, NmorphIconChevronDown } from '@/components';
import type { INmorphPaginationEmit, INmorphPaginationProps } from './types';

const props = withDefaults(defineProps<INmorphPaginationProps>(), {
  modelValue: 1,
  elementsQuantityOnPage: 2,
  disabled: false,
  hideOnSinglePage: true,
  maxVisiblePages: 9,
  fastForwardStep: 5,
  thickness: 'basic',
});

const emit = defineEmits<INmorphPaginationEmit>();

const modifiers = computed(() =>
  useModifiers({
    'nmorph-pagination': [props.disabled && 'disabled'],
  })
);

const thicknessHeightMap = {
  thick: 'var(--thick-component)',
  basic: 'var(--basic-component)',
  thin: 'var(--thin-component)',
};

const paginationStyle = computed(() => ({
  '--nmorph-private-pagination-height': thicknessHeightMap[props.thickness],
}));

const prevClick = () => {
  selectedPage.value = String(Number(selectedPage.value) - 1);
};
const nextClick = () => {
  selectedPage.value = String(Number(selectedPage.value) + 1);
};

const selectedPage = ref(String(props.modelValue));

const pages = computed(() => {
  const preResult = props.totalElementsQuantity / props.elementsQuantityOnPage + 1;
  const errorRate = preResult % 1 === 0 ? -1 : 0;
  const result = Array.from({ length: preResult + errorRate }, (_, index) => {
    return { value: String(index + 1), label: String(index + 1) };
  });
  return result;
});

const show = computed(() => props.hideOnSinglePage || props.totalElementsQuantity / props.elementsQuantityOnPage > 1);

watch(selectedPage, (newValue) => {
  emit('update:model-value', Number(newValue));
});

const blockPrevButton = computed(() => Number(selectedPage.value) === 1);
const blockNextButton = computed(() => pages.value.length === Number(selectedPage.value));

const visiblePages = computed(() => {
  const total = pages.value.length;
  const currentPage = Number(selectedPage.value);
  const maxVisiblePages = props.maxVisiblePages;
  if (total <= maxVisiblePages) {
    return pages.value;
  }
  const half = Math.floor(maxVisiblePages / 2);
  if (currentPage <= half) {
    return [...pages.value.slice(0, maxVisiblePages - 2), { value: 'next', label: '...' }, pages.value[total - 1]];
  } else if (currentPage >= total - half) {
    return [pages.value[0], { value: 'prev', label: '...' }, ...pages.value.slice(total - (maxVisiblePages - 2))];
  } else {
    return [
      pages.value[0],
      { value: 'prev', label: '...' },
      ...pages.value.slice(currentPage - half, currentPage + half - 1),
      { value: 'next', label: '...' },
      pages.value[total - 1],
    ];
  }
});

const bigStepUpdate = (direction: 'prev' | 'next') => {
  const selected = Number(selectedPage.value);
  let result = direction === 'prev' ? selected - props.fastForwardStep : selected + props.fastForwardStep;
  if (result <= 0) result = 1;
  if (result >= pages.value.length) result = pages.value.length;
  selectedPage.value = String(result);
};
</script>

<template>
  <div v-if="show" :class="modifiers" :style="paginationStyle">
    <NmorphButton
      class="nmorph-pagination__btn nmorph-pagination__prev-btn"
      :thickness="props.thickness"
      :disabled="blockPrevButton || props.disabled"
      @click="prevClick"
    >
      <NmorphIcon class="nmorph-pagination__prev-icon">
        <NmorphIconChevronDown />
      </NmorphIcon>
    </NmorphButton>
    <NmorphRadioGroup
      v-model="selectedPage"
      class="nmorph-pagination__page-group"
      :thickness="props.thickness"
      :disabled="props.disabled"
    >
      <div v-for="page in visiblePages" :key="page.value" class="nmorph-pagination__page-btn-wrapper">
        <NmorphButton
          v-if="page.value === 'prev' || page.value === 'next'"
          :class="`nmorph-pagination__page-btn nmorph-pagination__${page.value}`"
          :text="page.label"
          :thickness="props.thickness"
          :disabled="props.disabled"
          @click="bigStepUpdate(page.value)"
        />
        <NmorphRadio
          v-else
          :value="page.value"
          :label="page.label"
          class="nmorph-pagination__page-btn"
          :thickness="props.thickness"
          :disabled="props.disabled"
        />
      </div>
    </NmorphRadioGroup>
    <NmorphButton
      class="nmorph-pagination__btn nmorph-pagination__next-btn"
      :thickness="props.thickness"
      :disabled="blockNextButton || props.disabled"
      @click="nextClick"
    >
      <NmorphIcon class="nmorph-pagination__next-icon">
        <NmorphIconChevronDown />
      </NmorphIcon>
    </NmorphButton>
  </div>
</template>

<style lang="scss">
.nmorph-pagination {
  display: flex;
  justify-content: center;
  margin-top: var(--indentation-04);

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
