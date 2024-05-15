<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useModifiers } from '@/utils';
import NmorphRadioGroup from './../inputs/radio/nmorph-radio-group/NmorphRadioGroup.vue';
import NmorphButton from './../nmorph-button/NmorphButton.vue';
import NmorphIcon from './../nmorph-icon/NmorphIcon.vue';
import { onMounted } from 'vue';

interface IProps {
  total: number;
  range?: [number, number];
  modelValue?: number;
  pagerCount?: number;
  disabled?: boolean;
  hideOnSinglePage?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  range: () => [1, 10],
  modelValue: 1,
  pagerCount: 2,
  disabled: false,
  hideOnSinglePage: true,
});

interface IEmit {
  (e: 'prev-click', currentPage: number): void;
  (e: 'next-click', currentPage: number): void;
  (e: 'update:modelValue', currentPage: number): void;
  (e: 'update:range', range: [number, number]): void;
}

const emit = defineEmits<IEmit>();

const range = ref(props.range);

const modifiers = computed(() =>
  useModifiers({
    'nmorph-pagination': [`${props.disabled && 'disabled'}`],
  })
);

const prevClick = () => {
  selectedPage.value = String(Number(selectedPage.value) - 1);
};
const nextClick = () => {
  selectedPage.value = String(Number(selectedPage.value) + 1);
};

const selectedPage = ref(String(props.modelValue));

const pages = computed(() => {
  const preResult = props.total / props.pagerCount + 1;
  const errorRate = preResult % 1 === 0 ? -1 : 0;
  return Array.from({ length: preResult + errorRate }, (_, index) => {
    return { value: String(index + 1), label: String(index + 1) };
  });
});

const show = computed(() => props.hideOnSinglePage || props.total / props.pagerCount > 1);

watch(selectedPage, (newValue) => {
  emit('update:modelValue', Number(newValue));
  updateRange();
});

watch(
  () => props.pagerCount,
  () => {
    updateRange();
  }
);

const updateSelectedValue = (value: string) => {
  selectedPage.value = value;
};

const blockPrevButton = computed(() => Number(selectedPage.value) === 1);
const blockNextButton = computed(() => pages.value.length === Number(selectedPage.value));

const updateRange = () => {
  const max = Number(selectedPage.value) * props.pagerCount;
  const min = max - props.pagerCount;
  range.value = [min, max];
  emit('update:range', range.value);
};

onMounted(() => {
  updateRange();
});
</script>

<template>
  <div v-if="show" :class="modifiers">
    <NmorphButton class="nmorph-pagination__btn" :disabled="blockPrevButton || props.disabled" @click="prevClick">
      <NmorphIcon name="chevron-down" class="nmorph-pagination__prev" />
    </NmorphButton>
    <NmorphRadioGroup
      :model-value="selectedPage"
      :options="pages"
      class="nmorph-pagination__page"
      :disabled="props.disabled"
      @update:model-value="updateSelectedValue"
    />
    <NmorphButton class="nmorph-pagination__btn" :disabled="blockNextButton || props.disabled" @click="nextClick">
      <NmorphIcon name="chevron-down" class="nmorph-pagination__next" />
    </NmorphButton>
  </div>
</template>

<style lang="scss">
.nmorph-pagination {
  display: flex;
  justify-content: center;
  margin-top: var(--indentation-04);

  .nmorph-radio-group {
    display: inline-flex;
    align-items: center;
  }

  .nmorph-radio-group .nmorph-radio:not(:last-child) {
    margin-bottom: 0;
  }

  .nmorph-pagination__page {
    margin: 0 var(--indentation-01);
  }

  .nmorph-pagination__btn {
    margin: var(--indentation-03);
  }

  .nmorph-pagination__prev {
    rotate: 90deg;
  }

  .nmorph-pagination__next {
    rotate: -90deg;
  }
}
</style>
